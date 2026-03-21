import fs from 'node:fs';
import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { katalonLocator } from '../locators/resolve';
import { config } from '../utils/config';

function resolveFrontendRoute(page: Page, fallbackPath: string): string {
  const currentUrl = page.url();

  if (currentUrl) {
    try {
      return new URL(fallbackPath, currentUrl).toString();
    } catch {
      // fall through to configured base URL
    }
  }

  const frontendUrl = config.frontendUrl;
  if (!frontendUrl) {
    throw new Error('Unable to resolve audience route. Set ADDAPTIVE_FRONTEND_URL.');
  }

  return new URL(fallbackPath, frontendUrl).toString();
}

export async function openFirstPartyAudiencePage(page: Page): Promise<void> {
  const createAudienceLink = katalonLocator(page, 'Object Repository/Frontend/Audiences/a_ActivateAudience');
  if (await createAudienceLink.isVisible().catch(() => false)) {
    await createAudienceLink.click();
    await page.waitForLoadState('domcontentloaded');
    return;
  }

  const fallbackCreateLink = page.getByRole('link', { name: /activate audience/i }).first();
  if (await fallbackCreateLink.isVisible().catch(() => false)) {
    await fallbackCreateLink.click();
    await page.waitForLoadState('domcontentloaded');
    return;
  }

  await page.goto(resolveFrontendRoute(page, '/audiences/create'), { waitUntil: 'domcontentloaded' });
}

export async function openExistingAudiencePage(
  page: Page,
  options: {
    objectId?: string;
    existingSegmentName?: string;
  }
): Promise<void> {
  if (options.objectId) {
    await page.goto(resolveFrontendRoute(page, `/audiences/${options.objectId}/edit`), { waitUntil: 'domcontentloaded' });

    const updateButton = page.getByRole('button', { name: /^Update$/i }).first();
    if (await updateButton.isVisible().catch(() => false)) {
      return;
    }
  }

  await openAudienceListingPage(page);

  if (options.existingSegmentName) {
    const searchInput = katalonLocator(page, 'Object Repository/Frontend/Audiences/AudienceListingPage/input_Audiences_Search');
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill(options.existingSegmentName);
    } else {
      const fallbackSearch = page.locator('#audience-list-filter-search').first();
      if (await fallbackSearch.isVisible().catch(() => false)) {
        await fallbackSearch.fill(options.existingSegmentName);
      }
    }

    const exactLink = page.getByRole('link', { name: new RegExp(`^\\s*${escapeRegex(options.existingSegmentName)}\\s*$`, 'i') }).first();
    if (await exactLink.isVisible().catch(() => false)) {
      await exactLink.click();
      await page.waitForLoadState('domcontentloaded');
      return;
    }

    const textMatch = page.getByText(options.existingSegmentName, { exact: false }).first();
    if (await textMatch.isVisible().catch(() => false)) {
      await textMatch.click();
      await page.waitForLoadState('domcontentloaded');
      return;
    }
  }

  throw new Error(
    'Edit audience requires a reachable audience record. Provide a valid object_id or existing_segment_name in audiences_suite.'
  );
}

export async function openAudienceListingPage(page: Page): Promise<void> {
  const audiencesTab = katalonLocator(page, 'Object Repository/Frontend/Audiences/a_AudiencesTab');
  if (await audiencesTab.isVisible().catch(() => false)) {
    await audiencesTab.click();
    await page.waitForLoadState('domcontentloaded');
    return;
  }

  const fallbackAudiencesLink = page.getByRole('link', { name: /^Audiences$/i }).first();
  if (await fallbackAudiencesLink.isVisible().catch(() => false)) {
    await fallbackAudiencesLink.click();
    await page.waitForLoadState('domcontentloaded');
    return;
  }

  await page.goto(resolveFrontendRoute(page, '/audiences'), { waitUntil: 'domcontentloaded' });
}

