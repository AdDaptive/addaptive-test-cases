import { test } from '../../fixtures/session';
import type { Browser, BrowserContext, Page } from '@playwright/test';
import { randomBytes } from 'node:crypto';
import { impersonateFrontendUser, loginToFrontend } from '../../pages/frontend-auth';
import {
  applyBackendMediaMathField,
  createOrUpdateBackendClient,
  openBackendClientEditPage,
  readBackendMediaMathField,
  saveBackendClient
} from '../../pages/backend-admin-clients';
import { createOrUpdateBackendUser } from '../../pages/backend-admin-users';
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
import { env, requiredEnv } from '../../utils/env';

type FrontendContext = {
  adServer?: string;
  creativeType?: string;
  objectivesType?: string;
  objectivesGoal?: string;
};

type BackendClientMode =
  | { mode: 'existing'; clientName: string }
  | { mode: 'create'; clientName: string };

type RuntimeVariables = Record<string, string>;

function isRawSelector(fieldName: string): boolean {
  return /^(css=|xpath=|\/\/|#|\.|\[|input\b|select\b|button\b|span\b|div\b)/i.test(fieldName.trim());
}

function rawLocator(page: Page, selector: string) {
  const trimmed = selector.trim();
  if (trimmed.startsWith('//')) {
    return page.locator(`xpath=${trimmed}`);
  }
  return page.locator(trimmed);
}

function isSpecialFrontendCommand(fieldName: string): boolean {
  return /^(goto|open_browser|wait_url|wait_ms|open_order_entry|configure_objectives|configure_basic_setup|verify_ad_server|login_frontend|impersonate_user)$/i.test(
    fieldName.trim()
  );
}

function resolveRuntimeValue(value: string, runtimeVariables: RuntimeVariables): string {
  return value.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_match, key: string) => runtimeVariables[key] ?? '');
}

async function runRawFrontendAction(page: Page, selector: string, action: string): Promise<void> {
  const locator = rawLocator(page, selector).first();
  const trimmedAction = action.trim();

  if (trimmedAction === 'click') {
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    const href = await locator.getAttribute('href').catch(() => null);
    await locator.click();

    if (href) {
      const navigated = await page
        .waitForURL((url) => url.toString().includes(href), { timeout: 5000 })
        .then(() => true)
        .catch(() => false);

      if (!navigated && href.startsWith('/')) {
        await page.goto(new URL(href, page.url()).toString(), { waitUntil: 'domcontentloaded' });
      }

      await page.waitForURL((url) => url.toString().includes(href), { timeout: 15000 }).catch(() => undefined);
      await page.waitForFunction(
        ([rawSelector]) => {
          const element = document.querySelector(rawSelector);
          return !!element && element.classList.contains('active');
        },
        [selector.trim()],
        { timeout: 15000 }
      ).catch(() => undefined);
    }
    return;
  }
  if (trimmedAction === 'wait_visible') {
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    return;
  }
  if (trimmedAction.startsWith('fill:')) {
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    await locator.fill(trimmedAction.slice('fill:'.length));
    return;
  }
  if (trimmedAction.startsWith('select_label:')) {
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    await locator.selectOption({ label: trimmedAction.slice('select_label:'.length) });
    return;
  }
  if (trimmedAction.startsWith('select_value:')) {
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    await locator.selectOption(trimmedAction.slice('select_value:'.length));
    return;
  }

  throw new Error(`Unsupported raw frontend action "${action}" for selector "${selector}".`);
}

async function runRawFrontendAssert(page: Page, selector: string, assertion: string): Promise<void> {
  const locator = rawLocator(page, selector).first();
  const trimmedAssertion = assertion.trim();

  if (trimmedAssertion === 'visible') {
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    return;
  }
  if (trimmedAssertion.startsWith('value:')) {
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    const actual = await locator.inputValue().catch(() => '');
    const expected = trimmedAssertion.slice('value:'.length).trim();
    if (actual.trim() !== expected) {
      throw new Error(`Expected selector "${selector}" value "${expected}", found "${actual}".`);
    }
    return;
  }
  if (trimmedAssertion.startsWith('text:')) {
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    const actual = await locator.textContent().then((value) => (value || '').replace(/\s+/g, ' ').trim());
    const expected = trimmedAssertion.slice('text:'.length).trim();
    if (actual !== expected) {
      throw new Error(`Expected selector "${selector}" text "${expected}", found "${actual}".`);
    }
    return;
  }

  throw new Error(`Unsupported raw frontend assertion "${assertion}" for selector "${selector}".`);
}

