import type { Locator, Page } from '@playwright/test';
import { katalonLocator } from '../locators/resolve';
import type { ClientSettingsExpectationProfile, ClientSettingsMediaType } from '../utils/client-settings-expectations';
import { openObjectivesTab, waitForBudgetFlightTab } from './order-entry';

type ClientDefaultSettingsResponse = {
  id?: number;
  name?: string;
  ali_setting?: Record<string, unknown>;
};

function normalizeNumeric(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.replace(/[$,%\s]/g, '').trim();
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function assertExpectedNumeric(actual: unknown, expected: number, label: string): void {
  const normalized = normalizeNumeric(actual);
  if (normalized === null || Math.abs(normalized - expected) > 0.0001) {
    throw new Error(`Expected ${label} to be ${expected}, but found ${String(actual)}.`);
  }
}

async function readSelectedOptionLabel(locator: Locator): Promise<string> {
  return locator
    .locator('option:checked')
    .textContent()
    .then((value) => (value || '').replace(/\s+/g, ' ').trim())
    .catch(() => '');
}

async function fetchClientDefaultsJson<T>(page: Page, path: string): Promise<T> {
  const result = await page.evaluate(async (relativePath) => {
    const response = await fetch(relativePath, {
      credentials: 'include'
    });
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      text
    };
  }, path);

  if (!result.ok) {
    throw new Error(`Client defaults request ${path} failed with status ${result.status}.`);
  }

  try {
    return JSON.parse(result.text) as T;
  } catch (error) {
    throw new Error(
      `Client defaults request ${path} returned a non-JSON response: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function fetchClientDefaultSettings(page: Page): Promise<ClientDefaultSettingsResponse> {
  return fetchClientDefaultsJson<ClientDefaultSettingsResponse>(page, '/ng-api/v2/client/dsp-default-settings');
}

export async function verifyClientDefaultsProfileFromApi(
  page: Page,
  profile: ClientSettingsExpectationProfile
): Promise<ClientDefaultSettingsResponse> {
  const response = await fetchClientDefaultSettings(page);
  const settings = response.ali_setting || {};

  for (const mediaType of Object.keys(profile.billingCpm) as ClientSettingsMediaType[]) {
    assertExpectedNumeric(settings[`billing_cpm_${mediaType}`], profile.billingCpm[mediaType], `Billing CPM > ${mediaType}`);
    assertExpectedNumeric(
      settings[`revenue_type_fixed_cpm_${mediaType}`],
      profile.bidCpm[mediaType],
      `Bid CPM > ${mediaType}`
    );
  }

  return response;
}

async function ensureAdminOnlyOpen(page: Page): Promise<void> {
  const unitsInput = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/Media Math/Units Value Input');
  if (await unitsInput.isVisible().catch(() => false)) {
    return;
  }

  const accordion = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/span_ObjectivesAdminOnlyAccordion');
  if (await accordion.isVisible().catch(() => false)) {
    await accordion.click();
  }

  await unitsInput.waitFor({ state: 'visible', timeout: 10000 });
}

export async function readSelectedObjectivesGoal(page: Page): Promise<string> {
  await openObjectivesTab(page);
  const goalSelect = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/select_ObjectivesGoal');
  await goalSelect.waitFor({ state: 'visible', timeout: 10000 });
  return readSelectedOptionLabel(goalSelect);
}

export async function readSelectedObjectivesType(page: Page): Promise<string> {
  await openObjectivesTab(page);
  return page
    .locator('label.ad-radio-button-label')
    .evaluateAll((elements) => {
      for (const element of elements) {
        const container = element.parentElement || element;
        const radio = container.querySelector('input[type="radio"]');
        if (radio instanceof HTMLInputElement && radio.checked) {
          return (element.textContent || '').replace(/\s+/g, ' ').trim();
        }
      }

      return '';
    })
    .catch(() => '');
}

export async function readObjectivesUnitsValue(page: Page): Promise<string> {
  await openObjectivesTab(page);
  await ensureAdminOnlyOpen(page);
  return katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/Media Math/Units Value Input')
    .inputValue()
    .then((value) => value.trim());
}

export async function verifyObjectivesDefaults(page: Page, options: {
  objectivesType?: string;
  objectivesGoal: string;
  expectedUnitsValue: number;
}): Promise<void> {
  const selectedType = await readSelectedObjectivesType(page);
  if (options.objectivesType && selectedType && selectedType.toLowerCase() !== options.objectivesType.toLowerCase()) {
    throw new Error(`Expected Objectives type "${options.objectivesType}", but found "${selectedType}".`);
  }

  const selectedGoal = await readSelectedObjectivesGoal(page);
  if (selectedGoal && selectedGoal.toLowerCase() !== options.objectivesGoal.toLowerCase()) {
    throw new Error(`Expected Objectives goal "${options.objectivesGoal}", but found "${selectedGoal}".`);
  }

  const unitsValue = await readObjectivesUnitsValue(page);
  assertExpectedNumeric(unitsValue, options.expectedUnitsValue, 'Objectives Units Value');
}

export async function readBudgetFlightCpmValue(page: Page): Promise<string> {
  await waitForBudgetFlightTab(page);
  return katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightCPMValue')
    .inputValue()
    .then((value) => value.trim());
}

export async function verifyBudgetFlightCpmValue(page: Page, expected: number): Promise<void> {
  const cpmValue = await readBudgetFlightCpmValue(page);
  assertExpectedNumeric(cpmValue, expected, 'Budget & Flight CPM');
}

async function openBudgetFlightAdminSettings(page: Page): Promise<void> {
  await waitForBudgetFlightTab(page);
  const adminSettingsCog = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/span_BudgetFlight_AdminSettings');
  await adminSettingsCog.waitFor({ state: 'visible', timeout: 10000 });
  await adminSettingsCog.click();
}

export async function readBudgetFlightAdminBidCpmValue(page: Page): Promise<string> {
  await openBudgetFlightAdminSettings(page);
  await page.waitForTimeout(5000);
  const bidCpmInput = page.locator('#budget-flight-cpm-value').last();
  await bidCpmInput.waitFor({ state: 'visible', timeout: 10000 });
  return bidCpmInput.inputValue().then((value) => value.trim());
}

export async function verifyBudgetFlightAdminBidCpmValue(page: Page, expected: number): Promise<void> {
  const bidCpmValue = await readBudgetFlightAdminBidCpmValue(page);
  assertExpectedNumeric(bidCpmValue, expected, 'Budget & Flight Admin bid CPM');
}

export async function verifyFrontendClientSetting(page: Page, options: {
  frontendField: string;
  expectedValue: number;
  objectivesType?: string;
  objectivesGoal?: string;
}): Promise<void> {
  const normalized = options.frontendField.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_');

  if (normalized === 'objectives_goal_value') {
    await verifyObjectivesDefaults(page, {
      objectivesType: options.objectivesType,
      objectivesGoal: options.objectivesGoal || '',
      expectedUnitsValue: options.expectedValue
    });
    return;
  }

  if (normalized === 'budget_flight_cpm') {
    await verifyBudgetFlightCpmValue(page, options.expectedValue);
    return;
  }

  if (normalized === 'budget_admin_bid_cpm') {
    await verifyBudgetFlightAdminBidCpmValue(page, options.expectedValue);
    return;
  }

  throw new Error(`Unsupported frontend field token "${options.frontendField}".`);
}