export async function chooseSegmentActivationType(page: Page, activationType: string): Promise<void> {
  const normalized = activationType.trim().toLowerCase().replace(/-/g, ' ');
  await page.getByText(/choose your segment activation type/i).waitFor({ state: 'visible', timeout: 10000 }).catch(() => undefined);
  const katalonPathByType: Record<string, Parameters<typeof katalonLocator>[1]> = {
    '1st party data': 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/h2_1st Party Data',
    'business data': 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/h2_Business Data',
    'onsite intent': 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/h2_Audiences_OnsiteIntent'
  };

  const katalonPath = katalonPathByType[normalized];
  if (katalonPath) {
    const katalonTile = katalonLocator(page, katalonPath);
    if (await katalonTile.isVisible().catch(() => false)) {
      await katalonTile.click();
      await page.waitForLoadState('domcontentloaded');
      return;
    }
  }

  if (normalized === 'onsite intent') {
    const onsiteHeading = page.locator('h2').filter({ hasText: /On-?site Intent/i }).first();
    if (await onsiteHeading.isVisible().catch(() => false)) {
      await onsiteHeading.click();
      await page.waitForLoadState('domcontentloaded');
      return;
    }

    const onsiteCard = page.getByText(/On-?site Intent/i, { exact: false }).first();
    if (await onsiteCard.isVisible().catch(() => false)) {
      await onsiteCard.click();
      await page.waitForLoadState('domcontentloaded');
      return;
    }
  }

  const textCandidates = [...new Set([activationType, activationType.replace(/Onsite/i, 'On-site'), activationType.replace(/On-site/i, 'Onsite')])];
  for (const candidate of textCandidates) {
    const tile = page.getByText(candidate, { exact: false }).first();
    if (await tile.isVisible().catch(() => false)) {
      await tile.click();
      await page.waitForLoadState('domcontentloaded');
      return;
    }
  }

  throw new Error(`Unable to find audience activation type tile for "${activationType}".`);
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function openFirstPartyMatchCriteria(page: Page): Promise<void> {
  const tab = katalonLocator(
    page,
    'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/a_Match Criteria'
  );

  if (await tab.isVisible().catch(() => false)) {
    await tab.click();
  }
}

export async function openAudienceMatchCriteria(page: Page): Promise<void> {
  await openFirstPartyMatchCriteria(page);

  const fallbackTab = page.getByRole('link', { name: /Match Criteria/i }).first();
  if (await fallbackTab.isVisible().catch(() => false)) {
    await fallbackTab.click();
  }
}

type FirstPartyMatchCriteriaOptions = {
  activationType?: string;
  activationSubtype?: string;
  emailType?: string;
  hashType?: string;
  advertiser?: string;
  filePath?: string;
  fileContainsHeaderRow?: 'checked' | 'unchecked';
  primaryDimensions?: string[];
  filterCriteria?: 'active' | 'inactive' | string;
};

type FirstPartyMatchCriteriaResult = {
  audienceErrors: string[];
};

type BusinessDataMatchCriteria = {
  id: string;
  criteriaType?: string;
  value?: string;
  cardGroup?: string;
  cardText?: string;
};

async function getAudienceAlertTexts(page: Page): Promise<string[]> {
  const alertTexts = await page.locator('app-audience-import div.alert-danger').allInnerTexts().catch(() => []);
  return [...new Set(alertTexts.flatMap((text) => text.split('\n')).map((item) => item.trim()).filter(Boolean))];
}

function parseCsvRow(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === ',') {
      values.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function readCsvHeaders(filePath?: string): string[] {
  if (!filePath || !fs.existsSync(filePath)) {
    return [];
  }

  const firstLine = fs
    .readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .find((line) => line.trim().length > 0);

  if (!firstLine) {
    return [];
  }

  return parseCsvRow(firstLine).map((value) => value.trim());
}

function normalizeHeader(value: string): string {
  return value.toLowerCase().replace(/\uFEFF/g, '').replace(/_/g, ' ').trim();
}

function getBusinessDataDisplayCandidates(criterion: BusinessDataMatchCriteria): string[] {
  const candidates = new Set<string>();
  const pushCandidate = (value?: string) => {
    const trimmed = value?.trim();
    if (trimmed) {
      candidates.add(trimmed);
    }
  };

  pushCandidate(criterion.cardText);
  pushCandidate(criterion.value);

  const value = criterion.value?.trim();
  if (value) {
    pushCandidate(value.replace(/^[\d.]+\s+/, ''));
    pushCandidate(value.split(':').pop()?.trim());
  }

  return [...candidates];
}

function getNormalizedBusinessDataText(value: string): string {
  return value.toLowerCase().replace(/\s+/g, ' ').trim();
}

async function getPrimaryDimensionSpans(page: Page): Promise<string[]> {
  return katalonLocator(
    page,
    'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Primary Dimension Spans'
  )
    .allInnerTexts()
    .then((items) => items.map((item) => item.trim()).filter(Boolean))
    .catch(() => []);
}

async function getCustomDimensions(page: Page, columnNumber: number): Promise<string[]> {
  await openPrimaryDimensionDropdown(page, columnNumber);
  const values = await katalonLocator(
    page,
    'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Custom Dimension LIs',
    { columnNumber: String(columnNumber) }
  )
    .allInnerTexts()
    .then((items) => items.map((item) => item.trim()).filter(Boolean))
    .catch(() => []);
  await page.keyboard.press('Escape').catch(() => undefined);
  return values;
}

async function waitForFirstPartyUploadReady(page: Page): Promise<void> {
  const successMessage = katalonLocator(
    page,
    'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/div_Audiences_1stParty_MatchCriteria_AddFile_Message'
  );
  const previewHeading = page.getByText(/^Preview$/i).first();
  const previewGrid = page.locator('table').first();
  const uploadingText = page.getByText(/Uploading File/i).last();
  const errorAlert = page.locator('app-audience-import div.alert-danger').first();

  if (await successMessage.isVisible().catch(() => false)) {
    return;
  }

  await expect
    .poll(
      async () => {
        const messageVisible = await successMessage.isVisible().catch(() => false);
        const previewVisible = await previewHeading.isVisible().catch(() => false);
        const gridVisible = await previewGrid.isVisible().catch(() => false);
        const uploadingVisible = await uploadingText.isVisible().catch(() => false);
        const errorVisible = await errorAlert.isVisible().catch(() => false);
        return messageVisible || errorVisible || (previewVisible && gridVisible && !uploadingVisible);
      },
      {
        timeout: 15000,
        message: 'Audience file upload did not reach a settled state.'
      }
    )
    .toBe(true);
}

async function setFileContainsHeaderRow(page: Page, state?: 'checked' | 'unchecked'): Promise<void> {
  if (!state) {
    return;
  }

  const checkbox = katalonLocator(
    page,
    'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/input_FileContainsaHeaderRow'
  );

  await expect(checkbox).toBeVisible();

  if (state === 'checked') {
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  } else {
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  }
}

async function dismissBlockingDialogs(page: Page): Promise<void> {
  const modalWindow = page.locator('ngb-modal-window').last();
  if (await modalWindow.isVisible().catch(() => false)) {
    await page.keyboard.press('Escape').catch(() => undefined);
    await modalWindow.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => undefined);
  }
}

async function openPrimaryDimensionDropdown(
  page: Page,
  columnNumber: number
): Promise<ReturnType<typeof katalonLocator>> {
  const primaryDimensionSpan = katalonLocator(
    page,
    'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/span_Audiences_1stParty_MatchCriteria_PrimaryDimension',
    { columnNumber: String(columnNumber) }
  );

  await dismissBlockingDialogs(page);
  await primaryDimensionSpan.scrollIntoViewIfNeeded().catch(() => undefined);
  await primaryDimensionSpan.click({ force: true });

  return primaryDimensionSpan;
}

async function clickPrimaryDimensionItem(
  page: Page,
  columnNumber: number,
  dimension: string
): Promise<void> {
  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await openPrimaryDimensionDropdown(page, columnNumber);

      const columnPreview = page.locator("div[class*='header-preview-div']").nth(columnNumber - 1);
      const item = columnPreview
        .locator('ngb-popover-window li span')
        .filter({ hasText: new RegExp(`^${escapeRegex(dimension)}$`) })
        .first();

      await item.waitFor({ state: 'visible', timeout: 5000 });
      await item.scrollIntoViewIfNeeded().catch(() => undefined);
      await item.click({ force: true });
      return;
    } catch (error) {
      lastError = error;
      await page.keyboard.press('Escape').catch(() => undefined);
      await page.waitForTimeout(250);
    }
  }

  throw lastError instanceof Error ? lastError : new Error(`Unable to select primary dimension "${dimension}".`);
}