function frontendAdServerLabel(adServer: string, options?: { useClientFacingLabels?: boolean }): string {
  const normalized = adServer.trim().toUpperCase();
  if (!options?.useClientFacingLabels) {
    return normalized;
  }
  if (normalized === 'MEDIAMATH') {
    return 'AdDaptive_1';
  }
  if (normalized === 'MEDIAMATH_GAM') {
    return 'GAM_1';
  }
  return normalized;
}

async function ensureFrontendPage(params: {
  browser: Browser;
  frontendContext: BrowserContext | null;
  frontendPage: Page | null;
  setFrontendContext: (value: BrowserContext) => void;
  setFrontendPage: (value: Page) => void;
}): Promise<Page> {
  const { browser, frontendContext, frontendPage, setFrontendContext, setFrontendPage } = params;
  if (frontendPage) {
    return frontendPage;
  }

  const context = frontendContext || (await browser.newContext());
  if (!frontendContext) {
    setFrontendContext(context);
  }
  const page = await context.newPage();
  setFrontendPage(page);
  return page;
}

async function runSpecialFrontendAction(params: {
  page: Page;
  fieldName: string;
  fieldValue: string;
  context: FrontendContext;
  advertiser: string;
  adServer: string;
  generatedIoName: string;
  generatedCampaignName: string;
  runtimeVariables: RuntimeVariables;
  setFrontendReady: (value: boolean) => void;
  useClientFacingAdServerLabels: boolean;
  setUseClientFacingAdServerLabels: (value: boolean) => void;
}): Promise<void> {
  const {
    page,
    fieldName,
    fieldValue,
    context,
    advertiser,
    adServer,
    generatedIoName,
    generatedCampaignName,
    runtimeVariables,
    setFrontendReady,
    useClientFacingAdServerLabels,
    setUseClientFacingAdServerLabels
  } = params;
  const command = fieldName.trim().toLowerCase();
  const resolvedFieldValue = resolveRuntimeValue(fieldValue, runtimeVariables);
  const effectiveAdServer = (context.adServer || adServer).trim().toUpperCase();
  const effectiveFrontendAdServer = frontendAdServerLabel(effectiveAdServer, {
    useClientFacingLabels: useClientFacingAdServerLabels
  });

  if (command === 'goto' || command === 'open_browser') {
    await page.goto(resolvedFieldValue, { waitUntil: 'domcontentloaded' });
    return;
  }
  if (command === 'wait_url') {
    await page.waitForURL((url) => url.toString().includes(resolvedFieldValue), { timeout: 15000 });
    return;
  }
  if (command === 'wait_ms') {
    const duration = Number(resolvedFieldValue);
    if (!Number.isFinite(duration) || duration < 0) {
      throw new Error(`Invalid wait_ms value "${resolvedFieldValue}".`);
    }
    await page.waitForTimeout(duration);
    return;
  }
  if (command === 'login_frontend') {
    if (resolvedFieldValue.trim().toLowerCase() === 'admin') {
      await loginToFrontend(
        page,
        requiredEnv('ADDAPTIVE_LOGIN_USER'),
        requiredEnv('ADDAPTIVE_LOGIN_PASSWORD'),
        env.frontendUrl || requiredEnv('ADDAPTIVE_FRONTEND_URL')
      );
      setUseClientFacingAdServerLabels(false);
      setFrontendReady(true);
      return;
    }
    const [email = '', password = ''] = resolvedFieldValue.split('|');
    await loginToFrontend(page, email.trim(), password.trim(), config.frontendUrl || '');
    setUseClientFacingAdServerLabels(true);
    setFrontendReady(true);
    return;
  }
  if (command === 'impersonate_user') {
    await impersonateFrontendUser(page, resolvedFieldValue.trim());
    return;
  }
  if (command === 'open_order_entry') {
    await openOrderEntryPage(page, { orderAction: resolvedFieldValue || 'create' });
    return;
  }
  if (command === 'configure_objectives') {
    await configureOrderEntryObjectives(page, {
      adServer: effectiveFrontendAdServer,
      objectivesType: context.objectivesType,
      objectivesGoal: context.objectivesGoal
    });
    return;
  }
  if (command === 'verify_ad_server') {
    await verifyOrderEntryAdServerSelection(
      page,
      effectiveFrontendAdServer,
      `client-settings-defaults:${resolvedFieldValue || fieldName}`
    );
    return;
  }
  if (command === 'configure_basic_setup') {
    await configureOrderEntryBasicSetup(page, {
      adServer: effectiveFrontendAdServer,
      orderAction: resolvedFieldValue || 'create',
      advertiser,
      creativeType: context.creativeType,
      ioName: ['MEDIAMATH', 'MEDIAMATH_GAM'].includes(effectiveAdServer) ? generatedIoName : undefined,
      campaignName: ['MEDIAMATH', 'MEDIAMATH_GAM'].includes(effectiveAdServer) ? generatedCampaignName : undefined
    });
    return;
  }

  throw new Error(`Unsupported special frontend command "${fieldName}".`);
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
  if (normalized === 'ad_server') {
    context.adServer = fieldValue;
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

function sanitizeGeneratedClientName(value: string): string {
  return value
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 90);
}

function timestampForClientName(): string {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

function buildGeneratedUserEmail(suiteName: string, objectId: string): string {
  const localPartBase = sanitizeGeneratedClientName(suiteName || `client-settings-${objectId}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .slice(0, 32);
  return `${localPartBase || `clientsettings${objectId}`}${timestampForClientName()}@gmail.com`;
}

function buildGeneratedPassword(): string {
  return `Pw!${randomBytes(8).toString('hex')}9a`;
}

function buildGeneratedMediaMathName(prefix: string, suiteName: string, objectId: string): string {
  const timestamp = timestampForClientName();
  const maxLength = 64;
  const reservedLength = prefix.length + timestamp.length + 2;
  const base = sanitizeGeneratedClientName(suiteName || `Client Settings ${objectId}`)
    .replace(/\s+/g, '')
    .slice(0, Math.max(1, maxLength - reservedLength));
  return `${prefix} ${base} ${timestamp}`.slice(0, maxLength);
}

function resolveBackendClientMode(rawClientName: string | undefined, suiteName: string, objectId: string): BackendClientMode {
  const value = requireValue(rawClientName, 'client_name', objectId);
  if (value.startsWith('!:')) {
    return {
      mode: 'existing',
      clientName: requireValue(value.slice(2), 'existing client name', objectId)
    };
  }

  if (value.startsWith('*:')) {
    const timestamp = timestampForClientName();
    const maxClientNameLength = 63;
    const reservedLength = timestamp.length + 1;
    const baseName = sanitizeGeneratedClientName(value.slice(2) || suiteName || `Client Settings ${objectId}`).slice(
      0,
      Math.max(1, maxClientNameLength - reservedLength)
    );
    return {
      mode: 'create',
      clientName: `${baseName} ${timestamp}`
    };
  }

  return {
    mode: 'existing',
    clientName: value
  };
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
    browser
  }) => {
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

    const backendClient = resolveBackendClientMode(group.backendClientName || group.clientName, group.testCaseName, group.objectId);
    const advertiser = group.advertiser;

    let generatedUserPassword: string | null = null;
    let frontendReady = false;
    let useClientFacingAdServerLabels = false;
    let frontendContext: BrowserContext | null = null;
    let frontendPage: Page | null = null;
    let backendContext: BrowserContext | null = null;
    let backendPage: Page | null = null;
    let backendReady = false;
    let backendClientPrepared = false;
    const context: FrontendContext = {};
    const runtimeVariables: RuntimeVariables = {};
    const generatedIoName = buildGeneratedMediaMathName('IO', group.testCaseName, group.objectId);
    const generatedCampaignName = buildGeneratedMediaMathName('Campaign', group.testCaseName, group.objectId);

    async function ensureBackendReady(): Promise<void> {
      if (!backendPage) {
        backendContext = await browser.newContext();
        backendPage = await backendContext.newPage();
      }
      if (!backendReady) {
        await loginToBackend(backendPage, config.loginUser, config.loginPassword, config.backendUrl);
        backendReady = true;
      }
      if (!backendClientPrepared) {
        if (backendClient.mode === 'create') {
          await createOrUpdateBackendClient(backendPage, {
            action: 'create',
            clientName: backendClient.clientName,
            salesforceAccountId: 'N/A',
            adServers: ['*']
          });
          runtimeVariables.created_client_name = backendClient.clientName;
          const generatedUserEmail = buildGeneratedUserEmail(group.testCaseName, group.objectId);
          generatedUserPassword = buildGeneratedPassword();
          runtimeVariables.created_user_email = generatedUserEmail;
          runtimeVariables.created_user_password = generatedUserPassword;
          await createOrUpdateBackendUser(backendPage, {
            action: 'create',
            email: generatedUserEmail,
            password: generatedUserPassword,
            status: config.testCreateUserStatus,
            client: backendClient.clientName,
            groups: [config.testCreateUserGroup || '3.0 Orders & Order Entry'],
            firstName: config.testCreateUserFirstName,
            lastName: config.testCreateUserLastName
          });
        }
        backendClientPrepared = true;
      }
    }

    try {
      for (const step of run.steps) {
        const stepType = requireValue(step.stepType, 'step_type', group.objectId).trim().toLowerCase();
        const fieldName = requireValue(step.fieldName, 'field_name', group.objectId);
        const fieldValue = resolveRuntimeValue(requireValue(step.fieldValue, 'field_value', group.objectId), runtimeVariables);

        await test.step(`${stepType}:${fieldName}`, async () => {
          if (stepType === 'frontend_context') {
            applyFrontendContextStep(context, fieldName, fieldValue);
            return;
          }

          if (stepType === 'backend_set') {
            await ensureBackendReady();
            await openBackendClientEditPage(backendPage, backendClient.clientName);
            await applyBackendMediaMathField(backendPage, fieldName, fieldValue);
            await saveBackendClient(backendPage);
            await openBackendClientEditPage(backendPage, backendClient.clientName);
            const backendReadback = await readBackendMediaMathField(backendPage, fieldName);
            assertMatchingBackendValue(backendReadback, fieldValue, `Backend ${fieldName}`);
            return;
          }

          if (stepType === 'backend_assert') {
            await ensureBackendReady();
            await openBackendClientEditPage(backendPage, backendClient.clientName);
            const backendReadback = await readBackendMediaMathField(backendPage, fieldName);
            assertMatchingBackendValue(backendReadback, fieldValue, `Backend ${fieldName}`);
            return;
          }

          if (stepType === 'frontend_assert') {
            if (backendClient.mode === 'create' && !backendClientPrepared) {
              await ensureBackendReady();
            }
            const page = await ensureFrontendPage({
              browser,
              frontendContext,
              frontendPage,
              setFrontendContext: (value) => {
                frontendContext = value;
              },
              setFrontendPage: (value) => {
                frontendPage = value;
              }
            });
            if (isRawSelector(fieldName)) {
              await runRawFrontendAssert(page, fieldName, fieldValue);
              return;
            }
            const expectedValue = Number(fieldValue);
            if (!Number.isFinite(expectedValue)) {
              throw new Error(`Group ${group.objectId} step ${step.stepId} has a non-numeric frontend assert value.`);
            }
            await verifyFrontendClientSetting(page, {
              frontendField: fieldName,
              expectedValue,
              objectivesType: context.objectivesType,
              objectivesGoal: context.objectivesGoal
            });
            return;
          }

          if (stepType === 'frontend_action') {
            if (backendClient.mode === 'create' && !backendClientPrepared) {
              await ensureBackendReady();
            }
            const page = await ensureFrontendPage({
              browser,
              frontendContext,
              frontendPage,
              setFrontendContext: (value) => {
                frontendContext = value;
              },
              setFrontendPage: (value) => {
                frontendPage = value;
              }
            });
            if (isSpecialFrontendCommand(fieldName)) {
              await runSpecialFrontendAction({
                page,
                fieldName,
                fieldValue,
                context,
                advertiser,
                adServer,
                generatedIoName,
                generatedCampaignName,
                runtimeVariables,
                setFrontendReady: (value) => {
                  frontendReady = value;
                },
                useClientFacingAdServerLabels,
                setUseClientFacingAdServerLabels: (value) => {
                  useClientFacingAdServerLabels = value;
                }
              });
              return;
            }
            await runRawFrontendAction(page, fieldName, fieldValue);
            return;
          }

          throw new Error(`Unsupported step_type "${step.stepType}" on step ${step.stepId}.`);
        });
      }
    } finally {
      await frontendPage?.close().catch(() => undefined);
      await frontendContext?.close().catch(() => undefined);
      await backendPage?.close().catch(() => undefined);
      await backendContext?.close().catch(() => undefined);
    }
  });
}
