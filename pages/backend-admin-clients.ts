import type { Page } from '@playwright/test';
import { katalonLocator } from '../locators/resolve';

export type BackendClientUpsertOptions = {
  action: 'create' | 'update';
  existingClientName?: string;
  clientName?: string;
  isActive?: string;
  tier?: string;
  salesforceAccountId?: string;
  type?: string;
  target?: string;
  sso?: string;
  dpmCpm?: string;
  adServers?: string[];
  isDelinquent?: boolean;
};

async function openClientsPage(page: Page): Promise<void> {
  await katalonLocator(page, 'Object Repository/Backend/Sidebar Anchor', { sidebarItem: 'Clients' }).click();
}

async function waitForClientEditor(page: Page): Promise<void> {
  await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Clients/Client Tabs/Client Settings Headers', {
    clientHeader: 'Media Math Client Level Settings'
  }).waitFor({ state: 'visible', timeout: 15000 });
}

async function openClientA360Settings(page: Page): Promise<void> {
  await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Clients/Client Tabs/Client Settings Headers', {
    clientHeader: 'A360 Settings'
  }).click();
}

async function openMediaMathClientSettings(page: Page): Promise<void> {
  const header = katalonLocator(page, 'Object Repository/Backend/Backend Admin/Clients/Client Tabs/Client Settings Headers', {
    clientHeader: 'Media Math Client Level Settings'
  });
  const billingBannerField = fieldByIdSuffix(page, 'mediaMathSetting__billingCpmBanner');

  await header.waitFor({ state: 'visible', timeout: 15000 });
  if (!(await billingBannerField.isVisible().catch(() => false))) {
    await header.click();
    await billingBannerField.waitFor({ state: 'visible', timeout: 15000 });
  }
}

export async function openBackendClientEditPage(page: Page, clientName: string): Promise<void> {
  await openClientsPage(page);
  await katalonLocator(
    page,
    'Object Repository/Backend/Backend Admin/Clients/Client Listing Page/Client Name Filter Dropdown'
  ).selectOption({
    label: clientName
  });

  const submitFiltersButton = katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Submit Filters Button');
  if (await submitFiltersButton.isVisible().catch(() => false)) {
    await submitFiltersButton.click();
  }

  const editButton = katalonLocator(page, 'Object Repository/Backend/Backend Admin/Clients/Client Listing Page/Edit Client Button', {
    clientName
  });
  await editButton.waitFor({ state: 'visible', timeout: 15000 });
  await editButton.click();
  await waitForClientEditor(page);
}

function fieldByIdSuffix(page: Page, suffix: string) {
  return page.locator(`input[id$="${suffix}"], select[id$="${suffix}"], textarea[id$="${suffix}"]`).first();
}

async function fillByIdSuffix(page: Page, suffix: string, value?: string): Promise<void> {
  if (value === undefined) {
    return;
  }

  const field = fieldByIdSuffix(page, suffix);
  await field.waitFor({ state: 'attached', timeout: 15000 });
  if (await field.isVisible().catch(() => false)) {
    await field.fill('');
    await field.fill(value);
    return;
  }

  await field.evaluate((element, nextValue) => {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
      throw new Error('Field is not a text-editable element.');
    }

    element.value = '';
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.value = nextValue;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }, value);
}

async function selectByIdSuffix(page: Page, suffix: string, value?: string): Promise<void> {
  if (value === undefined) {
    return;
  }

  const field = fieldByIdSuffix(page, suffix);
  await field.waitFor({ state: 'attached', timeout: 15000 });
  const normalized = value.trim().toLowerCase();
  const optionValue = normalized === 'yes' ? '1' : normalized === 'no' ? '0' : value;
  if (await field.isVisible().catch(() => false)) {
    await field.selectOption(optionValue);
    return;
  }

  await field.evaluate((element, nextValue) => {
    if (!(element instanceof HTMLSelectElement)) {
      throw new Error('Field is not a select element.');
    }

    element.value = nextValue;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }, optionValue);
}