async function setPrimaryDimensions(page: Page, primaryDimensions: string[]): Promise<void> {
  let columnNumber = 1;

  for (const originalDimension of primaryDimensions) {
    let primaryDimension = originalDimension.trim();
    if (!primaryDimension) {
      columnNumber += 1;
      continue;
    }

    if (primaryDimension.includes('(custom)')) {
      primaryDimension = primaryDimension.replace(/\(custom\)/i, '').trim();
      await openPrimaryDimensionDropdown(page, columnNumber);
      await katalonLocator(page, 'Object Repository/Frontend/Audiences/New Custom Dimension Span').click();
      await katalonLocator(page, 'Object Repository/Frontend/Audiences/Custom Dimension Input').fill(primaryDimension);
      await katalonLocator(page, 'Object Repository/Frontend/Audiences/Custom Dimension Continue Button').click();
    } else {
      await clickPrimaryDimensionItem(page, columnNumber, primaryDimension);

      if (primaryDimension === 'Do Not Import') {
        const primaryDimensionSpan = katalonLocator(
          page,
          'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/span_Audiences_1stParty_MatchCriteria_PrimaryDimension',
          { columnNumber: String(columnNumber) }
        );
        await primaryDimensionSpan.click({ force: true }).catch(() => undefined);
      }
    }

    columnNumber += 1;
  }

  await page.keyboard.press('Escape').catch(() => undefined);
}

async function verifyDuplicatePrimaryDimensions(page: Page, audienceErrors: string[]): Promise<void> {
  const spans = await getPrimaryDimensionSpans(page);
  const normalized = spans.filter((item) => item && item !== 'Do Not Import').sort();

  let hasDuplicate = false;
  for (let index = 0; index < normalized.length - 1; index += 1) {
    if (normalized[index] === normalized[index + 1]) {
      hasDuplicate = true;
      break;
    }
  }

  if (!hasDuplicate) {
    return;
  }

  await expect(
    page.getByText(/Multiple columns cannot be mapped to the same Dimension/i).first()
  ).toBeVisible();

  audienceErrors.push('Multiple columns cannot be mapped to the same Dimension');
}

