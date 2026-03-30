import { test } from '../../fixtures/session';
import { impersonateFrontendUser } from '../../pages/frontend-auth';
import {
  applyBackendMediaMathField,
  openBackendClientEditPage,
  readBackendMediaMathField,
  saveBackendClient
} from '../../pages/backend-admin-clients';
import { loginToBackend } from '../../pages/backend-auth';
import { verifyFrontendClientSetting } from '../../pages/order-entry-client-defaults';
import {
  configureOrderEntryBasicSetup,
  configureOrderEntryObjectives,
  openOrderEntryPage,
  verifyOrderEntryAdServerSelection
} from '../../pages/order-entry';
import { tryLoadClientSettingsSuiteGroups } from '../../utils/client-settings-suite-db';
import { config } from '../../utils/config';

type FrontendContext = {
  creativeType?: string;
  objectivesType?: string;
  objectivesGoal?: string;
};

function resolveImpersonationEmail(group: {
  impersonateUserProfile?: string;
}, parallelIndex: number): string {
  const orderEntryUsers = (config.orderEntryImpersonateUser || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  return (
    group.impersonateUserProfile ||
    config.impersonateUser ||
    orderEntryUsers[parallelIndex % Math.max(orderEntryUsers.length, 1)] ||
    ''
  );
}

function requireValue(value: string | undefined, label: string, objectId: string): string {
  if (!value || !value.trim()) {
    throw new Error(`Group ${objectId} is missing required value "${label}".`);
  }

  return value.trim();
}

function assertMatchingBackendValue(actual: string | undefined, expected: string, label: string): void {
  const normalizedActual = (actual || '').trim();
  const normalizedExpected = expected.trim();
  const actualNumber = Number(normalizedActual);
  const expectedNumber = Number(normalizedExpected);

  if (Number.isFinite(actualNumber) && Number.isFinite(expectedNumber)) {
    if (Math.abs(actualNumber - expectedNumber) > 0.0001) {
      throw new Error(`${label} did not persist. Expected "${normalizedExpected}", found "${normalizedActual}".`);
    }
    return;
  }

  if (normalizedActual !== normalizedExpected) {
    throw new Error(`${label} did not persist. Expected "${normalizedExpected}", found "${normalizedActual}".`);
  }
}

function applyFrontendContextStep(context: FrontendContext, fieldName: string, fieldValue: string): void {
  const normalized = fieldName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_');

  if (normalized === 'creative_type') {
    context.creativeType = fieldValue;
    return;
  }
  if (normalized === 'objectives_type') {
    context.objectivesType = fieldValue;
    return;
  }
  if (normalized === 'objectives_goal') {
    context.objectivesGoal = fieldValue;
    return;
  }

  throw new Error(`Unsupported frontend context field "${fieldName}".`);
}

const selection = tryLoadClientSettingsSuiteGroups({
  allowedAdServers: ['MEDIAMATH', 'MEDIAMATH_GAM'],
  requiredOrderAction: 'create'
});

if (selection.selectionError) {
  test('frontend: MediaMath client-settings defaults suite requires valid selection metadata', async () => {
    throw new Error(selection.selectionError);
  });
} else if (selection.groups.length === 0) {
  test('frontend: MediaMath client-settings defaults suite requires matching groups', async () => {
    throw new Error('No MediaMath create groups matched the client-settings suite selectors.');
  });
}

for (const run of selection.groups) {
  test(`frontend: MediaMath client settings defaults for ${run.group.objectId} (${run.group.testCaseName})`, async ({
    page,
    loginAsDefaultUser
  }, testInfo) => {
    const timeoutOverride = Number(process.env.ADDAPTIVE_TEST_TIMEOUT_MS || '90000');
    test.setTimeout(Number.isFinite(timeoutOverride) && timeoutOverride > 0 ? timeoutOverride : 90000);

    const group = run.group;
    const adServer = requireValue(group.adServer, 'ad_server', group.objectId).trim().toUpperCase();
    const orderAction = requireValue(group.orderAction, 'order_action', group.objectId).trim().toLowerCase();
    if (!['MEDIAMATH', 'MEDIAMATH_GAM'].includes(adServer)) {
      throw new Error(`This suite only supports MediaMath create groups, but group ${group.objectId} uses "${group.adServer}".`);
    }
    if (orderAction !== 'create') {
      throw new Error(`This suite only supports create groups, but group ${group.objectId} uses "${group.orderAction}".`);
    }
    if (!config.backendUrl || !config.loginUser || !config.loginPassword) {
      throw new Error('Backend credentials are required for this suite.');
    }

    const backendClientName = requireValue(group.backendClientName || group.clientName, 'backend_client_name', group.objectId);
    const advertiser = group.advertiser;

    const impersonationEmail = resolveImpersonationEmail(group, testInfo.parallelIndex);
    let frontendReady = false;
    let backendPage: typeof page | null = null;
    let backendReady = false;
    const context: FrontendContext = {};

    try {
      for (const step of run.steps) {
        const stepType = requireValue(step.stepType, 'step_type', group.objectId).trim().toLowerCase();
        const fieldName = requireValue(step.fieldName, 'field_name', group.objectId);
        const fieldValue = requireValue(step.fieldValue, 'field_value', group.objectId);

        await test.step(`${stepType}:${fieldName}`, async () => {
          if (stepType === 'frontend_context') {
            applyFrontendContextStep(context, fieldName, fieldValue);
            return;
          }

          if (stepType === 'backend_set') {
            if (!backendPage) {
              backendPage = await page.context().newPage();
            }
            if (!backendReady) {
              await loginToBackend(backendPage, config.loginUser, config.loginPassword, config.backendUrl);
              backendReady = true;
            }
            await openBackendClientEditPage(backendPage, backendClientName);
            await applyBackendMediaMathField(backendPage, fieldName, fieldValue);
            await saveBackendClient(backendPage);
            await openBackendClientEditPage(backendPage, backendClientName);
            const backendReadback = await readBackendMediaMathField(backendPage, fieldName);
            assertMatchingBackendValue(backendReadback, fieldValue, `Backend ${fieldName}`);
            return;
          }

          if (stepType === 'frontend_assert') {
            if (!frontendReady) {
              await loginAsDefaultUser();
              if (impersonationEmail) {
                await impersonateFrontendUser(page, impersonationEmail);
              }
              frontendReady = true;
            }
            const expectedValue = Number(fieldValue);
            if (!Number.isFinite(expectedValue)) {
              throw new Error(`Group ${group.objectId} step ${step.stepId} has a non-numeric frontend assert value.`);
            }

            await openOrderEntryPage(page, { orderAction: 'create' });
            await configureOrderEntryObjectives(page, {
              adServer,
              objectivesType: context.objectivesType,
              objectivesGoal: context.objectivesGoal
            });
            await verifyOrderEntryAdServerSelection(page, adServer, `client-settings-defaults:${fieldName}`);
            await configureOrderEntryBasicSetup(page, {
              adServer,
              orderAction: 'create',
              advertiser,
              creativeType: context.creativeType
            });
            await verifyFrontendClientSetting(page, {
              frontendField: fieldName,
              expectedValue,
              objectivesType: context.objectivesType,
              objectivesGoal: context.objectivesGoal
            });
            return;
          }

          throw new Error(`Unsupported step_type "${step.stepType}" on step ${step.stepId}.`);
        });
      }
    } finally {
      await backendPage?.close().catch(() => undefined);
    }
  });
}