async function readByIdSuffix(page: Page, suffix: string): Promise<string> {
  const field = fieldByIdSuffix(page, suffix);
  await field.waitFor({ state: 'attached', timeout: 15000 });
  const tagName = await field.evaluate((element) => element.tagName.toLowerCase()).catch(() => '');
  if (tagName === 'select') {
    return field
      .locator('option:checked')
      .textContent()
      .then((value) => (value || '').trim());
  }

  return field.inputValue().then((value) => value.trim());
}

export type MediaMathClientDefaultsOptions = {
  lockObjectiveSettings?: string;
  billingCpmBanner?: string;
  billingCpmVideo?: string;
  billingCpmNative?: string;
  billingCpmAudio?: string;
  billingCpmCtv?: string;
  bidCpmBanner?: string;
  bidCpmVideo?: string;
  bidCpmNative?: string;
  bidCpmAudio?: string;
  bidCpmCtv?: string;
};

function normalizeToken(value?: string): string {
  return (value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function mediaTypeToken(value?: string): string {
  switch (normalizeToken(value)) {
    case 'banner':
    case 'display':
      return 'Banner';
    case 'video':
      return 'Video';
    case 'native':
      return 'Native';
    case 'audio':
      return 'Audio';
    case 'ctv':
    case 'connectedtv':
      return 'Ctv';
    default:
      throw new Error(`Unsupported MediaMath media type "${value || '<empty>'}".`);
  }
}

function objectiveFieldPrefix(objectiveType?: string, objectiveGoal?: string): string {
  const typeToken = normalizeToken(objectiveType);
  const goalToken = normalizeToken(objectiveGoal);

  if (typeToken === 'awareness' && goalToken === 'reach') {
    return 'awarenessReach';
  }
  if (typeToken === 'awareness' && goalToken === 'completion') {
    return 'awarenessCompletion';
  }
  if (typeToken === 'awareness' && goalToken === 'viewability') {
    return 'awarenessViewability';
  }
  if (typeToken === 'engagement' && goalToken === 'ctr') {
    return 'engagementCtr';
  }
  if (typeToken === 'engagement' && goalToken === 'sitevisits') {
    return 'engagementSiteVisits';
  }
  if (typeToken === 'conversion' && goalToken === 'conversion') {
    return 'conversionConversion';
  }

  throw new Error(
    `Unsupported MediaMath objective combination "${objectiveType || '<empty>'}" / "${objectiveGoal || '<empty>'}".`
  );
}

export async function applyBackendMediaMathObjectiveGoalValue(page: Page, options: {
  objectiveType: string;
  objectiveGoal: string;
  mediaType: string;
  goalValue: string;
}): Promise<void> {
  await waitForClientEditor(page);
  await openMediaMathClientSettings(page);

  const suffix = `aliSetting__${objectiveFieldPrefix(options.objectiveType, options.objectiveGoal)}${mediaTypeToken(options.mediaType)}GoalValue`;
  await fillByIdSuffix(page, suffix, options.goalValue);
}

export async function readBackendMediaMathObjectiveGoalValue(page: Page, options: {
  objectiveType: string;
  objectiveGoal: string;
  mediaType: string;
}): Promise<string> {
  await waitForClientEditor(page);
  await openMediaMathClientSettings(page);

  const suffix = `aliSetting__${objectiveFieldPrefix(options.objectiveType, options.objectiveGoal)}${mediaTypeToken(options.mediaType)}GoalValue`;
  return readByIdSuffix(page, suffix);
}

function mediaMathFieldSuffixFromToken(fieldToken: string): string {
  const normalized = normalizeToken(fieldToken);
  const cpmMatch = normalized.match(/^(billingcpm|bidcpm)(banner|video|native|audio|ctv)$/);
  if (cpmMatch) {
    const prefix = cpmMatch[1] === 'billingcpm' ? 'mediaMathSetting__billingCpm' : 'mediaMathSetting__bidCpm';
    const mediaType = cpmMatch[2].charAt(0).toUpperCase() + cpmMatch[2].slice(1);
    return `${prefix}${mediaType}`;
  }

  if (normalized === 'lockobjectivesettings') {
    return 'mediaMathSetting__lockObjectiveSettings';
  }

  const goalMatch = normalized.match(/^(awareness|engagement|conversion)(reach|completion|viewability|ctr|sitevisits|conversion)(banner|video|native|audio|ctv)goalvalue$/);
  if (goalMatch) {
    const objectiveTypeMap: Record<string, string> = {
      awareness: 'Awareness',
      engagement: 'Engagement',
      conversion: 'Conversion'
    };
    const objectiveGoalMap: Record<string, string> = {
      reach: 'Reach',
      completion: 'Completion',
      viewability: 'Viewability',
      ctr: 'Ctr',
      sitevisits: 'SiteVisits',
      conversion: 'Conversion'
    };
    const mediaTypeMap: Record<string, string> = {
      banner: 'Banner',
      video: 'Video',
      native: 'Native',
      audio: 'Audio',
      ctv: 'Ctv'
    };

    return `aliSetting__${objectiveTypeMap[goalMatch[1]].toLowerCase()}${objectiveGoalMap[goalMatch[2]]}${mediaTypeMap[goalMatch[3]]}GoalValue`;
  }

  throw new Error(`Unsupported backend field token "${fieldToken}".`);
}

export async function applyBackendMediaMathField(page: Page, fieldToken: string, value: string): Promise<void> {
  await waitForClientEditor(page);
  await openMediaMathClientSettings(page);

  const suffix = mediaMathFieldSuffixFromToken(fieldToken);
  if (suffix.endsWith('lockObjectiveSettings')) {
    await selectByIdSuffix(page, suffix, value);
    return;
  }

  await fillByIdSuffix(page, suffix, value);
}

export async function readBackendMediaMathField(page: Page, fieldToken: string): Promise<string> {
  await waitForClientEditor(page);
  await openMediaMathClientSettings(page);
  return readByIdSuffix(page, mediaMathFieldSuffixFromToken(fieldToken));
}

export async function applyBackendMediaMathClientDefaults(page: Page, options: MediaMathClientDefaultsOptions): Promise<void> {
  await waitForClientEditor(page);
  await openMediaMathClientSettings(page);

  await selectByIdSuffix(page, 'mediaMathSetting__lockObjectiveSettings', options.lockObjectiveSettings);
  await fillByIdSuffix(page, 'mediaMathSetting__billingCpmBanner', options.billingCpmBanner);
  await fillByIdSuffix(page, 'mediaMathSetting__billingCpmVideo', options.billingCpmVideo);
  await fillByIdSuffix(page, 'mediaMathSetting__billingCpmNative', options.billingCpmNative);
  await fillByIdSuffix(page, 'mediaMathSetting__billingCpmAudio', options.billingCpmAudio);
  await fillByIdSuffix(page, 'mediaMathSetting__billingCpmCtv', options.billingCpmCtv);
  await fillByIdSuffix(page, 'mediaMathSetting__bidCpmBanner', options.bidCpmBanner);
  await fillByIdSuffix(page, 'mediaMathSetting__bidCpmVideo', options.bidCpmVideo);
  await fillByIdSuffix(page, 'mediaMathSetting__bidCpmNative', options.bidCpmNative);
  await fillByIdSuffix(page, 'mediaMathSetting__bidCpmAudio', options.bidCpmAudio);
  await fillByIdSuffix(page, 'mediaMathSetting__bidCpmCtv', options.bidCpmCtv);
}

export async function readBackendMediaMathClientDefaults(page: Page): Promise<Required<MediaMathClientDefaultsOptions>> {
  await waitForClientEditor(page);
  await openMediaMathClientSettings(page);

  return {
    lockObjectiveSettings: await readByIdSuffix(page, 'mediaMathSetting__lockObjectiveSettings'),
    billingCpmBanner: await readByIdSuffix(page, 'mediaMathSetting__billingCpmBanner'),
    billingCpmVideo: await readByIdSuffix(page, 'mediaMathSetting__billingCpmVideo'),
    billingCpmNative: await readByIdSuffix(page, 'mediaMathSetting__billingCpmNative'),
    billingCpmAudio: await readByIdSuffix(page, 'mediaMathSetting__billingCpmAudio'),
    billingCpmCtv: await readByIdSuffix(page, 'mediaMathSetting__billingCpmCtv'),
    bidCpmBanner: await readByIdSuffix(page, 'mediaMathSetting__bidCpmBanner'),
    bidCpmVideo: await readByIdSuffix(page, 'mediaMathSetting__bidCpmVideo'),
    bidCpmNative: await readByIdSuffix(page, 'mediaMathSetting__bidCpmNative'),
    bidCpmAudio: await readByIdSuffix(page, 'mediaMathSetting__bidCpmAudio'),
    bidCpmCtv: await readByIdSuffix(page, 'mediaMathSetting__bidCpmCtv')
  };
}

export async function saveBackendClient(page: Page): Promise<void> {
  await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Update and Close Button').click();
}

export async function createOrUpdateBackendClient(page: Page, options: BackendClientUpsertOptions): Promise<void> {
  await openClientsPage(page);

  if (options.action === 'create') {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Actions Menu').click();
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Add New').waitFor({ state: 'visible' });
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Add New').click();
  } else {
    await katalonLocator(
      page,
      'Object Repository/Backend/Backend Admin/Clients/Client Listing Page/Client Name Filter Dropdown'
    ).selectOption({
      label: options.existingClientName || ''
    });
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Clients/Client Listing Page/Edit Client Button', {
      clientName: options.clientName || options.existingClientName || ''
    }).click();
  }

  await openClientA360Settings(page);

  if (options.isActive) {
    await katalonLocator(
      page,
      'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Is Active Dropdown'
    ).selectOption({ label: options.isActive });
  }
  if (options.clientName) {
    await katalonLocator(
      page,
      'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Client Name Input'
    ).fill(options.clientName);
  }
  if (options.tier) {
    await katalonLocator(
      page,
      'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Client Tier Dropdown'
    ).selectOption({ label: options.tier });
  }
  if (options.salesforceAccountId) {
    await katalonLocator(
      page,
      'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Salesforce Account ID Input'
    ).fill(options.salesforceAccountId);
  }
  if (options.type) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Type Dropdown').selectOption({
      label: options.type
    });
  }
  if (options.target) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Target Dropdown').selectOption({
      label: options.target
    });
  }
  if (options.sso) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/SSO Dropdown').selectOption({
      label: options.sso
    });
  }
  if (options.dpmCpm) {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/DPM CPM Input').fill(
      options.dpmCpm
    );
  }
  for (const adServer of options.adServers || []) {
    await katalonLocator(
      page,
      'Object Repository/Backend/Backend Admin/Clients/Client Tabs/A360 Settings Tab/Ad Server Multiselect'
    ).selectOption({ label: adServer });
  }

  await openClientA360Settings(page);

  if (options.action === 'update' && typeof options.isDelinquent === 'boolean') {
    const checkbox = katalonLocator(
      page,
      'Object Repository/Backend/Backend Admin/Clients/Client Tabs/Billing Tab/Delinquent Flag Checkbox'
    );
    const checked = await checkbox.isChecked().catch(() => false);
    if (checked !== options.isDelinquent) {
      if (options.isDelinquent) {
        await checkbox.check();
      } else {
        await checkbox.uncheck();
      }
    }
  }

  if (options.action === 'create') {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Create and Return to List Button').click();
  } else {
    await katalonLocator(page, 'Object Repository/Backend/Backend Admin/Common/Update and Close Button').click();
  }
}