async function verifyEmailHeaderValidation(
  page: Page,
  options: Pick<FirstPartyMatchCriteriaOptions, 'emailType' | 'filePath'>,
  audienceErrors: string[]
): Promise<void> {
  if (!options.emailType || !options.filePath) {
    return;
  }

  const normalizedType = options.emailType.toLowerCase();
  const headers = readCsvHeaders(options.filePath);
  if (headers.length === 0) {
    return;
  }

  const validHeaders = normalizedType.includes('liveramp')
    ? ['first_name', 'last_name', 'address', 'address_2', 'city', 'state', 'zip', 'zip4', 'email_1', 'email_2', 'email_3']
    : ['email'];

  const invalidHeaders = headers
    .map((header) => header.trim())
    .filter(Boolean)
    .map((header) => ({
      raw: header,
      normalized: normalizeHeader(header)
    }))
    .filter((header) => !validHeaders.includes(header.normalized))
    .map((header) =>
      normalizedType.includes('liveramp')
        ? `${header.raw} is not a a valid Live Ramp header.`
        : `${header.raw} is not a a valid Customer Match header.`
    );

  if (invalidHeaders.length === 0) {
    return;
  }

  const alertTexts = await getAudienceAlertTexts(page);
  for (const expectedMessage of invalidHeaders) {
    expect(
      alertTexts.some((text) => text.includes(expectedMessage)),
      `Missing expected audience alert: ${expectedMessage}`
    ).toBe(true);
  }

  audienceErrors.push(...invalidHeaders);
}

async function verifyMappedHeaderValidation(
  page: Page,
  options: Pick<FirstPartyMatchCriteriaOptions, 'activationType' | 'activationSubtype'>,
  audienceErrors: string[]
): Promise<void> {
  if (!options.activationType || options.activationType.toLowerCase() === 'email') {
    return;
  }

  const primaryDimensionSpans = await getPrimaryDimensionSpans(page);
  const sortedList = [...primaryDimensionSpans].sort();
  const filteredSortedList = sortedList.filter((item) => item !== 'Do Not Import');
  const customDimensions = await getCustomDimensions(page, 1);
  const expectedErrorMessages: string[] = [];
  const activationType = options.activationType.toLowerCase();
  const subtype = options.activationSubtype?.toLowerCase() || '';

  if (activationType === 'consumer address') {
    const consumerAddressFiltered = sortedList.filter((item) => item !== 'Do Not Import' && !customDimensions.includes(item));
    if (consumerAddressFiltered.length === 0) {
      expectedErrorMessages.push('No Mapped Headers Found, Please Check Configuration!');
      expectedErrorMessages.push('The file must have at least one entry.');
    } else if (
      !consumerAddressFiltered.includes('Full Consumer Address') &&
      filteredSortedList.length === 1 &&
      (!consumerAddressFiltered.includes('Address 1') ||
        !consumerAddressFiltered.includes('City') ||
        !consumerAddressFiltered.includes('State') ||
        !consumerAddressFiltered.includes('ZIP'))
    ) {
      expectedErrorMessages.push(
        'Your address based import file must contain a Full Address (Single Column) or all required separate Address columns: Address 1, City, State, and ZIP. Also, it can optionally include Account, Account ID, and Custom Dimensions'
      );
    }
  } else if (activationType === 'account') {
    const filteredDoNotImportAndCustomDimensionsList = sortedList.filter(
      (item) => item !== 'Do Not Import' && !customDimensions.includes(item) && item.toLowerCase() !== 'full account'
    );

    if (subtype !== 'global') {
      if (filteredSortedList.length === 0) {
        expectedErrorMessages.push('No Mapped Headers Found, Please Check Configuration!');
        expectedErrorMessages.push('The file must have at least one entry.');
      } else if (filteredDoNotImportAndCustomDimensionsList.length === 0) {
        expectedErrorMessages.push(
          'Your file currently does not have a Primary Dimension mapped. To activate this segment, your file must be mapped to at least one of the following dimensions: Account or DUNS Number.'
        );
      }
    } else if (
      !sortedList.includes('Account') &&
      !sortedList.includes('Account Domain') &&
      !sortedList.includes('Account ID')
    ) {
      expectedErrorMessages.push('At a minimum, you must map Account, Domain or Account ID for a Global Account Import.');
    }
  } else if (activationType === 'alt. identifier') {
    if (filteredSortedList.length === 0) {
      expectedErrorMessages.push('No Mapped Headers Found, Please Check Configuration!');
      expectedErrorMessages.push('The file must have at least one entry.');
    } else if (
      !primaryDimensionSpans.includes('Single IP Addresses') &&
      !primaryDimensionSpans.includes('IP Address Ranges') &&
      !primaryDimensionSpans.includes('User ID')
    ) {
      expectedErrorMessages.push('Alt. Identifier segment columns must include one of ip_address | ip_address_range | third_party_user_id');
    }
  }

  if (expectedErrorMessages.length === 0) {
    return;
  }

  const alertTexts = await getAudienceAlertTexts(page);
  for (const expectedMessage of expectedErrorMessages) {
    expect(
      alertTexts.some((text) => text.includes(expectedMessage)),
      `Missing expected audience alert: ${expectedMessage}`
    ).toBe(true);
  }

  audienceErrors.push(...expectedErrorMessages);
}

export async function configureFirstPartyMatchCriteria(
  page: Page,
  options: FirstPartyMatchCriteriaOptions
): Promise<FirstPartyMatchCriteriaResult> {
  const audienceErrors: string[] = [];
  await openFirstPartyMatchCriteria(page);

  if (options.activationType) {
    const activationDropdown = katalonLocator(
      page,
      'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/span_Audiences_1stParty_MatchCriteria_ActivationType',
      { activationType: '' }
    );
    const currentValue = ((await activationDropdown.textContent().catch(() => '')) || '').toLowerCase();

    if (!currentValue.includes(options.activationType.toLowerCase())) {
      await activationDropdown.click();

      const activationItem = katalonLocator(
        page,
        'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Audiences_1stParty_MatchCriteria_ActivationType_Item',
        { activationType: options.activationType }
      );

      if (await activationItem.isVisible().catch(() => false)) {
        await activationItem.click();
      }
    }
  }

  if (options.emailType) {
    const normalizedEmailType = options.emailType.toLowerCase();
    const customerMatchButton = katalonLocator(
      page,
      'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Customer Match/Customer Match Button'
    );
    const liverampButton = katalonLocator(
      page,
      'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Customer Match/Liveramp Button'
    );

    const targetButton =
      normalizedEmailType.includes('liveramp')
        ? liverampButton
        : customerMatchButton;

    if (await targetButton.isVisible().catch(() => false)) {
      await targetButton.click();
    } else {
      const fallbackButton = page.getByRole('button', { name: new RegExp(options.emailType, 'i') }).first();
      if (await fallbackButton.isVisible().catch(() => false)) {
        await fallbackButton.click();
      }
    }

    if (normalizedEmailType.includes('customer match') && options.hashType) {
      const normalizedHashType = options.hashType.toLowerCase();
      const hashOption = normalizedHashType.includes('hashed')
        ? katalonLocator(
            page,
            'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Customer Match/Hashed File Radio Option'
          )
        : katalonLocator(
            page,
            'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/Customer Match/Plain Text Radio Option'
          );

      if (await hashOption.isVisible().catch(() => false)) {
        await hashOption.click();
      }
    }
  }

  if (options.advertiser) {
    const advertiserInput = katalonLocator(
      page,
      'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/input_Audiences_1stParty_MatchCriteria_Advertiser'
    );
    if (await advertiserInput.isVisible().catch(() => false)) {
      await advertiserInput.fill(options.advertiser);
      await katalonLocator(
        page,
        'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/span_Audiences_1stParty_MatchCriteria_Advertiser_Item',
        { advertiser: options.advertiser }
      ).click();
    }
  }

  if (options.filePath) {
    await katalonLocator(
      page,
      'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/input_Audiences_1stParty_MatchCriteria_AddFile'
    ).setInputFiles(options.filePath);
    await waitForFirstPartyUploadReady(page);
  }

  await setFileContainsHeaderRow(page, options.fileContainsHeaderRow);

  if (options.primaryDimensions && options.primaryDimensions.length > 0) {
    await setPrimaryDimensions(page, options.primaryDimensions);
    await verifyDuplicatePrimaryDimensions(page, audienceErrors);
  }

  if (options.filterCriteria) {
    const toggle = katalonLocator(
      page,
      'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/label_Audiences_1stParty_MatchCriteria_FilterCriteriaStatus'
    );
    const desired = options.filterCriteria.toLowerCase();
    const current = ((await toggle.textContent()) || '').toLowerCase();

    if ((desired === 'active' && current.includes('inactive')) || (desired === 'inactive' && current.includes('active'))) {
      await toggle.click();
    }
  }

  await verifyEmailHeaderValidation(page, options, audienceErrors);
  await verifyMappedHeaderValidation(page, options, audienceErrors);

  return {
    audienceErrors
  };
}

export async function setAudienceFilterTarget(page: Page, mode: 'all' | 'any' = 'any'): Promise<void> {
  await openAudienceMatchCriteria(page);

  const toggle = katalonLocator(
    page,
    'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/label_Audiences_BusinessData_MatchCriteria_Target'
  );

  if (await toggle.isVisible().catch(() => false)) {
    if (mode === 'all') {
      const currentText = await toggle.textContent();
      if (!currentText?.includes('All')) {
        await toggle.click();
      }
    }
    return;
  }

  const fallbackToggle = page.getByText(/Target (Any|All)/i).last();
  if (await fallbackToggle.isVisible().catch(() => false)) {
    const currentText = ((await fallbackToggle.textContent()) || '').toLowerCase();
    if ((mode === 'all' && !currentText.includes('all')) || (mode === 'any' && !currentText.includes('any'))) {
      await fallbackToggle.click();
    }
    return;
  }

  if (mode === 'all') {
    const allButton = page.getByRole('button', { name: /all/i }).first();
    if (await allButton.isVisible().catch(() => false)) {
      await allButton.click();
    }
  } else {
    const anyButton = page.getByRole('button', { name: /any/i }).first();
    if (await anyButton.isVisible().catch(() => false)) {
      await anyButton.click();
    }
  }
}

async function openBusinessDataMatchCriteria(page: Page): Promise<void> {
  await openAudienceMatchCriteria(page);

  const businessDataTypeSelect = katalonLocator(
    page,
    'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/select_Audiences_BusinessData_MatchCriteria_Type'
  );
  await expect(businessDataTypeSelect).toBeVisible();
}

async function addBusinessDataCriterion(page: Page, criterion: BusinessDataMatchCriteria): Promise<void> {
  if (!criterion.criteriaType) {
    return;
  }

  const criteriaTypeSelect = katalonLocator(
    page,
    'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/select_Audiences_BusinessData_MatchCriteria_Type'
  );
  await criteriaTypeSelect.selectOption({ label: criterion.criteriaType });

  switch (criterion.criteriaType) {
    case 'Business Name':
    case 'City':
    case 'Duplicate Audience Rules': {
      const searchInput = katalonLocator(
        page,
        'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/input_Audiences_BusinessData_MatchCriteria_CriteriaSearch'
      );
      await searchInput.fill(criterion.value || '');
      await katalonLocator(
        page,
        'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/button_Audiences_BusinessData_MatchCriteria_CriteriaSearchResult',
        { criteriaValue: criterion.value || '' }
      ).click();
      break;
    }
    case 'Business Type':
    case 'Province':
    case 'State':
    case 'Years in Business':
    case 'Number of Employees':
    case 'Fortune 1000':
    case 'Publicly Traded Company':
    case 'Sales Volume':
    case 'Country': {
      await katalonLocator(
        page,
        'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/a_Audiences_BusinessData_MatchCriteria_CriteriaTypeSelection',
        { criteriaValue: criterion.value || '' }
      ).click();
      break;
    }
    case 'SIC Code':
    case 'NAICS Code': {
      const searchInput = katalonLocator(
        page,
        'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/input_Audiences_BusinessData_MatchCriteria_NAICSSearch'
      );
      await searchInput.fill(criterion.value || '');
      await katalonLocator(
        page,
        'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/span_Audiences_BusinessData_MatchCriteria_NAICSSearchResult',
        { naics: criterion.value || '' }
      ).click();
      break;
    }
    case 'Sales Volume Range':
    case 'Years in Business Range':
    case 'Number of Employees Range': {
      const [from = '', to = ''] = (criterion.value || '').split(':').map((item) => item.trim());
      await katalonLocator(
        page,
        'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/input_Audiences_BusinessData_MatchCriteria_RevenueRangeFrom'
      ).fill(from);
      await katalonLocator(
        page,
        'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/input_Audiences_BusinessData_MatchCriteria_RevenueRangeTo'
      ).fill(to);
      await katalonLocator(
        page,
        'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/button_Audiences_BusinessData_MatchCriteria_RevenueRangeAdd'
      ).click();
      break;
    }
    case 'County': {
      const [countyState = '', countyName = ''] = (criterion.value || '').split(':').map((item) => item.trim());
      await katalonLocator(
        page,
        'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/span_Audiences_BusinessData_MatchCriteria_CountyState',
        { countyState }
      ).click();
      await katalonLocator(
        page,
        'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/span_Audiences_BusinessData_MatchCriteria_County',
        { countyName }
      ).click();
      break;
    }
    case 'Advanced Settings': {
      await katalonLocator(
        page,
        'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/span_Audiences_BusinessData_MatchCriteriaAdvanceSettings',
        { advancedSettings: criterion.value || '' }
      ).click();
      break;
    }
    default:
      throw new Error(`Unsupported business data criteria type: ${criterion.criteriaType}`);
  }
}

async function setBusinessDataBulkImport(
  page: Page,
  options: {
    bulkImportMode?: 'active' | 'inactive';
    bulkImportFileType?: string;
    bulkImportFilePath?: string;
  }
): Promise<void> {
  if (!options.bulkImportMode) {
    return;
  }

  const toggleContainer = katalonLocator(
    page,
    'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/input_Audiences_BusinessData_MatchCriteria_BulkImportToggle'
  );
  const toggleLabel = katalonLocator(
    page,
    'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/span_Audiences_BusinessData_MatchCriteria_BulkImportToggle'
  );
  await expect(toggleContainer).toBeVisible();

  const currentLabel = ((await toggleLabel.textContent().catch(() => '')) || '').trim().toLowerCase();
  const shouldActivate = options.bulkImportMode === 'active';
  const isActive = currentLabel === 'active';

  if ((shouldActivate && !isActive) || (!shouldActivate && isActive)) {
    await toggleContainer.click({ force: true });
  }

  await expect
    .poll(async () => ((await toggleLabel.textContent().catch(() => '')) || '').trim().toLowerCase())
    .toBe(options.bulkImportMode);

  if (options.bulkImportMode !== 'active') {
    return;
  }

  if (options.bulkImportFileType) {
    const bulkUploadType = katalonLocator(
      page,
      'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/select_Audiences_BusinessData_MatchCriteria_BulkUploadType'
    );
    await expect(bulkUploadType).toBeVisible();
    await bulkUploadType.selectOption({ label: options.bulkImportFileType });
  }

  if (options.bulkImportFilePath) {
    const bulkUploadFile = katalonLocator(
      page,
      'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/input_Audiences_BusinessData_MatchCriteria_BulkUploadFile'
    );
    await expect(bulkUploadFile).toBeVisible();
    await bulkUploadFile.setInputFiles(options.bulkImportFilePath);
    await expect
      .poll(async () => (await bulkUploadFile.getAttribute('title').catch(() => '')) || '')
      .toContain(options.bulkImportFilePath.split('/').pop()!.replace(/ /g, '_'));
  }
}

export async function configureBusinessDataMatchCriteria(
  page: Page,
  options: {
    criteria: BusinessDataMatchCriteria[];
    targetMode: 'all' | 'any';
    bulkImportMode?: 'active' | 'inactive';
    bulkImportFileType?: string;
    bulkImportFilePath?: string;
  }
): Promise<{ audienceErrors: string[] }> {
  await openBusinessDataMatchCriteria(page);

  for (const criterion of options.criteria) {
    await addBusinessDataCriterion(page, criterion);
  }

  await setAudienceFilterTarget(page, options.targetMode);
  await setBusinessDataBulkImport(page, options);

  return { audienceErrors: [] };
}

export async function verifyBusinessDataMatchCriteria(
  page: Page,
  options: {
    criteria: BusinessDataMatchCriteria[];
    targetMode: 'all' | 'any';
    bulkImportMode?: 'active' | 'inactive';
    bulkImportFileType?: string;
    bulkImportFilePath?: string;
  }
): Promise<void> {
  await openBusinessDataMatchCriteria(page);
  const allVisibleTexts = getNormalizedBusinessDataText(
    (await page.locator('body').innerText().catch(() => '')) || ''
  );
  const handledReplacementTypes = new Set<string>();

  if (options.criteria.length === 0) {
    await expect(
      katalonLocator(
        page,
        'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/span_Audiences_MatchCriteria_FilterCriteria_GroupNameCardNumber',
        { groupName: '', cardNumber: '1' }
      )
    ).toHaveCount(0);
  } else {
    for (const criterion of options.criteria) {
      const replacementKey =
        criterion.criteriaType === 'SIC Code' && criterion.cardGroup === 'SIC Description'
          ? `${criterion.criteriaType}:${criterion.cardGroup}`
          : '';
      if (replacementKey && handledReplacementTypes.has(replacementKey)) {
        continue;
      }

      const groupName = criterion.cardGroup || criterion.criteriaType || '';
      const filterCriteria = criterion.cardText || criterion.value || '';
      const katalonCard = katalonLocator(
        page,
        'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/span_Audiences_MatchCriteria_FilterCriteriaCardName',
        { groupName, filterCriteria }
      );

      if (await katalonCard.isVisible().catch(() => false)) {
        await expect(katalonCard).toBeVisible();
        continue;
      }

      const fallbackTexts = [...new Set([filterCriteria, ...getBusinessDataDisplayCandidates(criterion)])];

      let matched = false;
      for (const text of fallbackTexts) {
        const fallbackCard = page.getByText(text, { exact: false }).first();
        if (await fallbackCard.isVisible().catch(() => false)) {
          await expect(fallbackCard).toBeVisible();
          matched = true;
          break;
        }
      }

      if (!matched && replacementKey) {
        const siblingCandidates = options.criteria
          .filter((item) => item.criteriaType === criterion.criteriaType && item.cardGroup === criterion.cardGroup)
          .flatMap((item) => getBusinessDataDisplayCandidates(item))
          .map(getNormalizedBusinessDataText);
        matched = siblingCandidates.some((candidate) => allVisibleTexts.includes(candidate));
        if (matched) {
          handledReplacementTypes.add(replacementKey);
        }
      }

      expect(matched, `Missing business data criterion card for ${criterion.criteriaType ?? criterion.id}`).toBe(true);
    }
  }

  await expectAudienceFilterTarget(page, options.targetMode);

  const bulkImportToggle = katalonLocator(
    page,
    'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/input_Audiences_BusinessData_MatchCriteria_BulkImportToggle'
  );
  await expect(bulkImportToggle).toBeVisible();
  const bulkImportToggleLabel = katalonLocator(
    page,
    'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/span_Audiences_BusinessData_MatchCriteria_BulkImportToggle'
  );

  if (options.bulkImportMode === 'active') {
    await expect(bulkImportToggleLabel).toHaveText(/Active/i);

    if (options.bulkImportFileType) {
      await expect(
        katalonLocator(
          page,
          'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/select_Audiences_BusinessData_MatchCriteria_BulkUploadType'
        )
      ).toHaveValue(/.+/);
    }
  } else if (options.bulkImportMode === 'inactive') {
    await expect(bulkImportToggleLabel).toHaveText(/Inactive/i);
  }
}

export async function expectAudienceFilterTarget(page: Page, mode: 'all' | 'any' = 'any'): Promise<void> {
  await openAudienceMatchCriteria(page);

  const expected = mode === 'all' ? 'Target All' : 'Target Any';
  const katalonTarget = katalonLocator(
    page,
    'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceBusinessData/MatchCriteria/label_Audiences_BusinessData_MatchCriteria_Target'
  );

  if (await katalonTarget.isVisible().catch(() => false)) {
    await expect(katalonTarget).toHaveText(expected);
    return;
  }

  const fallbackLabel = page.getByText(expected, { exact: false }).last();
  if (await fallbackLabel.isVisible().catch(() => false)) {
    await expect(fallbackLabel).toBeVisible();
    return;
  }

  if (mode === 'all') {
    await expect(page.getByRole('checkbox').last()).toBeVisible();
    return;
  }

  await expect(page.getByRole('checkbox').last()).toBeVisible();
}

export async function saveAudienceSettings(
  page: Page,
  options: {
    segmentName?: string;
    expirationDate?: string;
    activationSource?: string;
    primaryAddressOnly?: 'checked' | 'unchecked';
  }
): Promise<void> {
  const saveSettingsTab = katalonLocator(
    page,
    'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/a_Audiences_SaveSettingsTab'
  );
  await dismissBlockingDialogs(page);
  await expect
    .poll(async () => {
      const className = (await saveSettingsTab.getAttribute('class').catch(() => '')) || '';
      const ariaDisabled = (await saveSettingsTab.getAttribute('aria-disabled').catch(() => '')) || '';
      return !className.includes('disabled') && ariaDisabled !== 'true';
    })
    .toBe(true);
  await saveSettingsTab.scrollIntoViewIfNeeded().catch(() => undefined);
  await saveSettingsTab.click({ force: true });

  const segmentNameInput = katalonLocator(
    page,
    'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_SegmentName'
  );
  await expect(segmentNameInput).toBeVisible();

  if (options.segmentName) {
    await segmentNameInput.fill(options.segmentName);
  }

  if (options.expirationDate) {
    const expirationDateInput = katalonLocator(
      page,
      'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_ExpirationDate'
    );
    if (await expirationDateInput.isVisible().catch(() => false)) {
      await expirationDateInput.fill(options.expirationDate);
      await segmentNameInput.click();
    }
  }

  if (options.activationSource) {
    const activationSourceSelect = katalonLocator(
      page,
      'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/select_Activation_Source'
    );
    if (await activationSourceSelect.isVisible().catch(() => false)) {
      await activationSourceSelect.selectOption({ label: options.activationSource });
    }
  }

  if (options.primaryAddressOnly) {
    const primaryAddressOnlyInput = katalonLocator(
      page,
      'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_PrimaryAddressOnly'
    );
    if (await primaryAddressOnlyInput.isVisible().catch(() => false)) {
      if (options.primaryAddressOnly === 'checked') {
        await primaryAddressOnlyInput.check();
      } else {
        await primaryAddressOnlyInput.uncheck();
      }
    }
  }
}

export async function verifyAudienceSubmissionControls(
  page: Page,
  options: {
    action: 'create' | 'edit';
    isDraftSegment?: boolean;
    audienceErrors?: string[];
  }
): Promise<void> {
  const { action, isDraftSegment = false, audienceErrors = [] } = options;
  const submitButton =
    action === 'edit'
      ? isDraftSegment
        ? katalonLocator(page, 'Object Repository/Frontend/Audiences/button_Audiences_UpdateDraft')
        : katalonLocator(page, 'Object Repository/Frontend/Audiences/button_Audiences_Update')
      : isDraftSegment
        ? katalonLocator(page, 'Object Repository/Frontend/Audiences/button_Audiences_SaveAsDraft')
        : katalonLocator(page, 'Object Repository/Frontend/Audiences/button_Audiences_CreateLiveAudience');

  await expect(submitButton).toBeVisible();

  if (audienceErrors.length > 0) {
    await expect(submitButton).toBeDisabled();
    return;
  }

  await expect(submitButton).toBeEnabled();
  await submitButton.click();
}
