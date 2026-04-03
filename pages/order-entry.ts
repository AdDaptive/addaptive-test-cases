import fs from 'node:fs';
import path from 'node:path';
import type { Locator, Page } from '@playwright/test';
import { katalonLocator } from '../locators/resolve';
import { env } from '../utils/env';
import type { OrderEntryAudienceAction } from '../utils/order-entry-db';

export type OrderEntryBasicSetupOptions = {
  adServer: 'DPM' | 'MEDIAMATH' | 'PMP' | 'DFP' | string;
  orderAction?: string;
  orderName?: string;
  ioName?: string;
  campaignName?: string;
  campaignType?: string;
  revenueType?: string;
  lineItemName?: string;
  lineItems?: string[];
  curateDealName?: string;
  curateDSP?: string[];
  advertiser?: string;
  singleObjectDealId?: string;
  targetType?: string;
  creativeType?: string;
  insertionOrder?: string;
  orderNotes?: string;
};

export type OpenOrderEntryPageOptions = {
  orderEntryUrl?: string;
  orderAction?: string;
  existingLineItemName?: string;
};

export type OrderEntryObjectivesOptions = {
  adServer?: string;
  orderAction?: string;
  objectivesType?: string;
  objectivesGoal?: string;
  unitsValue?: string;
  objectivesGoalPriority?: string;
  objectivesOptimizationMethod?: string;
  objectivesOptimizationType?: string;
  objectivesOptimizationAmount?: string;
  objectivesMinimumMargin?: string;
  objectivesConversionPixelsType?: string;
  objectivesConversionPixels?: string[];
};

export type BannerCreativeOptions = {
  creativeName: string;
  orderAction?: string;
  creativeType?: string;
  creativeCategory?: string;
  creativeSize?: string;
  landingPageUrl?: string;
  thirdPartyUrl?: string;
  protocol?: string;
  filePath?: string;
  iconFilePath?: string;
  nativeTitle?: string;
  nativeSponsoredBy?: string;
  nativeBody?: string;
  nativeCallToAction?: string;
  htmlWithOrWithoutIframe?: string;
  creativeTagIds?: string;
  pixels?: Array<{
    creativeType?: string;
    pixelUrl?: string;
    actionType?: string;
    action?: string;
    pixelType?: string;
  }>;
  save?: boolean;
  allowDisabledSave?: boolean;
};

export type BulkCsvCreativeRow = {
  id: string;
  name?: string;
  type?: string;
  size?: string;
  protocol?: string;
  url?: string;
  thirdPartyUrl?: string;
  htmlWithOrWithoutIframe?: string;
  filePath?: string;
  iconFilePath?: string;
  title?: string;
  sponsoredBy?: string;
  body?: string;
  callToAction?: string;
};

export type OrderEntryBudgetFlightOptions = {
  adServer?: string;
  orderAction?: string;
  startDate?: string;
  endDate?: string;
  subDealId?: string;
  cpmValue?: string;
  impressionGoal?: string;
  optimizationCpm?: string;
  pacingPercentage?: string;
  pacingImpressionType?: string;
  pacingImpression?: string;
  dailyBudget?: string;
  xandrLifeBuffer?: string;
  xandrLifeBudget?: string;
};

export type OrderEntryInventoryOptions = {
  adServer?: string;
  geoTargetingType?: string;
  geoTargetingItems?: string[];
  profileName?: string;
  inventoryDevices?: string[];
  inventoryItem?: string;
  targetingTypeBrowser?: string;
  targetingBrowsers?: string[];
  inventoryInclusionList?: string[];
  inventoryExclusionList?: string[];
  viewabilityThreshold?: string;
  completionRateThreshold?: string;
  listenThroughThreshold?: string;
  postBidMeasurement?: 'yes' | 'no' | string;
  supplyStrategy?: 'Open Exchange' | 'Deals' | 'Both' | string;
  dealSelectionType?: 'Specific Deals' | 'All Deals' | string;
  crossDevice?: 'on' | 'off' | string;
  frequencyCapEnabled?: boolean;
  frequencyCap?: string;
  frequencyCapUnit?: string;
  recencyCapEnabled?: boolean;
  recencyCap?: string;
  recencyCapUnit?: string;
  dayPartingTimeSlots?: string[];
};

export type SplitUpdateOptions = {
  name?: string;
  bidModifiers?: string;
  status?: 'active' | 'inactive' | string;
  iabViewabilityRate?: {
    enabled: boolean;
    operator?: string;
    value?: string;
  };
};

const IGNORE_VALUES = new Set(['', '<NO-CHANGE>']);

function hasValue(value?: string): value is string {
  return !!value && !IGNORE_VALUES.has(value);
}

function parseList(value?: string): string[] {
  if (!hasValue(value)) {
    return [];
  }

  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function resolveCreativeAssetPath(filePath?: string): string | undefined {
  if (!hasValue(filePath)) {
    return undefined;
  }

  const candidates = [
    filePath,
    path.resolve(process.cwd(), filePath),
    path.resolve(process.cwd(), 'Data Files', 'Frontend', 'Order Entry', 'Creative Assets', filePath),
    path.resolve(__dirname, '..', '..', 'Data Files', 'Frontend', 'Order Entry', 'Creative Assets', filePath)
  ];

  return candidates.find((candidate) => fs.existsSync(candidate));
}

async function clearAndFill(page: Page, objectPath: string, value?: string): Promise<void> {
  if (!hasValue(value)) {
    return;
  }

  await katalonLocator(page, objectPath).fill('');
  await katalonLocator(page, objectPath).fill(value);
}


async function hasMatch(locator: Locator): Promise<boolean> {
  return locator
    .evaluateAll((elements) => elements.length > 0)
    .catch(() => false);
}

function maybeKatalonLocator(page: Page, objectPath: string, variables: Record<string, string | number> = {}): Locator | null {
  try {
    return katalonLocator(page, objectPath as never, variables);
  } catch {
    return null;
  }
}

async function waitUntilEditable(locator: Locator, timeoutMs = 5000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if ((await hasMatch(locator)) && (await locator.isEditable().catch(() => false))) {
      return true;
    }

    await locator.page().waitForTimeout(200);
  }

  return false;
}

async function waitUntilEnabled(locator: Locator, timeoutMs = 5000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if ((await hasMatch(locator)) && (await locator.isEnabled().catch(() => false))) {
      return true;
    }

    await locator.page().waitForTimeout(200);
  }

  return false;
}

async function waitForUiToSettle(page: Page, timeoutMs = 10000): Promise<void> {
  await page.waitForLoadState('networkidle').catch(() => undefined);
  await page
    .waitForFunction(() => {
      const visible = (element: Element | null): boolean => {
        if (!element) {
          return false;
        }
        const style = window.getComputedStyle(element as HTMLElement);
        return style.display !== 'none' && style.visibility !== 'hidden' && (element as HTMLElement).offsetParent !== null;
      };

      const blockers = [
        ...document.querySelectorAll('.modal.show, ngb-modal-window.show, .modal-backdrop.show'),
        ...document.querySelectorAll('.spinner-border, .ad-circle-icon-loading, [aria-busy="true"]')
      ];

      return blockers.every((element) => !visible(element));
    }, undefined, { timeout: timeoutMs })
    .catch(() => undefined);
}

function parsePercentageValue(value?: string): number | null {
  if (!value) {
    return null;
  }

  const normalized = value.replace(/%/g, '').trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

async function isVisible(page: Page, objectPath: string): Promise<boolean> {
  const locator = katalonLocator(page, objectPath);
  if (!(await hasMatch(locator))) {
    return false;
  }

  return locator.isVisible().catch(() => false);
}

async function clearAndFillIfVisible(page: Page, objectPath: string, value?: string): Promise<boolean> {
  if (!hasValue(value)) {
    return false;
  }

  const locator = katalonLocator(page, objectPath);
  if (!(await hasMatch(locator))) {
    return false;
  }

  const editable = await locator.isEditable().catch(() => false);
  if (!editable) {
    return false;
  }

  await locator.fill('');
  await locator.fill(value);
  return true;
}

async function fillDateFieldIfVisible(page: Page, objectPath: string, value?: string): Promise<boolean> {
  if (!hasValue(value)) {
    return false;
  }

  const locator = await resolveBudgetFlightDateLocator(page, objectPath);
  if (!locator) {
    return false;
  }

  if (!(await waitUntilEditable(locator, 5000))) {
    return false;
  }

  await locator.fill('');
  await locator.fill(value);
  await locator.press('Tab').catch(() => undefined);

  const currentValue =
    (await locator.inputValue().catch(async () => locator.getAttribute('value').catch(() => ''))) || '';
  return currentValue.trim() === value.trim();
}

async function readFieldValue(page: Page, objectPath: string): Promise<string> {
  const locator = await resolveBudgetFlightDateLocator(page, objectPath);
  if (!locator) {
    return '';
  }
  return (
    (await locator.inputValue().catch(async () => locator.getAttribute('value').catch(() => ''))) || ''
  ).trim();
}

async function resolveBudgetFlightDateLocator(page: Page, objectPath: string): Promise<Locator | null> {
  const fallbackCandidates =
    objectPath.includes('StartDate')
      ? [
          page.locator('#input-start').first(),
          page.locator('input[formcontrolname="startDate"]').first(),
          page.getByRole('textbox', { name: 'Start Date' }).first(),
          page.getByPlaceholder('Start Date').first(),
          page.locator('input[placeholder="Start Date"]').first()
        ]
      : [
          page.locator('#input-end').first(),
          page.locator('input[formcontrolname="endDate"]').first(),
          page.getByRole('textbox', { name: 'End Date' }).first(),
          page.getByPlaceholder('End Date').first(),
          page.locator('input[placeholder="End Date"]').first()
        ];

  for (const locator of [katalonLocator(page, objectPath), ...fallbackCandidates]) {
    if ((await hasMatch(locator)) && (await locator.isVisible().catch(() => false))) {
      return locator;
    }
  }

  return null;
}

async function describeBudgetFlightDateField(page: Page, objectPath: string): Promise<string> {
  const locator = await resolveBudgetFlightDateLocator(page, objectPath);
  if (!locator) {
    return 'missing';
  }

  return locator
    .evaluate((element) => {
      const input = element as HTMLInputElement;
      const rect = input.getBoundingClientRect();
      return JSON.stringify({
        id: input.id || '',
        name: input.getAttribute('name') || '',
        placeholder: input.getAttribute('placeholder') || '',
        type: input.getAttribute('type') || '',
        value: input.value || '',
        readOnly: input.readOnly,
        disabled: input.disabled,
        className: input.className || '',
        ariaDisabled: input.getAttribute('aria-disabled') || '',
        formControlName: input.getAttribute('formcontrolname') || '',
        outerHTML: input.outerHTML,
        rect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        }
      });
    })
    .catch((error) => `inspect-failed:${error instanceof Error ? error.message : String(error)}`);
}

async function isEditableIfPresent(locator: Locator): Promise<boolean> {
  if (!(await hasMatch(locator))) {
    return false;
  }

  return locator.isEditable().catch(() => false);
}

function normalizeGeoTypeLabel(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ');
}

function normalizeLabel(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ');
}

function csvEscape(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

async function fillFirstEditable(locators: Array<Locator | null | undefined>, value?: string, timeout = 3000): Promise<boolean> {
  if (!hasValue(value)) {
    return false;
  }

  for (const locator of locators) {
    if (!locator) {
      continue;
    }
    if (await waitUntilEditable(locator, timeout)) {
      await locator.fill(value);
          return true;
    }
  }

  return false;
}

async function addCreativePixels(
  page: Page,
  creativeIndex: number,
  creativeCategory: string,
  pixels: NonNullable<BannerCreativeOptions['pixels']>
): Promise<void> {
  const addPixelsButton = katalonLocator(
    page,
    'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/Add Third Party Pixel Button',
    { creativeIndex }
  );
  if (!(await addPixelsButton.isVisible().catch(() => false))) {
    return;
  }
  await addPixelsButton.click();

  while (true) {
    const deletePixelButton = maybeKatalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/Delete Pixel Button',
      { pixelCount: 1 }
    );
    if (!deletePixelButton || !(await deletePixelButton.isVisible().catch(() => false))) {
      break;
    }
    await deletePixelButton.click();
    await page.waitForTimeout(1000);
  }

  for (let pixelIndex = 0; pixelIndex < pixels.length; pixelIndex += 1) {
    const pixel = pixels[pixelIndex];
    const newPixelButton = katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/button_CreativesNewPixel',
      { creativeIndex }
    );
    await newPixelButton.click();

    const pixelCount = String(pixelIndex);
    const pixelRows = page.locator('app-third-party-pixel');
    const currentPixelRow = pixelRows.last();
    if (hasValue(pixel.pixelUrl)) {
      await katalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/input_CreativesPixelURL',
        { pixelCount }
      ).fill(pixel.pixelUrl);
    }

    if (creativeCategory === 'native' || creativeCategory === 'banner') {
      const actionType = (pixel.actionType || '').trim().toLowerCase();
      if (actionType === 'impression') {
        const impressionRadio = maybeKatalonLocator(
          page,
          'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/input_CreativesPixelActionTypeImpression',
          { pixelCount }
        );
        if (impressionRadio && (await impressionRadio.isVisible().catch(() => false))) {
          await impressionRadio.click();
        }
      } else if (actionType === 'click') {
        const clickRadio = maybeKatalonLocator(
          page,
          'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/input_CreativesPixelActionTypeClick',
          { pixelCount }
        );
        if (clickRadio && (await clickRadio.isVisible().catch(() => false))) {
          await clickRadio.click();
        }
      }
    } else if (hasValue(pixel.action)) {
      await katalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/Creative Pixels Action Dropdown',
        { pixelCount }
      ).selectOption({ label: pixel.action });
    }

    if (creativeCategory === 'native' || creativeCategory === 'banner') {
      const pixelType = (pixel.pixelType || '').trim().toLowerCase();
      if (pixelType === 'javascript') {
        const javascriptRadio = maybeKatalonLocator(
          page,
          'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/input_CreativesPixelTypeJavaScript',
          { pixelCount }
        );
        if (javascriptRadio && (await javascriptRadio.isVisible().catch(() => false))) {
          await javascriptRadio.click();
        } else {
          await currentPixelRow.getByText(/^Javascript$/i).click();
        }
      } else if (pixelType === 'image') {
        const imageRadio = maybeKatalonLocator(
          page,
          'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/input_CreativesPixelTypeImage',
          { pixelCount }
        );
        if (imageRadio && (await imageRadio.isVisible().catch(() => false))) {
          await imageRadio.click();
        } else {
          await currentPixelRow.getByText(/^Image$/i).click();
        }
      }
    }

    await page.waitForTimeout(2000);
  }

  const continueButton = katalonLocator(
    page,
    'Object Repository/Frontend/Order-Entry/Creatives-Tab/Third Party Pixels/Continue Button'
  );
  await continueButton.click();
  await continueButton.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => undefined);
  await page.waitForTimeout(1000);
}

function mapBulkCsvType(value?: string): string {
  const normalized = normalizeLabel(value || '');
  if (normalized === 'third party video url') {
    return 'video_url';
  }
  if (normalized === 'third party html with iframe') {
    return 'ad_tag';
  }
  if (normalized === 'third party html no iframe') {
    return 'ad_tag_no_iframe';
  }
  return '';
}

async function selectGeoTargetingType(page: Page, requestedType?: string): Promise<void> {
  if (!hasValue(requestedType)) {
    return;
  }

  const dropdown = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryGeoTargetingType');
  const raw = String(requestedType || '').trim();
  const normalized = normalizeGeoTypeLabel(raw);
  const aliases: Record<string, string> = {
    dma: 'Designated Marketing Area',
    'designated marketing area': 'Designated Marketing Area',
    global: 'Country'
  };

  const target = aliases[normalized] || raw;
  const selected = await dropdown
    .selectOption({ label: target })
    .then(() => true)
    .catch(async () => {
      const options = await dropdown
        .evaluate((element) =>
          Array.from((element as HTMLSelectElement).options)
            .map((option) => option.textContent || '')
            .map((value) => value.trim())
            .filter(Boolean)
        )
        .catch(() => []);
      const fallback = options.find((option) => normalizeGeoTypeLabel(option) === normalizeGeoTypeLabel(target));
      if (fallback) {
        await dropdown.selectOption({ label: fallback });
        return true;
      }
      return false;
    });

  if (!selected) {
    const options = await dropdown
      .evaluate((element) =>
        Array.from((element as HTMLSelectElement).options)
          .map((option) => option.textContent || '')
          .map((value) => value.trim())
          .filter(Boolean)
      )
      .catch(() => []);
    throw new Error(
      `Unknown geo targeting type "${raw}". Available options: ${options.join(', ')}`
    );
  }
}

async function selectOptionIfVisible(page: Page, objectPath: string, label?: string): Promise<boolean> {
  if (!hasValue(label) || !(await isVisible(page, objectPath))) {
    return false;
  }

  await katalonLocator(page, objectPath).selectOption({ label });
  return true;
}

function normalizeGeoText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

async function hasGeoTargetingSelection(page: Page, item: string): Promise<boolean> {
  const normalizedTarget = normalizeGeoText(item);
  if (!normalizedTarget) {
    return false;
  }

  const tagLocator = page.locator("div[id*='inventory-geotargeting-item'] span");
  const tagTexts = await tagLocator.allTextContents().catch(() => []);
  const targetTokens = normalizedTarget.split(/\s+/).filter((token) => token.length >= 2);

  return tagTexts.some((text) => {
    const normalizedText = normalizeGeoText(text);
    if (!normalizedText) {
      return false;
    }
    if (normalizedText.includes(normalizedTarget) || normalizedTarget.includes(normalizedText)) {
      return true;
    }

    const matchedTokens = targetTokens.filter((token) => normalizedText.includes(token));
    return targetTokens.length > 0 && matchedTokens.length === targetTokens.length;
  });
}

async function selectGeoTargetingItem(page: Page, item: string): Promise<void> {
  const inputObjectPath = 'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryGeoTargetingTargetSearch';
  const input = katalonLocator(page, inputObjectPath);
  const firstTypeaheadResult = page.locator('ngb-typeahead-window button, button[id^="ngb-typeahead-"]').first();
  const condensedItem = item.replace(/\s+/g, ' ').trim();
  const stateCodeMatch = condensedItem.match(/^(.+?)\s+([A-Za-z]{2})$/);
  const searchTerms = new Set<string>([
    condensedItem,
    condensedItem.split(',')[0]?.trim() || '',
    condensedItem.split('(')[0]?.trim() || ''
  ]);
  if (stateCodeMatch) {
    const city = stateCodeMatch[1].trim();
    const stateCode = stateCodeMatch[2].toUpperCase();
    searchTerms.add(`${city}, ${stateCode}`);
    searchTerms.add(city);
  }

  if (await hasGeoTargetingSelection(page, condensedItem)) {
    return;
  }

  const inputReady = await waitUntilEditable(input, 8000);
  if (!inputReady) {
    throw new Error(`Geo targeting search input is not editable for "${item}".`);
  }

  const initialTagCount = await page.locator("div[id*='inventory-geotargeting-item']").count().catch(() => 0);

  for (const term of Array.from(searchTerms).filter(Boolean)) {
    const activeInput = katalonLocator(page, inputObjectPath);
    const editable = await waitUntilEditable(activeInput, 4000);
    if (!editable) {
      continue;
    }

    await activeInput.click();
    await activeInput.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A').catch(() => undefined);
    await activeInput.press('Backspace').catch(() => undefined);
    await activeInput.pressSequentially(term, { delay: 70 });
    await page.waitForTimeout(250);
    const suggestionAppeared = await firstTypeaheadResult
      .waitFor({ state: 'visible', timeout: 4000 })
      .then(() => true)
      .catch(() => false);

    if (!suggestionAppeared) {
      if (await hasGeoTargetingSelection(page, condensedItem)) {
        return;
      }
      await activeInput.press('Escape').catch(() => undefined);
      continue;
    }

    await firstTypeaheadResult.click({ force: true });
    const selectionApplied = await page
      .waitForFunction(
        ({ selector, target, priorCount }) => {
          const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
          const normalizedTarget = normalize(target);
          const tokens = normalizedTarget.split(/\s+/).filter((token) => token.length >= 2);
          const tags = Array.from(document.querySelectorAll<HTMLElement>(selector));
          const tagTexts = tags.map((tag) => normalize(tag.textContent || ''));

          const hasSelection = tagTexts.some((text) => {
            if (!text) {
              return false;
            }
            if (text.includes(normalizedTarget) || normalizedTarget.includes(text)) {
              return true;
            }
            const matchedTokens = tokens.filter((token) => text.includes(token));
            return tokens.length > 0 && matchedTokens.length === tokens.length;
          });

          return hasSelection || tags.length > priorCount;
        },
        {
          selector: "div[id*='inventory-geotargeting-item'] span",
          target: condensedItem,
          priorCount: initialTagCount
        },
        { timeout: 4000 }
      )
      .then(() => true)
      .catch(() => false);
    if (selectionApplied || (await hasGeoTargetingSelection(page, condensedItem))) {
      return;
    }
  }

  throw new Error(`Geo targeting suggestion did not appear for "${item}".`);
}

async function ensureGeoSearchMode(page: Page, geoTargetingType?: string): Promise<void> {
  if (!hasValue(geoTargetingType)) {
    return;
  }

  const geoTypeSelector = katalonLocator(
    page,
    'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryGeoTargetingType'
  );
  const input = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryGeoTargetingTargetSearch');
  const expected = (geoTargetingType || '').trim().toLowerCase();

  if (!(await hasMatch(geoTypeSelector))) {
    return;
  }

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const current = await geoTypeSelector
      .evaluate((element) => {
        const select = element as HTMLSelectElement;
        return select.options[select.selectedIndex]?.textContent || '';
      })
      .catch(() => '');

    if (!current.trim().toLowerCase().includes(expected)) {
      await selectGeoTargetingType(page, geoTargetingType);
    }

    if ((await hasMatch(input)) && (await input.isEditable().catch(() => false))) {
      return;
    }
  }

  throw new Error(`Geo targeting search mode did not stabilize for type "${geoTargetingType}".`);
}

async function getLatestCreativeIndex(page: Page): Promise<number> {
  const creativeArticles = page.locator('article[id^="creative-"]');
  const articleCount = await creativeArticles.count();
  let latestIndex = 0;

  for (let index = 0; index < articleCount; index += 1) {
    const id = await creativeArticles.nth(index).getAttribute('id');
    const parsed = Number((id || '').replace(/^creative-/, ''));
    if (Number.isFinite(parsed)) {
      latestIndex = Math.max(latestIndex, parsed);
    }
  }

  return latestIndex;
}

async function setCheckboxState(
  page: Page,
  objectPath: string,
  checked: boolean
): Promise<void> {
  const locator = katalonLocator(page, objectPath);
  const visible = await locator.isVisible().catch(() => false);
  if (!visible) {
    return;
  }

  if (!(await waitUntilEnabled(locator, 5000))) {
    return;
  }

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const isChecked = await locator.isChecked().catch(() => false);
    if (isChecked === checked) {
      return;
    }

    try {
      if (checked) {
        await locator.check({ force: true });
      } else {
        await locator.uncheck({ force: true });
      }
    } catch {
      await locator.click({ force: true });
    }

      await page.waitForTimeout(150);
  }

  const finalState = await locator.isChecked().catch(() => false);
  if (finalState !== checked) {
    throw new Error(`Failed to set checkbox "${objectPath}" to ${checked ? 'checked' : 'unchecked'} state.`);
  }
}

async function waitForVisibleTextMatch(locator: Locator, expectedText: string, timeoutMs = 5000): Promise<void> {
  const normalizedExpected = expectedText.trim().toLowerCase();
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const texts = await locator
      .evaluateAll((nodes) => nodes.map((node) => (node.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase()))
      .catch(() => []);
    if (texts.some((text) => text === normalizedExpected)) {
      return;
    }
    await locator.page().waitForTimeout(200);
  }
}

async function waitForSubmitReady(page: Page, submitButton: Locator, timeoutMs = 20000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (await submitButton.isEnabled().catch(() => false)) {
      return true;
    }

    await waitForUiToSettle(page, 2000);
    await page.waitForLoadState('networkidle').catch(() => undefined);
    await page.waitForTimeout(200);
  }

  return submitButton.isEnabled().catch(() => false);
}

async function readSelectedOptionLabel(locator: Locator): Promise<string> {
  return locator
    .locator('option:checked')
    .textContent()
    .then((value) => (value || '').replace(/\s+/g, ' ').trim())
    .catch(() => '');
}

async function readSelectOptions(locator: Locator): Promise<Array<{ label: string; value: string }>> {
  return locator
    .evaluate((element) =>
      Array.from((element as HTMLSelectElement).options).map((option) => ({
        label: (option.textContent || '').replace(/\s+/g, ' ').trim(),
        value: option.value
      }))
    )
    .catch(() => []);
}

async function assertCurrentSelectLabel(locator: Locator, expectedLabel: string, context: string): Promise<void> {
  const selectedLabel = await readSelectedOptionLabel(locator);
  const selectedValue = await locator.evaluate((element) => (element as HTMLSelectElement).value).catch(() => '');
  if (normalizeLabel(selectedLabel) !== normalizeLabel(expectedLabel)) {
    const availableOptions = await readSelectOptions(locator);
    throw new Error(
      `[${context}] Expected ad server "${expectedLabel}" but UI selected "${selectedLabel}" (value="${selectedValue}"). Options: ${JSON.stringify(availableOptions)}.`
    );
  }
}

async function selectAndConfirmOptionLabel(locator: Locator, label: string, timeoutMs = 8000): Promise<boolean> {
  const expected = normalizeLabel(label);
  const deadline = Date.now() + timeoutMs;
  let stableSince = 0;

  while (Date.now() < deadline) {
    await locator.selectOption({ label }).catch(() => undefined);
      let selectedLabel = await readSelectedOptionLabel(locator);
    if (normalizeLabel(selectedLabel) !== expected) {
      await locator
        .evaluate((element, expectedLabel) => {
          const select = element as HTMLSelectElement;
          const normalize = (value: string) => value.replace(/[^a-z0-9]+/gi, ' ').trim().toLowerCase();
          const option = Array.from(select.options).find((item) => normalize(item.textContent || '') === normalize(expectedLabel));
          if (!option) {
            return false;
          }
          select.value = option.value;
          select.dispatchEvent(new Event('input', { bubbles: true }));
          select.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        }, label)
        .catch(() => undefined);
          selectedLabel = await readSelectedOptionLabel(locator);
    }
    if (normalizeLabel(selectedLabel) === expected) {
      if (stableSince === 0) {
        stableSince = Date.now();
      }
      await locator.press('Tab').catch(() => undefined);
          await locator.page().waitForLoadState('networkidle').catch(() => undefined);
      await locator.page().waitForTimeout(250);
      const confirmedLabel = await readSelectedOptionLabel(locator);
      if (normalizeLabel(confirmedLabel) === expected && Date.now() - stableSince >= 1000) {
        return true;
      }
    } else {
      stableSince = 0;
    }
    await locator.page().waitForTimeout(200);
  }

  return normalizeLabel(await readSelectedOptionLabel(locator)) === expected && stableSince !== 0;
}

async function selectAdServerOnce(locator: Locator, label: string, timeoutMs = 5000): Promise<boolean> {
  await locator.selectOption({ label }).catch(() => undefined);
  await locator.press('Tab').catch(() => undefined);

  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const selectedLabel = await readSelectedOptionLabel(locator);
    if (normalizeLabel(selectedLabel) === normalizeLabel(label)) {
      return true;
    }
    await locator.page().waitForTimeout(200);
  }

  return normalizeLabel(await readSelectedOptionLabel(locator)) === normalizeLabel(label);
}

async function describeSelectOptions(locator: Locator): Promise<{ selectedLabel: string; availableOptions: string[] }> {
  const selectedLabel = await readSelectedOptionLabel(locator);
  const availableOptions = await locator
    .locator('option')
    .evaluateAll((options) => options.map((option) => (option.textContent || '').replace(/\s+/g, ' ').trim()))
    .catch(() => []);

  return {
    selectedLabel,
    availableOptions
  };
}

async function acceptGenericConfirmationIfVisible(page: Page, timeoutMs = 3000): Promise<boolean> {
  const confirmationContinue = page.locator('#generic-confirm-modal-continue').first();
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (await confirmationContinue.isVisible().catch(() => false)) {
      await confirmationContinue.waitFor({ state: 'visible', timeout: 10000 });
      await confirmationContinue.click();
      await confirmationContinue.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => undefined);
      await waitForUiToSettle(page, 2000);
      await page.waitForLoadState('networkidle').catch(() => undefined);
      return true;
    }

    await page.waitForTimeout(100);
  }

  return false;
}

async function waitForAdServerReconfiguration(page: Page, expectedAdServer: string, timeoutMs = 15000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  const expected = normalizeLabel(expectedAdServer);
  const adServerDropdown = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/select_BasicSetupAdServer');
  const nonDfpTabs = [
    maybeKatalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/a_BudgetFlightTab'),
    maybeKatalonLocator(page, 'Object Repository/Frontend/Order-Entry/Creatives-Tab/Creatives Tab Link'),
    maybeKatalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/a_Splits_Tab')
  ].filter(Boolean) as Locator[];
  let stableSince = 0;

  while (Date.now() < deadline) {
    await waitForUiToSettle(page, 2000);
    const selectedLabel = await readSelectedOptionLabel(adServerDropdown);
    const matchesExpected = normalizeLabel(selectedLabel) === expected;

    if (matchesExpected) {
      if (expected === normalizeLabel('DFP')) {
        return;
      }

      const nonDfpTabVisible = (
        await Promise.all(nonDfpTabs.map((locator) => locator.isVisible().catch(() => false)))
      ).some(Boolean);

      if (nonDfpTabVisible) {
        if (stableSince === 0) {
          stableSince = Date.now();
        }

        if (Date.now() - stableSince >= 3000) {
          return;
        }
      } else {
        stableSince = 0;
      }
    } else {
      stableSince = 0;
    }

    await page.waitForTimeout(250);
  }

  throw new Error(`Ad server "${expectedAdServer}" did not stabilize before continuing from Objectives.`);
}

async function establishObjectivesAdServer(page: Page, expectedAdServer: string): Promise<void> {
  const adServerDropdown = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/select_BasicSetupAdServer');

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const before = await describeSelectOptions(adServerDropdown);
    const selected = await selectAdServerOnce(adServerDropdown, expectedAdServer, 5000);
    const after = await describeSelectOptions(adServerDropdown);
    if (!selected) {
      const current = await readSelectedOptionLabel(adServerDropdown);
      throw new Error(
        `Failed to apply ad server "${expectedAdServer}". Before selected="${before.selectedLabel || '<unset>'}", after selected="${after.selectedLabel || '<unset>'}". Options: ${JSON.stringify(after.availableOptions)}. Current UI value is "${current || '<unset>'}".`
      );
    }

    await acceptGenericConfirmationIfVisible(page, 5000);

    try {
      await waitForAdServerReconfiguration(page, expectedAdServer, 15000);
      await assertCurrentSelectLabel(adServerDropdown, expectedAdServer, 'objectives:after-ad-server-set');
      return;
    } catch (error) {
      if (attempt === 2) {
        throw error;
      }
      await openObjectivesTab(page);
      await waitForUiToSettle(page, 3000);
    }
  }
}

async function configureInventoryListTargeting(
  page: Page,
  inclusionList: string[] = [],
  exclusionList: string[] = []
): Promise<void> {
  if (inclusionList.length === 0 && exclusionList.length === 0) {
    return;
  }

  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventoryInventoryListTargetingEdit').click();

  const selectListItems = async (listType: 'Inclusion List' | 'Exclusion List', items: string[]) => {
    if (items.length === 0) {
      return;
    }

    await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryInventoryListTargetingType').selectOption({
      label: listType
    });

    for (const item of items) {
      const searchInput = katalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryInventoryListTargetingSearch'
      );
      await searchInput.fill('');
      await searchInput.pressSequentially(item, { delay: 40 });

      const matchingItem = katalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Inventory-Tab/span_InventoryInventoryListTargetingItem',
        { inventoryListItem: item }
      ).first();
      await waitForVisibleTextMatch(page.locator('app-inventory-list-modal span'), item, 5000);
      await matchingItem.waitFor({ state: 'visible', timeout: 5000 });
      await matchingItem.click();
    }
  };

  await selectListItems('Exclusion List', exclusionList);
  await selectListItems('Inclusion List', inclusionList);

  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventoryInventoryListTargetingContinue').click();
}

async function configureDayParting(page: Page, timeSlots: string[] = []): Promise<void> {
  if (timeSlots.length === 0) {
    return;
  }

  const dayPartingAccordion = katalonLocator(
    page,
    'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventoryDayPartingAccordion'
  );
  if (await dayPartingAccordion.isVisible().catch(() => false)) {
    await dayPartingAccordion.click();
  }

  const dayMap: Record<string, number> = {
    sunday: 3,
    monday: 4,
    tuesday: 5,
    wednesday: 6,
    thursday: 7,
    friday: 8,
    saturday: 9
  };

  for (const timeSlot of timeSlots) {
    const [dayNameRaw, fromHourRaw, toHourRaw] = timeSlot.split('-').map((item) => item.trim());
    const dayOfWeek = dayMap[(dayNameRaw || '').toLowerCase()];
    const fromHour = Number(fromHourRaw);
    const toHour = Number(toHourRaw);

    if (!dayOfWeek || !Number.isFinite(fromHour) || !Number.isFinite(toHour)) {
      continue;
    }

    let hour = fromHour + 2;
    const endHour = toHour + 2;

    while (hour <= endHour) {
      const cell = katalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Inventory-Tab/div_InventoryDayPartingDaySpliter',
        { dayOfWeek, hour }
      );
      await cell.scrollIntoViewIfNeeded().catch(() => undefined);
      await cell.hover().catch(() => undefined);
      await cell.click({ force: true });
      hour += 1;
    }
  }
}

async function navigateToOrderEntryRoute(page: Page, routePath: string): Promise<void> {
  if (!env.frontendUrl) {
    throw new Error('ADDAPTIVE_FRONTEND_URL is required to open order entry.');
  }

  const currentUrl = page.url();
  const baseUrl =
    currentUrl && currentUrl !== 'about:blank' && /^https?:\/\//i.test(currentUrl) ? currentUrl : env.frontendUrl;

  await page.goto(new URL(routePath, baseUrl).toString(), { waitUntil: 'domcontentloaded' });
}

export async function openOrderEntryPage(page: Page, options: OpenOrderEntryPageOptions = {}): Promise<void> {
  if (hasValue(options.orderEntryUrl)) {
    await page.goto(options.orderEntryUrl!);
    return;
  }

  if ((options.orderAction || '').trim().toLowerCase() === 'edit') {
    await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Orders-Tab/a_Orders').click();

    const searchValue = (options.existingLineItemName || '').trim();
    if (!searchValue) {
      throw new Error('Edit order entry requires an existing line item name to locate the order.');
    }

    const ordersSearch = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Orders-Tab/input_OrdersSearch');
    await ordersSearch.waitFor({ state: 'visible', timeout: 10000 });
    await ordersSearch.fill('');
    await ordersSearch.fill(searchValue);
    await ordersSearch.press('Enter');
    await page.waitForTimeout(3000);

    const matchingLineItem = katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Orders-Tab/h4_CreateOrderListLineItemName_ContainingText',
      { lineItemName: searchValue, lineItemIndex: 1 }
    );
    await matchingLineItem.waitFor({ state: 'visible', timeout: 10000 });
    await matchingLineItem.click();
    return;
  }

  await page.locator('#header-orders-link').click();

  const createOrderLink = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Create-Order/a_Create Order');
  if (await createOrderLink.isVisible().catch(() => false)) {
    await createOrderLink.click();
      await page.waitForURL(/\/orders\/create\/objectives(?:[/?#].*)?$/i).catch(() => undefined);
    return;
  }

  await navigateToOrderEntryRoute(page, '/orders/create/objectives');
  await page.waitForURL(/\/orders\/create\/objectives(?:[/?#].*)?$/i).catch(() => undefined);
}

export async function openObjectivesTab(page: Page): Promise<void> {
  const objectivesTab = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/a_ObjectivesTab');
  await objectivesTab.waitFor({ state: 'visible', timeout: 15000 });
  await objectivesTab.click();
}

export async function configureOrderEntryObjectives(
  page: Page,
  options: OrderEntryObjectivesOptions
): Promise<void> {
  await openObjectivesTab(page);

  const adServerDropdown = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/select_BasicSetupAdServer');

  if (hasValue(options.adServer)) {
    if ((await hasMatch(adServerDropdown)) && (await adServerDropdown.isEnabled().catch(() => false))) {
      await establishObjectivesAdServer(page, options.adServer);
    }
  }

  if (hasValue(options.objectivesType)) {
    const objectivesType = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/label_ObjectivesType', {
      objectivesType: options.objectivesType
    });
    if (await objectivesType.isVisible().catch(() => false)) {
      await objectivesType.click();
    }
  }

  if (hasValue(options.objectivesGoal)) {
    const goalSelect = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/select_ObjectivesGoal');
    if ((await hasMatch(goalSelect)) && (await goalSelect.isEnabled().catch(() => false))) {
      await goalSelect.selectOption({ label: options.objectivesGoal });
    }
  }

  if (hasValue(options.unitsValue) && ['MEDIAMATH', 'MEDIAMATH_GAM'].includes((options.adServer || '').toUpperCase())) {
    const accordion = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/span_ObjectivesAdminOnlyAccordion');
    if (await accordion.isVisible().catch(() => false)) {
      await accordion.click();
    }

    await clearAndFillIfVisible(
      page,
      'Object Repository/Frontend/Order-Entry/Objectives-Tab/Media Math/Units Value Input',
      options.unitsValue
    );
  }

  if (hasValue(options.objectivesGoalPriority)) {
    const accordion = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/span_ObjectivesAdminOnlyAccordion');
    if (await accordion.isVisible().catch(() => false)) {
      await accordion.click();
        }

    let goalPriorityPath: string | null = null;
    switch ((options.objectivesGoalPriority || '').toLowerCase()) {
      case 'delivery':
        goalPriorityPath = 'Object Repository/Frontend/Order-Entry/Objectives-Tab/Goal Priority Input(Delivery)';
        break;
      case 'performance':
        goalPriorityPath = 'Object Repository/Frontend/Order-Entry/Objectives-Tab/Goal Priority Input(Performance)';
        break;
      case 'margin':
        goalPriorityPath = 'Object Repository/Frontend/Order-Entry/Objectives-Tab/Goal Priority Input(Margin)';
        break;
    }

    if (goalPriorityPath) {
      const goalPriority = katalonLocator(page, goalPriorityPath);
      if (await goalPriority.isVisible().catch(() => false)) {
        await goalPriority.click();
            }
    }

    if ((options.objectivesGoalPriority || '').toLowerCase() === 'margin') {
      await clearAndFillIfVisible(
        page,
        'Object Repository/Frontend/Order-Entry/Objectives-Tab/input_ObjectivesAdminOnlyMinMargin',
        options.objectivesMinimumMargin
      );
    }

    if (hasValue(options.objectivesOptimizationMethod)) {
      const toggleLabel = katalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Objectives-Tab/label_ObjectivesAdminOnlyOptimizationMethodToggle'
      );
      if (await toggleLabel.isVisible().catch(() => false)) {
        const current = ((await toggleLabel.textContent().catch(() => '')) || '').trim().toLowerCase();
        const target = options.objectivesOptimizationMethod.toLowerCase();
        if ((target === 'enabled' && current !== 'enabled') || (target === 'inactive' && current !== 'inactive')) {
          await toggleLabel.click();
                }
      }
    }

    await selectOptionIfVisible(
      page,
      'Object Repository/Frontend/Order-Entry/Objectives-Tab/select_ObjectivesAdminOnlyOptimizationType',
      options.objectivesOptimizationType
    );
    await clearAndFillIfVisible(
      page,
      'Object Repository/Frontend/Order-Entry/Objectives-Tab/input_ObjectivesAdminOnlyOptimizationAmount',
      options.objectivesOptimizationAmount
    );
  }
}

export async function verifyOrderEntryAdServerSelection(
  page: Page,
  expectedAdServer?: string,
  context = 'verify-ad-server'
): Promise<void> {
  if (!hasValue(expectedAdServer)) {
    return;
  }

  await openObjectivesTab(page);

  const adServerDropdown = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/select_BasicSetupAdServer');
  if (!(await hasMatch(adServerDropdown)) || !(await adServerDropdown.isVisible().catch(() => false))) {
    return;
  }

  const selectedLabel = await readSelectedOptionLabel(adServerDropdown);
  const selectedValue = await adServerDropdown.evaluate((element) => (element as HTMLSelectElement).value).catch(() => '');

  if (!selectedLabel) {
    return;
  }

  if (normalizeLabel(selectedLabel) !== normalizeLabel(expectedAdServer)) {
    const availableOptions = await readSelectOptions(adServerDropdown);
    throw new Error(
      `[${context}] Expected ad server "${expectedAdServer}" but UI selected "${selectedLabel}" (value="${selectedValue}"). Options: ${JSON.stringify(availableOptions)}.`
    );
  }
}

export async function verifyCurrentOrderEntryAdServerOnBasicSetup(
  page: Page,
  expectedAdServer?: string,
  context = 'verify-basic-setup-ad-server'
): Promise<void> {
  if (!hasValue(expectedAdServer)) {
    return;
  }

  const adServerDropdown = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/select_BasicSetupAdServer');
  if (!(await hasMatch(adServerDropdown)) || !(await adServerDropdown.isVisible().catch(() => false))) {
    return;
  }

  const selectedLabel = await readSelectedOptionLabel(adServerDropdown);
  const selectedValue = await adServerDropdown.evaluate((element) => (element as HTMLSelectElement).value).catch(() => '');

  if (!selectedLabel) {
    return;
  }

  if (normalizeLabel(selectedLabel) !== normalizeLabel(expectedAdServer)) {
    const availableOptions = await readSelectOptions(adServerDropdown);
    throw new Error(
      `[${context}] Expected ad server "${expectedAdServer}" but UI selected "${selectedLabel}" (value="${selectedValue}"). Options: ${JSON.stringify(availableOptions)}.`
    );
  }
}

async function waitForBasicSetupToRender(page: Page, timeoutMs = 15000): Promise<void> {
  const candidates = [
    katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/h2_BasicSetup_TabHeader'),
    katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupOrderName'),
    katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupLineItemName'),
    katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/select_BasicSetupRevenueType'),
    katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/select_BasicSetupAdServer')
  ];
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    for (const locator of candidates) {
      if ((await hasMatch(locator)) && (await locator.isVisible().catch(() => false))) {
        return;
      }
    }

    await waitForUiToSettle(page, 1000);
    await page.waitForTimeout(200);
  }

  throw new Error('Basic Setup tab content did not render after opening the tab.');
}

export async function configureOrderEntryBasicSetup(
  page: Page,
  options: OrderEntryBasicSetupOptions
): Promise<void> {
  const basicSetupTab = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/a_BasicSetupTab');
  await basicSetupTab.waitFor({ state: 'visible', timeout: 15000 });
  await basicSetupTab.click();
  await waitForBasicSetupToRender(page, 15000);
  await waitForUiToSettle(page, 5000);
  await verifyCurrentOrderEntryAdServerOnBasicSetup(page, options.adServer, 'basic-setup:initial');

  if (hasValue(options.orderName) && ['DPM', 'DFP', 'PMP'].includes(options.adServer)) {
    await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupOrderName').fill(
      options.orderName
    );
  }

  if (hasValue(options.ioName) && options.adServer === 'MEDIAMATH') {
    await clearAndFillIfVisible(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupOrderName',
      options.ioName
    );
  }

  if (hasValue(options.ioName) && options.adServer === 'MEDIAMATH_GAM') {
    await clearAndFillIfVisible(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupOrderName',
      options.ioName
    );
  }

  if (hasValue(options.campaignName) && ['MEDIAMATH', 'MEDIAMATH_GAM'].includes(options.adServer)) {
    const campaignFilled = await clearAndFillIfVisible(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Campaign Name Input',
      options.campaignName.slice(0, 100)
    );
    if (!campaignFilled) {
      const fallbackCampaignInput = page
        .locator('input[formcontrolname="campaignName"], input[placeholder*="Campaign"]')
        .first();
      if ((await hasMatch(fallbackCampaignInput)) && (await waitUntilEditable(fallbackCampaignInput, 2000))) {
        await fallbackCampaignInput.fill('');
              await fallbackCampaignInput.fill(options.campaignName.slice(0, 100));
            }
    }
  }

  if (hasValue(options.campaignName) && ['MEDIAMATH', 'MEDIAMATH_GAM'].includes(options.adServer) && hasValue(options.lineItemName)) {
    await clearAndFillIfVisible(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupLineItemName',
      options.lineItemName
    );
  }

  if (hasValue(options.revenueType) && !['DFP', 'MEDIAMATH', 'MEDIAMATH_GAM'].includes(options.adServer)) {
    const revenuePath =
      options.adServer === 'PMP'
        ? 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/Revenue Type Dropdown'
        : 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/select_BasicSetupRevenueType';
    await selectOptionIfVisible(page, revenuePath, options.revenueType);
  }

  if (hasValue(options.lineItemName) && options.adServer !== 'DFP') {
    const lineItemPrimaryPath =
      options.adServer === 'PMP'
        ? 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/PMP Line Item Name Input'
        : 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupLineItemName';
    const lineItemFilled = await clearAndFillIfVisible(page, lineItemPrimaryPath, options.lineItemName);

    if (!lineItemFilled && options.adServer !== 'PMP') {
      await clearAndFillIfVisible(
        page,
        'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/textarea_BasicSetupLineItems',
        options.lineItemName
      );
    }
  }

  if (
    (options.lineItems || []).length > 0 &&
    options.adServer === 'DFP' &&
    (options.orderAction || '').toLowerCase() !== 'edit'
  ) {
    const dfpLineItems = (options.lineItems || []).map((value) => value.trim()).filter(Boolean).join(',');
    await clearAndFillIfVisible(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/textarea_BasicSetupLineItems',
      dfpLineItems
    );
    const dfpLineItemsTextarea = katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/textarea_BasicSetupLineItems'
    );
    await dfpLineItemsTextarea.press('Tab').catch(() => undefined);
    if (process.env.ADDAPTIVE_PAUSE_AFTER_DFP_LINE_ITEMS === 'true') {
      await page.pause();
    }
    await waitForUiToSettle(page, 2000);

    const dfpLineItemSpinner = maybeKatalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/DFP Line Items Spinner'
    );
    if (dfpLineItemSpinner) {
      const deadline = Date.now() + 20000;
      let sawSpinner = false;
      while (Date.now() < deadline) {
        const spinnerVisible = await dfpLineItemSpinner.isVisible().catch(() => false);
        if (spinnerVisible) {
          sawSpinner = true;
        }
        const textareaClass = (await dfpLineItemsTextarea.getAttribute('class').catch(() => '')) || '';
        const textareaPending = /\bng-pending\b/i.test(textareaClass);
        if (!spinnerVisible && !textareaPending && sawSpinner) {
          break;
        }
        if (!spinnerVisible && !textareaPending && !sawSpinner) {
          await page.waitForTimeout(300);
          const recheckVisible = await dfpLineItemSpinner.isVisible().catch(() => false);
          const recheckClass = (await dfpLineItemsTextarea.getAttribute('class').catch(() => '')) || '';
          if (!recheckVisible && !/\bng-pending\b/i.test(recheckClass)) {
            break;
          }
        }
        await page.waitForTimeout(200);
      }

      if (await dfpLineItemSpinner.isVisible().catch(() => false)) {
        await dfpLineItemSpinner.waitFor({ state: 'hidden', timeout: 20000 });
      }
    }

    const finalTextareaClass = (await dfpLineItemsTextarea.getAttribute('class').catch(() => '')) || '';
    if (/\bng-pending\b/i.test(finalTextareaClass)) {
      throw new Error('DFP line items field is still pending after waiting for async validation to finish.');
    }

    await waitForUiToSettle(page, 5000);
    await page.waitForLoadState('networkidle').catch(() => undefined);
  }

  if (hasValue(options.curateDealName) && options.adServer === 'PMP') {
    await clearAndFillIfVisible(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/Curate Deal Name Input',
      options.curateDealName
    );
  }

  if ((options.curateDSP || []).length > 0 && options.adServer === 'PMP') {
    const modalButton = katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/DSP And Buyer Targeting Modal/DSP Buyer Targeting Modal Button'
    );
    if (await modalButton.isVisible().catch(() => false)) {
      await modalButton.click();

      const searchbox = katalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/DSP And Buyer Targeting Modal/Modal Searchbox'
      );
      await searchbox.waitFor({ state: 'visible', timeout: 10000 });

      const [buyerLabel, ...dspValues] = options.curateDSP || [];
      if (buyerLabel) {
        await katalonLocator(
          page,
          'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/DSP And Buyer Targeting Modal/Buyer Dropdown'
        ).selectOption({ label: buyerLabel });
      }

      for (const dspValue of dspValues) {
        await searchbox.fill('');
        await searchbox.pressSequentially(dspValue, { delay: 30 });
        const modalSurface = katalonLocator(
          page,
          'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/DSP And Buyer Targeting Modal/Modal'
        );
        if (await modalSurface.isVisible().catch(() => false)) {
          await modalSurface.click().catch(() => undefined);
        }
        const addButton = maybeKatalonLocator(
          page,
          'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/DSP And Buyer Targeting Modal/Add Item Button',
          { title: dspValue }
        );
        if (addButton) {
          await addButton.waitFor({ state: 'visible', timeout: 10000 }).catch(() => undefined);
        }
        if (addButton && (await addButton.isVisible().catch(() => false))) {
          await addButton.click();
        } else {
          throw new Error(`PMP DSP selection "${dspValue}" did not appear in the DSP/Buyer targeting modal.`);
        }
      }

      const continueButton = katalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/PMP/DSP And Buyer Targeting Modal/Modal Continue Button'
      );
      if (await continueButton.isVisible().catch(() => false)) {
        await continueButton.click();
      }
      await waitForUiToSettle(page, 5000);
    }
  }

  if (hasValue(options.advertiser) && options.adServer !== 'DFP') {
    const advertiserInput = katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupAdvertiser'
    );
    if ((await hasMatch(advertiserInput)) && (await advertiserInput.isVisible().catch(() => false))) {
      await advertiserInput.fill(options.advertiser);
          const advertiserOption = page.getByText(new RegExp(`^${options.advertiser.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`)).last();
      if (await advertiserOption.isVisible().catch(() => false)) {
        await advertiserOption.click();
            } else {
        await advertiserInput.press('Enter');
            }
    }
  }

  if (hasValue(options.singleObjectDealId)) {
    const singleObjectDealInput = page.locator('#single-object-deal-id, input[formcontrolname="singleObjectDealId"]').first();
    if (await waitUntilEditable(singleObjectDealInput, 3000)) {
      await singleObjectDealInput.click();
          await singleObjectDealInput.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A').catch(() => undefined);
      await singleObjectDealInput.press('Backspace').catch(() => undefined);
      await singleObjectDealInput.pressSequentially(options.singleObjectDealId, { delay: 75 });
          await singleObjectDealInput.press('Tab').catch(() => undefined);
          const settleDeadline = Date.now() + 10000;
      while (Date.now() < settleDeadline) {
        const className = (await singleObjectDealInput.getAttribute('class').catch(() => '')) || '';
        if (!className.includes('ng-pending')) {
          break;
        }
        await page.waitForTimeout(200);
      }

      const settledClassName = (await singleObjectDealInput.getAttribute('class').catch(() => '')) || '';
      if (settledClassName.includes('is-invalid')) {
        const fieldContextText =
          (
            await singleObjectDealInput
              .evaluate((element) => {
                const container = element.parentElement?.parentElement ?? element.parentElement;
                return (container?.textContent || '').replace(/\s+/g, ' ').trim();
              })
              .catch(() => '')
          ) || '';

        if (/Invalid ID\. Deal does not belong to this user's client\./i.test(fieldContextText)) {
          await singleObjectDealInput.click();
                  await singleObjectDealInput.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A').catch(() => undefined);
          await singleObjectDealInput.press('Backspace').catch(() => undefined);
          await singleObjectDealInput.press('Tab').catch(() => undefined);
                  await page.waitForTimeout(300);
        }
      }

      await page.waitForLoadState('networkidle').catch(() => undefined);
    }
  }

  if (hasValue(options.targetType) && ['DPM', 'DFP', 'MEDIAMATH', 'MEDIAMATH_GAM'].includes((options.adServer || '').toUpperCase())) {
    let targetTypePath: string | null = null;
    const targetType = options.targetType.toLowerCase();
    const adServer = (options.adServer || '').toUpperCase();

    if (adServer === 'DPM') {
      targetTypePath =
        targetType === 'b2b'
          ? 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Target Type B2B Button'
          : 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Target Type B2C Button';
    } else if (adServer === 'DFP') {
      targetTypePath =
        targetType === 'b2b'
          ? 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Target Type B2B Button(DFP)'
          : 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Target Type B2C Button(DFP)';
    } else if (adServer === 'MEDIAMATH' || adServer === 'MEDIAMATH_GAM') {
      targetTypePath =
        targetType === 'b2b'
          ? 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Target Type B2B Button'
          : 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Target Type B2C Button';
    }

    if (targetTypePath) {
      const targetTypeButton = katalonLocator(page, targetTypePath);
      if (await targetTypeButton.isVisible().catch(() => false)) {
        await targetTypeButton.click();
            }
    }
  }

  if (hasValue(options.creativeType)) {
    const creativeTypePath = 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/select_BasicSetupCreativeType';
    const creativeTypeDropdown = katalonLocator(page, creativeTypePath);
    if ((await hasMatch(creativeTypeDropdown)) && (await creativeTypeDropdown.isVisible().catch(() => false))) {
      const requested = String(options.creativeType || '').trim();
      const availableOptions = await creativeTypeDropdown
        .evaluate((element) =>
          Array.from((element as HTMLSelectElement).options)
            .map((option) => option.textContent || '')
            .map((value) => value.trim())
            .filter(Boolean)
        )
        .catch(() => []);
      const matched = availableOptions.find((option) => normalizeLabel(option) === normalizeLabel(requested));
      if (!matched) {
        throw new Error(
          `Creative type "${requested}" is not available in Basic Setup. Available options: ${availableOptions.join(', ')}`
        );
      }
      await creativeTypeDropdown.selectOption({ label: matched, timeout: 5000 });
        }
  }

  if (hasValue(options.insertionOrder)) {
    await clearAndFillIfVisible(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupOptionalInsertionOrder'
      ,
      options.insertionOrder
    );
  }

  if (hasValue(options.campaignType) && ['MEDIAMATH', 'MEDIAMATH_GAM'].includes(options.adServer)) {
    const requestedTypes = String(options.campaignType)
      .split(',')
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);

    const politicalCampaignCheckbox = maybeKatalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Politcal Campaign Checkbox'
    );
    if (politicalCampaignCheckbox && (await politicalCampaignCheckbox.isVisible().catch(() => false))) {
      await setCheckboxState(
        page,
        'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Politcal Campaign Checkbox',
        requestedTypes.includes('political campaign')
      );
    }

    const programmaticGuaranteedCheckbox = maybeKatalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Programmatic Guaranteed Checkbox'
    );
    if (programmaticGuaranteedCheckbox && (await programmaticGuaranteedCheckbox.isVisible().catch(() => false))) {
      await setCheckboxState(
        page,
        'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/Media Math/Programmatic Guaranteed Checkbox',
        requestedTypes.includes('programmatic guaranteed')
      );
    }
  }

  if (hasValue(options.orderNotes) && ['DPM', 'HIVESTACK', 'NETFLIX', 'SPOTIFY'].includes(options.adServer)) {
    const notesAccordion = katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/button_BasicSetupNotesPanelAccordion'
    );
    const notesFallbackButton = page.getByRole('button', { name: /^Notes/i }).first();

    if ((await hasMatch(notesAccordion)) && (await notesAccordion.isVisible().catch(() => false))) {
      await notesAccordion.click();
        } else if (await notesFallbackButton.isVisible().catch(() => false)) {
      await notesFallbackButton.click();
        }

    const notesTextArea = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/textarea_BasicSetupNotes');
    if ((await hasMatch(notesTextArea)) && (await notesTextArea.isEditable().catch(() => false))) {
      await notesTextArea.fill(options.orderNotes);
        }
  }
}

export async function openCreativesTab(page: Page): Promise<void> {
  const creativesTab = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Creatives-Tab/Creatives Tab Link');
  await creativesTab.waitFor({ state: 'visible', timeout: 15000 });
  await creativesTab.click();
}

export async function addBannerCreative(page: Page, options: BannerCreativeOptions): Promise<void> {
  await openCreativesTab(page);
  await addBannerCreativeOnCurrentPage(page, options);
}

export async function bulkImportCsvCreativesOnCurrentPage(
  page: Page,
  options: {
    creativeType?: string;
    rows: BulkCsvCreativeRow[];
    use1stUrlForAll?: string;
    use1stImageForAll?: string;
    use1stIconForAll?: string;
  }
): Promise<void> {
  if ((options.rows || []).length === 0) {
    throw new Error('Bulk import CSV requires at least one creative row from creatives_list.');
  }

  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import Dropdown').click();
  await page.waitForTimeout(300);
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import Menu Span').click();

  if ((options.creativeType || '').trim().toLowerCase() !== 'native') {
    const csvTypeRadio = maybeKatalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import Type Radio',
      { type: 'csv' }
    );
    if (csvTypeRadio && (await csvTypeRadio.isVisible().catch(() => false))) {
      await csvTypeRadio.click();
    }
  }

  const csvPath = path.join(process.cwd(), 'tmp', `order-entry-bulk-${Date.now()}.csv`);
  const isNative = (options.creativeType || '').trim().toLowerCase() === 'native';

  try {
    const header = isNative
      ? ['Name', 'Title', 'Landing_Page', 'Sponsored_By', 'Body', 'Call_to_Action']
      : ['name', 'type', 'size', 'url', 'html', 'skip_macro_validation'];
    const lines = [header.join(',')];
    for (const row of options.rows) {
      if (isNative) {
        const nativeValues = [
          row.name || '',
          row.title || '',
          row.url || '',
          row.sponsoredBy || '',
          row.body || '',
          row.callToAction || ''
        ];
        lines.push(nativeValues.map(csvEscape).join(','));
        continue;
      }

      let urlValue = row.thirdPartyUrl || row.url || '';
      if (urlValue && !/^https?:\/\//i.test(urlValue)) {
        const protocol = (row.protocol || '').trim();
        if (/^https?:\/\/$/i.test(protocol)) {
          urlValue = `${protocol}${urlValue}`;
        }
      }
      const values = [
        row.name || '',
        mapBulkCsvType(row.type),
        row.size || '',
        urlValue,
        row.htmlWithOrWithoutIframe || '',
        ''
      ];
      lines.push(values.map(csvEscape).join(','));
    }
    fs.mkdirSync(path.dirname(csvPath), { recursive: true });
    fs.writeFileSync(csvPath, `${lines.join('\n')}\n`, 'utf8');

    await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/File Upload').setInputFiles(csvPath);

    if ((options.use1stUrlForAll || '').trim().toLowerCase() === 'yes') {
      const firstUrlCheckbox = maybeKatalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import First URL For All Checkbox'
      );
      if (firstUrlCheckbox && (await firstUrlCheckbox.isVisible().catch(() => false))) {
        const checked = await firstUrlCheckbox.isChecked().catch(() => false);
        if (!checked) {
          await firstUrlCheckbox.check().catch(async () => {
            await firstUrlCheckbox.click();
          });
        }
      }
    }

    if (isNative) {
      const use1stImage = (options.use1stImageForAll || '').trim().toLowerCase() === 'yes';
      const use1stIcon = (options.use1stIconForAll || '').trim().toLowerCase() === 'yes';
      const firstImageCheckbox = maybeKatalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import Native First Image For All Checkbox'
      );
      if (use1stImage && firstImageCheckbox && (await firstImageCheckbox.isVisible().catch(() => false))) {
        const checked = await firstImageCheckbox.isChecked().catch(() => false);
        if (!checked) {
          await firstImageCheckbox.check().catch(async () => {
            await firstImageCheckbox.click();
          });
        }
      }

      const firstIconCheckbox = maybeKatalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Native 1st Icon For All Checkbox'
      );
      if (use1stIcon && firstIconCheckbox && (await firstIconCheckbox.isVisible().catch(() => false))) {
        const checked = await firstIconCheckbox.isChecked().catch(() => false);
        if (!checked) {
          await firstIconCheckbox.check().catch(async () => {
            await firstIconCheckbox.click();
          });
        }
      }

      for (let index = 0; index < options.rows.length; index += 1) {
        const row = options.rows[index];
        const shouldUploadImage = !use1stImage || index === 0;
        const shouldUploadIcon = !use1stIcon || index === 0;

        if (shouldUploadImage && hasValue(row.filePath)) {
          const resolvedImagePath = resolveCreativeAssetPath(row.filePath);
          const imageInput = maybeKatalonLocator(
            page,
            'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Native Creative Image Upload Input',
            { index: String(index) }
          );
          if (resolvedImagePath && imageInput && (await waitUntilEnabled(imageInput, 5000))) {
            await imageInput.setInputFiles(resolvedImagePath);
          }
        }

        if (shouldUploadIcon && hasValue(row.iconFilePath)) {
          const resolvedIconPath = resolveCreativeAssetPath(row.iconFilePath);
          const iconInput = maybeKatalonLocator(
            page,
            'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Native Creative Icon Upload Input',
            { index: String(index) }
          );
          if (resolvedIconPath && iconInput && (await waitUntilEnabled(iconInput, 5000))) {
            await iconInput.setInputFiles(resolvedIconPath);
          }
        }
      }
    }

    const continueButton = katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Creatives-Tab/Bulk Import/Bulk Import Continue Button'
    );
    const continueEnabled = await waitUntilEnabled(continueButton, 10000);
    if (!continueEnabled) {
      await page.waitForTimeout(40000);
      throw new Error('Bulk import continue button did not become enabled after file upload.');
    }
    await continueButton.click();

    for (let creativeIndex = 0; creativeIndex < options.rows.length; creativeIndex += 1) {
      const saveCreativeButton = maybeKatalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Creatives-Tab/Save Creative Button',
        { creativeIndex }
      );
      if (!saveCreativeButton || !(await saveCreativeButton.isVisible().catch(() => false))) {
        continue;
      }
      const enabled = await waitUntilEnabled(saveCreativeButton, 10000);
      if (!enabled) {
        await page.waitForTimeout(40000);
        throw new Error(`Bulk-imported creative at index ${creativeIndex} did not enable Save.`);
      }
      await saveCreativeButton.click();
    }
  } finally {
    fs.rmSync(csvPath, { force: true });
  }
}

export async function addBannerCreativeOnCurrentPage(page: Page, options: BannerCreativeOptions): Promise<void> {
  const creativeArticles = page.locator('article[id^="creative-"]');
  const previousCreativeCount = await creativeArticles.count();

  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Creatives-Tab/Actions/New Creative Button').click();
  await page
    .waitForFunction(
      (previousCount) => document.querySelectorAll('article[id^="creative-"]').length > previousCount,
      previousCreativeCount
    )
    .catch(() => undefined);

  // Katalon always populates the freshly added creative at index 0.
  // The UI inserts new creatives at the top, so mirroring that behavior
  // is more reliable than trying to infer the latest article id.
  const itemIndex = 0;
  const creativeArticle = page.locator(`#creative-${itemIndex}`).first();
  await creativeArticle.waitFor({ state: 'visible' });

  const creativeCategory = (options.creativeCategory || 'banner').toLowerCase();
  const typeIndex = itemIndex + 1;

  if (hasValue(options.creativeType)) {
    const requestedCreativeType = options.creativeType;
    const creativeTypeDropdown = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Creatives-Tab/Creative Type Dropdown', {
      type: creativeCategory,
      creativeIndex: typeIndex
    });
    const articleTypeDropdown = creativeArticle
      .locator('select[id*="creative-type"], select[formcontrolname="type"]')
      .first();
    const creativeTypeLocators = [creativeTypeDropdown, articleTypeDropdown];

    for (const locator of creativeTypeLocators) {
      if (!(await hasMatch(locator)) || !(await locator.isEnabled().catch(() => false))) {
        continue;
      }

      const selected = await locator
        .selectOption({ label: requestedCreativeType })
        .then(() => true)
        .catch(() => false);
      if (!selected) {
        continue;
      }

      const selectedLabel = await locator
        .locator('option:checked')
        .textContent()
        .then((value) => normalizeLabel(value || ''))
        .catch(() => '');
      if (selectedLabel === normalizeLabel(requestedCreativeType)) {
        break;
      }
    }

    const activeCreativeType = await creativeArticle
      .locator('select[id*="creative-type"] option:checked, select[formcontrolname="type"] option:checked')
      .first()
      .textContent()
      .then((value) => normalizeLabel(value || ''))
      .catch(() => '');
    if (activeCreativeType && activeCreativeType !== normalizeLabel(requestedCreativeType)) {
      throw new Error(`Creative type "${requestedCreativeType}" was not applied to the new creative form.`);
    }
  }

  const creativeNameInput = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Creatives-Tab/Creative Name Input', {
    creativeIndex: itemIndex
  });
  if (!(await waitUntilEditable(creativeNameInput, 2000))) {
    const creativeContainerBody = maybeKatalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Creatives-Tab/article_CreativesContainer',
      { creativeIndex: itemIndex }
    );
    const activationTargets = [
      creativeContainerBody,
      creativeArticle.locator('.creative-container > div').first(),
      creativeArticle.locator('strong').first(),
      creativeArticle
    ];

    for (const activationTarget of activationTargets) {
      if (await waitUntilEditable(creativeNameInput, 1500)) {
        break;
      }
      if (!(await activationTarget.isVisible().catch(() => false))) {
        continue;
      }

      await activationTarget.click({ force: true }).catch(async () => {
        await activationTarget.evaluate((element) => (element as HTMLElement).click()).catch(() => undefined);
      });
      await waitForUiToSettle(page, 3000);
    }
  }

  if (!(await waitUntilEditable(creativeNameInput, 15000))) {
    throw new Error('Creative name input is not editable on the new creative form.');
  }
  await creativeNameInput.fill(options.creativeName);

  if (creativeCategory === 'native') {
    await fillFirstEditable(
      [
        maybeKatalonLocator(
          page,
          'Object Repository/Frontend/Order-Entry/Creatives-Tab/Native/Title Input',
          { creativeIndex: itemIndex }
        ),
        creativeArticle.locator('input[placeholder="Headline text"]').first()
      ],
      options.nativeTitle
    );

    await fillFirstEditable(
      [
        maybeKatalonLocator(
          page,
          'Object Repository/Frontend/Order-Entry/Creatives-Tab/Native/Sponsered By Input',
          { creativeIndex: itemIndex }
        ),
        creativeArticle.locator('input[placeholder="Company name"]').first()
      ],
      options.nativeSponsoredBy,
      5000
    );

    await fillFirstEditable(
      [
        maybeKatalonLocator(
          page,
          'Object Repository/Frontend/Order-Entry/Creatives-Tab/Native/Body Textarea',
          { creativeIndex: itemIndex }
        ),
        creativeArticle.locator('textarea[placeholder="Copy/text"]').first()
      ],
      options.nativeBody
    );

    await fillFirstEditable(
      [
        maybeKatalonLocator(
          page,
          'Object Repository/Frontend/Order-Entry/Creatives-Tab/Native/Call to Action Input',
          { creativeIndex: itemIndex }
        ),
        creativeArticle.locator('input[placeholder="Copy/text"]').first()
      ],
      options.nativeCallToAction
    );
  }

  if (
    creativeCategory === 'banner' &&
    hasValue(options.creativeType) &&
    hasValue(options.htmlWithOrWithoutIframe)
  ) {
    const normalizedType = normalizeLabel(options.creativeType);
    const supportsInlineHtml =
      normalizedType === 'third party html no iframe' || normalizedType === 'third party html iframe';
    const htmlValue = (options.htmlWithOrWithoutIframe || '').trim();
    const isNoChangeHtml = htmlValue.toUpperCase() === '<NO-CHANGE>';
    const shouldFillHtml = htmlValue.length > 0 && !isNoChangeHtml;
    if (supportsInlineHtml && shouldFillHtml) {
      const htmlTextarea = maybeKatalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Creatives-Tab/Banner/Creatives HTML Textarea',
        { creativeIndex: itemIndex }
      );
      if (!htmlTextarea || !(await waitUntilEditable(htmlTextarea, 4000))) {
        throw new Error('Banner HTML textarea is not editable for third-party HTML creative type.');
      }
      await htmlTextarea.fill(htmlValue);
      await page.keyboard.press('Tab').catch(() => undefined);
      await creativeNameInput.click().catch(() => undefined);
    }
  }

  if (hasValue(options.creativeSize)) {
    const creativeSizeDropdown = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Creatives-Tab/Creative Size Dropdown', {
      creativeIndex: itemIndex
    });
    if ((await hasMatch(creativeSizeDropdown)) && (await creativeSizeDropdown.isEnabled().catch(() => false))) {
      await creativeSizeDropdown.selectOption({ label: options.creativeSize });
    }
  }

  const resolvedAssetPath = resolveCreativeAssetPath(options.filePath);
  if (hasValue(options.filePath) && !resolvedAssetPath) {
    throw new Error(`Creative asset file was not found: ${options.filePath}`);
  }

  if (resolvedAssetPath) {
    const normalizedCreativeType = (options.creativeType || '').toLowerCase();
    const uploadPaths =
      creativeCategory === 'video'
        ? ['Object Repository/Frontend/Order-Entry/Creatives-Tab/Video/Video Upload']
        : creativeCategory === 'audio'
          ? ['Object Repository/Frontend/Order-Entry/Creatives-Tab/Audio/Audio Upload']
          : creativeCategory === 'native'
            ? ['Object Repository/Frontend/Order-Entry/Creatives-Tab/Native/Image Upload']
            : normalizedCreativeType === 'html 5'
              ? ['Object Repository/Frontend/Order-Entry/Creatives-Tab/Banner/HTML5 Upload']
              : ['Object Repository/Frontend/Order-Entry/Creatives-Tab/Banner/Image Upload'];
    let uploadInput: Locator | null = null;
    for (const uploadPath of uploadPaths) {
      const candidate = maybeKatalonLocator(page, uploadPath, { creativeIndex: typeIndex });
      if (!candidate) {
        continue;
      }
      if (await waitUntilEnabled(candidate, 2000)) {
        uploadInput = candidate;
        break;
      }
    }
    if (!uploadInput) {
      throw new Error('Creative upload input is not available for the selected creative type.');
    }
    await uploadInput.setInputFiles(resolvedAssetPath);

    if (creativeCategory === 'native') {
      const resolvedIconAssetPath = resolveCreativeAssetPath(options.iconFilePath) || resolvedAssetPath;
      const iconUploadInput = maybeKatalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Creatives-Tab/Native/Icon Upload',
        { creativeIndex: typeIndex }
      );
      if (!iconUploadInput || !(await waitUntilEnabled(iconUploadInput, 3000))) {
        throw new Error('Native icon upload input is not available for the selected creative type.');
      }
      await iconUploadInput.setInputFiles(resolvedIconAssetPath);
    }
  }

  if (hasValue(options.landingPageUrl)) {
    const protocolDropdown = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Creatives-Tab/Protocol Dropdown', {
      creativeIndex: itemIndex
    });
    if (
      hasValue(options.protocol) &&
      (await hasMatch(protocolDropdown)) &&
      (await protocolDropdown.isEnabled().catch(() => false))
    ) {
      await protocolDropdown.selectOption({ label: options.protocol });
    }

    const landingPagePaths =
      creativeCategory === 'video'
        ? ['Object Repository/Frontend/Order-Entry/Creatives-Tab/Video/Landing Page Url Input']
        : creativeCategory === 'native'
          ? ['Object Repository/Frontend/Order-Entry/Creatives-Tab/Native/Landing Page Url Input']
          : creativeCategory === 'audio'
            ? ['Object Repository/Frontend/Order-Entry/Creatives-Tab/Audio/Audio Verification URL Input']
            : ['Object Repository/Frontend/Order-Entry/Creatives-Tab/Banner/Landing Page Url Input'];
    let landingPageInput: Locator | null = null;
    for (const landingPagePath of landingPagePaths) {
      const candidate = maybeKatalonLocator(page, landingPagePath, { creativeIndex: itemIndex });
      if (!candidate) {
        continue;
      }
      if (await waitUntilEditable(candidate, 2000)) {
        landingPageInput = candidate;
        break;
      }
    }
    if (!landingPageInput) {
      throw new Error('Creative landing page input is not editable on the new creative form.');
    }
    await landingPageInput.fill(options.landingPageUrl);
    await creativeNameInput.click();
  }

  if (hasValue(options.thirdPartyUrl)) {
    const thirdPartyUrlInput = page.locator(`#creative-${itemIndex} input[id*="pixel-url"]`).first();
    if (!(await waitUntilEditable(thirdPartyUrlInput, 5000))) {
      throw new Error('Creative third-party URL input is not editable on the creative form.');
    }
    await thirdPartyUrlInput.fill(options.thirdPartyUrl);
    await creativeNameInput.click().catch(() => undefined);
  }

  if (hasValue(options.creativeTagIds)) {
    const creativeTagInput = katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Creatives-Tab/Creative Tag ID Input',
      { creativeIndex: itemIndex }
    );
    if ((await hasMatch(creativeTagInput)) && (await creativeTagInput.isEditable().catch(() => false))) {
      await creativeTagInput.fill(options.creativeTagIds);
    }
  }

  if (options.pixels && options.pixels.length > 0) {
    await addCreativePixels(page, itemIndex, creativeCategory, options.pixels);
  }

  if (options.save !== false) {
    const inlineSaveButton = maybeKatalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Creatives-Tab/Save Creative Button',
      { creativeIndex: itemIndex }
    );
    const articleSaveButton = creativeArticle.getByRole('button', { name: /^Save$/ }).first();
    let saveButton: Locator | null = null;

    if (inlineSaveButton && (await inlineSaveButton.isVisible().catch(() => false))) {
      saveButton = inlineSaveButton;
    } else if (await articleSaveButton.isVisible().catch(() => false)) {
      saveButton = articleSaveButton;
    }

    if (!saveButton) {
      throw new Error('Creative save button is not visible on the current creative form.');
    }

    await saveButton.scrollIntoViewIfNeeded().catch(() => undefined);
    await saveButton.waitFor({ state: 'visible', timeout: 10000 });
    const saveEnabled = await waitUntilEnabled(saveButton, 15000);
    if (!saveEnabled) {
      if (options.allowDisabledSave) {
        return;
      }
      throw new Error('Creative save button did not become enabled after filling the creative form.');
    }
    await saveButton.click({ force: true }).catch(async () => {
      await saveButton?.evaluate((element) => (element as HTMLElement).click());
    });
    await waitForUiToSettle(page, 15000);
    await page.waitForTimeout(2000);
    const creativeHeader = creativeArticle.locator('strong').first();
    await creativeHeader.waitFor({ state: 'visible', timeout: 10000 });
    const headerText = ((await creativeHeader.textContent()) || '').trim();
    if (!headerText || /^unnamed creative$/i.test(headerText)) {
      throw new Error('Creative header did not update after clicking Save.');
    }
  }
}

export async function openBudgetFlightTab(page: Page): Promise<void> {
  const budgetFlightTab = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/a_BudgetFlightTab');
  await budgetFlightTab.waitFor({ state: 'visible', timeout: 15000 });
  await budgetFlightTab.click();
}

export async function waitForBudgetFlightTab(page: Page): Promise<void> {
  await openBudgetFlightTab(page);
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/h2_BudgetFlight_PageHeading').waitFor();
}

export async function configureOrderEntryBudgetFlight(
  page: Page,
  options: OrderEntryBudgetFlightOptions,
  config: { skipOpen?: boolean } = {}
): Promise<void> {
  if (!config.skipOpen) {
    await openBudgetFlightTab(page);
  }

  const cpmEditable = await isEditableIfPresent(
    katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightCPMValue')
  );
  const impressionEditable = await isEditableIfPresent(
    katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightImpressionGoal')
  );

  const startDateFilled = await fillDateFieldIfVisible(
    page,
    'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightStartDate',
    options.startDate
  );
  const endDateFilled = await fillDateFieldIfVisible(
    page,
    'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightEndDate',
    options.endDate
  );
  const resolvedStartDate = hasValue(options.startDate) ? options.startDate.trim() : undefined;
  const resolvedEndDate = hasValue(options.endDate) ? options.endDate.trim() : undefined;
  const actualStartDate = await readFieldValue(
    page,
    'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightStartDate'
  );
  const actualEndDate = await readFieldValue(
    page,
    'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightEndDate'
  );
  const startDateFieldDebug = await describeBudgetFlightDateField(
    page,
    'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightStartDate'
  );
  const endDateFieldDebug = await describeBudgetFlightDateField(
    page,
    'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightEndDate'
  );

  if (process.env.ADDAPTIVE_PAUSE_AFTER_BUDGET_FLIGHT_DATES === 'true') {
    await page.pause();
  }

  if (resolvedStartDate && (!startDateFilled || actualStartDate !== resolvedStartDate)) {
    throw new Error(
      `Budget & Flight start date did not stick. Expected "${resolvedStartDate}", actual "${actualStartDate || '<blank>'}". Field: ${startDateFieldDebug}`
    );
  }

  if (resolvedEndDate && (!endDateFilled || actualEndDate !== resolvedEndDate)) {
    throw new Error(
      `Budget & Flight end date did not stick. Expected "${resolvedEndDate}", actual "${actualEndDate || '<blank>'}". Field: ${endDateFieldDebug}`
    );
  }

  if (!cpmEditable && !impressionEditable) {
    return;
  }

  if (
    (options.adServer || '').toUpperCase() === 'DFP' &&
    (options.orderAction || '').toLowerCase() === 'create'
  ) {
    return;
  }

  if (hasValue(options.subDealId)) {
    await selectOptionIfVisible(
      page,
      'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/select_BudgetFlightSubDealId',
      options.subDealId
    );
  }

  await clearAndFillIfVisible(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightCPMValue', options.cpmValue);
  await clearAndFillIfVisible(
    page,
    'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightImpressionGoal',
    options.impressionGoal
  );
  await clearAndFillIfVisible(
    page,
    'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlight_OptimizationCPM',
    options.optimizationCpm
  );

  if (hasValue(options.pacingPercentage)) {
    if (await isVisible(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/a_BudgetFlightSwitchToPacingPercentage')) {
      await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/a_BudgetFlightSwitchToPacingPercentage').click();
    }

    const pacingHandle = katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/div_BudgetFlightPacingPercentageHandle'
    );
    const pacingValue = katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/span_BudgetFlightPacingPercentage'
    );
    await pacingHandle.waitFor({ state: 'visible', timeout: 5000 }).catch(() => undefined);

    const targetPercentage = parsePercentageValue(options.pacingPercentage);
    if (targetPercentage !== null && (await pacingHandle.isVisible().catch(() => false))) {
      let stepSize = 1;

      for (let attempt = 0; attempt < 110; attempt += 1) {
        const previousText = ((await pacingValue.textContent().catch(() => '')) || '').trim();
        const currentPercentage = parsePercentageValue(previousText);
        if (currentPercentage === targetPercentage) {
          break;
        }
        if (currentPercentage === null) {
          break;
        }

        const handleBox = await pacingHandle.boundingBox().catch(() => null);
        if (!handleBox) {
          break;
        }

        const direction = currentPercentage > targetPercentage ? -1 : 1;
        const startX = handleBox.x + handleBox.width / 2;
        const startY = handleBox.y + handleBox.height / 2;
        const endX = startX + direction * stepSize;

        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(endX, startY);
        await page.mouse.up();
        await page.waitForTimeout(50);

        const updatedText = ((await pacingValue.textContent().catch(() => '')) || '').trim();
        if (updatedText === previousText) {
          stepSize += 1;
        }
      }
    }
  }

  if (hasValue(options.pacingImpressionType) && ['MEDIAMATH', 'MEDIAMATH_GAM'].includes((options.adServer || '').toUpperCase())) {
    await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/Media Math/Pacing Even Asap Dropdown').selectOption({
      label: options.pacingImpressionType
    });
  }

  if (hasValue(options.pacingImpression) && ['MEDIAMATH', 'MEDIAMATH_GAM'].includes((options.adServer || '').toUpperCase())) {
    await clearAndFill(
      page,
      'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/Media Math/Pacing Value Input',
      options.pacingImpression
    );
  }

  if (hasValue(options.dailyBudget)) {
    if (await isVisible(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/a_BudgetFlightSwitchToDailyBudget')) {
      await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/a_BudgetFlightSwitchToDailyBudget').click();
    }
    await clearAndFillIfVisible(
      page,
      'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_BudgetFlightDailyBudget',
      options.dailyBudget
    );
  }

  if (hasValue(options.xandrLifeBuffer) && hasValue(options.xandrLifeBudget)) {
    await clearAndFillIfVisible(
      page,
      'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_Xandr Life Budget_budget-flight-xandr-life-buffer',
      options.xandrLifeBuffer
    );
    await clearAndFillIfVisible(
      page,
      'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/input_Admin Settings_budget-flight-xandr-life-budget',
      options.xandrLifeBudget
    );
  }
}

export async function openInventoryTab(page: Page): Promise<void> {
  const inventoryTab = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/a_InventoryTab');
  await inventoryTab.waitFor({ state: 'visible', timeout: 15000 });
  await inventoryTab.click();
}

export async function openAudienceTab(page: Page): Promise<void> {
  const audienceTab = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/a_Audience_Tab');
  await audienceTab.waitFor({ state: 'visible', timeout: 15000 });
  await audienceTab.click();
}

export async function configureOrderEntryAudience(
  page: Page,
  actions: OrderEntryAudienceAction[]
): Promise<void> {
  await openAudienceTab(page);

  for (const action of actions) {
    if (action.action !== '*') {
      continue;
    }

    const includeExclude = (action.includeExclude || 'Include').toLowerCase();
    if (includeExclude === 'include') {
      await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/button_Audience_Include').click();
    } else if (includeExclude === 'exclude') {
      await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/button_Audience_Exclude').click();
    }

    await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/div_Audiences_AudienceType').click();
    if (hasValue(action.audienceType)) {
      await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/div_Audiences_AudienceType_MenuItem', {
        audienceType: action.audienceType
      }).click();
    }

    if (hasValue(action.audienceName)) {
      const searchInput = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/input_Audience_Search');
      await searchInput.fill('');
      await searchInput.pressSequentially(action.audienceName, { delay: 30 });
      await page.waitForTimeout(500);
    }

    const targetGroupIndex = action.groupIndex || 1;
    const targetSubgroupIndex = action.subgroupIndex || 1;

    while (
      !(await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/Audience Group', {
        groupIndex: String(targetGroupIndex)
      })
        .isVisible()
        .catch(() => false))
    ) {
      await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/button_Audeince_Group_Add').click();
    }

    while (
      !(await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/Audience Subgroup', {
        groupIndex: String(targetGroupIndex),
        subgroupIndex: String(targetSubgroupIndex)
      })
        .isVisible()
        .catch(() => false))
    ) {
      await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/button_Audience_Subgroup_Add', {
        groupIndex: String(targetGroupIndex)
      }).click();
    }

    const sourceAudience =
      hasValue(action.audienceName)
        ? katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/div_Audience_Tag', {
            audience: action.audienceName
          })
        : page.locator('#order-entry-audience-list-item-0').first();
    const fallbackSourceAudience = page.locator('#order-entry-audience-list-item-0').first();
    const targetSubgroup = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/Audience Subgroup', {
      groupIndex: String(targetGroupIndex),
      subgroupIndex: String(targetSubgroupIndex)
    });

    const dragSource = (await sourceAudience.isVisible().catch(() => false)) ? sourceAudience : fallbackSourceAudience;
    await dragSource.dragTo(targetSubgroup).catch(async () => {
      const sourceBox = await dragSource.boundingBox();
      const targetBox = await targetSubgroup.boundingBox();
      if (!sourceBox || !targetBox) {
        throw new Error(`Failed to drag audience "${action.audienceName || action.audienceId || ''}" into target subgroup.`);
      }

      await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2);
      await page.mouse.up();
    });

    await page.waitForTimeout(500);
  }
}

export async function configureOrderEntryInventory(
  page: Page,
  options: OrderEntryInventoryOptions,
  config: { skipOpen?: boolean } = {}
): Promise<void> {
  if (!config.skipOpen) {
    await openInventoryTab(page);
  }

  await selectGeoTargetingType(page, options.geoTargetingType);

  if ((options.geoTargetingType || '').toLowerCase() === 'zip') {
    await clearAndFill(
      page,
      'Object Repository/Frontend/Order-Entry/Inventory-Tab/textarea_InventoryGeoTargetingZipCode',
      (options.geoTargetingItems || []).join('\n')
    );
  } else {
    for (const item of options.geoTargetingItems || []) {
      await ensureGeoSearchMode(page, options.geoTargetingType);
      await selectGeoTargetingItem(page, item);
    }
  }

  if (hasValue(options.profileName)) {
    const profileInput = maybeKatalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryGeoProfileName'
    );
    const saveProfileButton = maybeKatalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventorySaveProfile'
    );
    const confirmProfileSaveLink = maybeKatalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Inventory-Tab/a_InventoryGeoProfileNameSave'
    );

    let profileInputReady = profileInput ? await waitUntilEditable(profileInput, 1500) : false;
    if (!profileInputReady && saveProfileButton && (await saveProfileButton.isVisible().catch(() => false))) {
      await saveProfileButton.click();
      profileInputReady = profileInput ? await waitUntilEditable(profileInput, 5000) : false;
    }

    if (!profileInputReady || !profileInput) {
      throw new Error('Geo profile name input is not editable after opening Save Profile.');
    }

    await profileInput.fill('');
    await profileInput.fill(options.profileName);

    const confirmProfileSave =
      confirmProfileSaveLink && (await confirmProfileSaveLink.isVisible().catch(() => false))
        ? confirmProfileSaveLink
        : saveProfileButton;
    if (!confirmProfileSave || !(await waitUntilEnabled(confirmProfileSave, 5000))) {
      throw new Error('Geo profile save action is not available after entering profile name.');
    }
    await confirmProfileSave.click();
  }

  const deviceMap = {
    desktop: 'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Devices/div_InventoryDeviceDesktop',
    mobile: 'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Devices/div_InventoryDeviceMobile',
    tablet: 'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Devices/div_InventoryDeviceTablet',
    ctv: 'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Devices/div_InventoryDeviceCTV',
    audio: 'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Devices/div_InventoryDeviceAudio'
  } as const;

  for (const device of options.inventoryDevices || []) {
    const key = device.trim().toLowerCase() as keyof typeof deviceMap;
    if (deviceMap[key]) {
      const deviceLocator = katalonLocator(page, deviceMap[key]);
      if ((await hasMatch(deviceLocator)) && (await deviceLocator.isVisible().catch(() => false))) {
        await deviceLocator.click({ force: true }).catch(() => undefined);
        await deviceLocator.evaluate((element) => (element as HTMLElement).click()).catch(() => undefined);
        continue;
      }
    }

    const fallbackDeviceButton = page
      .locator('[id^="inventory-device-"], .device-container')
      .filter({ hasText: new RegExp(`^${device.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') })
      .first();
    if (await fallbackDeviceButton.isVisible().catch(() => false)) {
      await fallbackDeviceButton.click({ force: true }).catch(() => undefined);
      await fallbackDeviceButton.evaluate((element) => (element as HTMLElement).click()).catch(() => undefined);
    }
  }

  if (hasValue(options.inventoryItem)) {
    let inventoryTypeSelected = false;
    const inventoryTypeDropdown = page.locator('#inventory-inventory-type, select[formcontrolname="inventoryType"]').first();
    if ((await hasMatch(inventoryTypeDropdown)) && (await inventoryTypeDropdown.isEnabled().catch(() => false))) {
      inventoryTypeSelected = await inventoryTypeDropdown
        .selectOption({ label: options.inventoryItem })
        .then(() => true)
        .catch(async () => {
          const selected = await inventoryTypeDropdown.evaluate(
            (element, desiredLabel) => {
              const select = element as HTMLSelectElement;
              const option = Array.from(select.options).find(
                (item) => item.textContent?.replace(/\s+/g, ' ').trim().toLowerCase() === desiredLabel.toLowerCase()
              );
              if (!option) {
                return false;
              }
              select.value = option.value;
              select.dispatchEvent(new Event('input', { bubbles: true }));
              select.dispatchEvent(new Event('change', { bubbles: true }));
              return true;
            },
            options.inventoryItem.replace(/\s+/g, ' ').trim()
          );
          return selected;
        });
    }

    if (!inventoryTypeSelected) {
      await selectOptionIfVisible(
        page,
        'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryDeviceType',
        options.inventoryItem
      );
    }
  }

  await clearAndFillIfVisible(
    page,
    'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryViewabilityThresholdPredictedViewability',
    options.viewabilityThreshold
  );
  await clearAndFillIfVisible(
    page,
    'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryCompletionRateThresholdPredictedVideoCompletion',
    options.completionRateThreshold
  );
  await clearAndFillIfVisible(
    page,
    'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryListenthroughThresholdPredictedListenthroughThreshold',
    options.listenThroughThreshold
  );

  if (hasValue(options.postBidMeasurement) && ['MEDIAMATH', 'MEDIAMATH_GAM'].includes((options.adServer || '').toUpperCase())) {
    await setCheckboxState(
      page,
      'Object Repository/Frontend/Order-Entry/Inventory-Tab/Media Math/Post Bid Measurement Checkbox',
      options.postBidMeasurement.toLowerCase() === 'yes'
    );
  }

  const supplyStrategyMap = {
    'open exchange': 'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventorySettingsSupplyStrategyOpenExchange',
    deals: 'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventorySettingsSupplyStrategyDeals',
    both: 'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventorySettingsSupplyStrategyBoth'
  } as const;
  const supplyStrategyPath = supplyStrategyMap[(options.supplyStrategy || '').toLowerCase() as keyof typeof supplyStrategyMap];
  if (supplyStrategyPath) {
    await setCheckboxState(page, supplyStrategyPath, true);
  }

  const dealSelectionMap = {
    'specific deals': 'Object Repository/Frontend/Order-Entry/Inventory-Tab/div_InventoryTargetingAdminSpecificDeals',
    'all deals': 'Object Repository/Frontend/Order-Entry/Inventory-Tab/div_InventoryTargetingAdminAllDeals'
  } as const;
  const normalizedDealSelectionType = (options.dealSelectionType || '').toLowerCase() as keyof typeof dealSelectionMap;
  const dealSelectionPath = dealSelectionMap[normalizedDealSelectionType];
  if (dealSelectionPath) {
    const dealSelectionLocator = maybeKatalonLocator(page, dealSelectionPath);
    let dealSelectionApplied = false;

    if (dealSelectionLocator) {
      for (let attempt = 0; attempt < 10; attempt += 1) {
        if ((await hasMatch(dealSelectionLocator)) && (await dealSelectionLocator.isVisible().catch(() => false))) {
          await dealSelectionLocator.click({ force: true }).catch(() => undefined);
          dealSelectionApplied = true;
          break;
        }
        await page.waitForTimeout(200);
      }
    }

    if (!dealSelectionApplied) {
      const dealSelectionId =
        normalizedDealSelectionType === 'all deals' ? 'inventory-settings-all-deals' : 'inventory-settings-specific-deals';
      const fallbackDealSelection = page
        .locator(`#${dealSelectionId}, label[for='${dealSelectionId}'], [data-test-id='${dealSelectionId}']`)
        .first();
      if ((await hasMatch(fallbackDealSelection)) && (await fallbackDealSelection.isVisible().catch(() => false))) {
        await fallbackDealSelection.click({ force: true }).catch(() => undefined);
        dealSelectionApplied = true;
      }
    }

    if (!dealSelectionApplied) {
      console.warn(
        `Order entry inventory deal selection "${options.dealSelectionType}" was requested but no matching control was visible.`
      );
    }
  }

  if (hasValue(options.crossDevice)) {
    const desiredOn = options.crossDevice.toLowerCase() === 'on';
    const crossDeviceToggle = page
      .locator('#inventory-settings-cross-device-on, #inventory-settings-cross-device-off')
      .first();
    const crossDeviceVisible = await crossDeviceToggle.isVisible().catch(() => false);
    if (crossDeviceVisible) {
      const currentText = ((await crossDeviceToggle.textContent().catch(() => '')) || '').trim().toLowerCase();
      const isCurrentlyOn = currentText === 'on';
      if (isCurrentlyOn !== desiredOn) {
        await crossDeviceToggle.click();
      }
    }
  }

  const shouldOpenFrequency =
    !!options.frequencyCapEnabled ||
    !!options.recencyCapEnabled ||
    [options.frequencyCap, options.frequencyCapUnit, options.recencyCap, options.recencyCapUnit].some((value) => hasValue(value));

  if (hasValue(options.targetingTypeBrowser) || (options.targetingBrowsers || []).length > 0) {
    await katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Browser Targeting/button_InventoryBrowserTargetingEdit'
    ).click();

    const browserMode = (options.targetingTypeBrowser || '').toLowerCase();
    if (browserMode === 'include') {
      await katalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Browser Targeting/button_InventoryBrowserTargetingInclude'
      ).click();
    } else if (browserMode === 'exclude') {
      await katalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Browser Targeting/button_InventoryBrowserTargetingExclude'
      ).click();
    }

    for (const browser of options.targetingBrowsers || []) {
      await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/span_InventoryBrowserTargetingItem', {
        targetingItemBrowser: browser
      }).click();
    }

    await katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Browser Targeting/button_InventoryBrowserTargetingContinue'
    ).click();
  }

  await configureInventoryListTargeting(
    page,
    options.inventoryInclusionList || [],
    options.inventoryExclusionList || []
  );

  await configureDayParting(page, options.dayPartingTimeSlots || []);

  if (shouldOpenFrequency) {
    await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventoryFrequencyAndRecencyAccordion').click();
  }

  if (options.frequencyCapEnabled || hasValue(options.frequencyCap) || hasValue(options.frequencyCapUnit)) {
    await setCheckboxState(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/Frequency Cap Checkbox', true);
    if (hasValue(options.frequencyCap)) {
      await clearAndFill(
        page,
        'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryFrequencyImpression',
        options.frequencyCap
      );
    }
  }

  if (hasValue(options.frequencyCapUnit)) {
    await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryFrequencyList').selectOption({
      label: options.frequencyCapUnit
    });
  }

  if (options.recencyCapEnabled || hasValue(options.recencyCap) || hasValue(options.recencyCapUnit)) {
    await setCheckboxState(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/Recency Cap Checkbox', true);
    if (hasValue(options.recencyCap)) {
      await clearAndFill(
        page,
        'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryRecencyImpression',
        options.recencyCap
      );
    }
  }

  if (hasValue(options.recencyCapUnit)) {
    await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryRecencyList').selectOption({
      label: options.recencyCapUnit
    });
  }

}

export async function waitForInventoryTab(page: Page): Promise<void> {
  await openInventoryTab(page);
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/h2_Inventory_PageHeading').waitFor();
}

export async function openSplitsTab(page: Page): Promise<void> {
  const splitsTab = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/a_Splits_Tab');
  await splitsTab.waitFor({ state: 'visible', timeout: 15000 });
  const currentUrl = page.url();
  const className = (await splitsTab.getAttribute('class').catch(() => '')) || '';
  if (/\/orders\/create\/splits(?:\/|$)/i.test(currentUrl) || /\bactive\b/i.test(className)) {
    return;
  }

  await waitForUiToSettle(page, 5000);
  await splitsTab.click();
}

export async function finalizeDefaultSplit(
  page: Page,
  options: {
    splitsDivideEqually?: string;
    splitsAllocations?: string[];
    creativeName?: string;
  } = {}
): Promise<void> {
  await openSplitsTab(page);

  const groupLink = page.getByRole('link', { name: /Group 1/i }).first();
  if (await groupLink.isVisible().catch(() => false)) {
    await groupLink.click();
  } else {
    const dataAssetsLink = page.getByRole('link', { name: /^Data Assets$/i }).first();
    if (await dataAssetsLink.isVisible().catch(() => false)) {
      await dataAssetsLink.click();
    } else {
      return;
    }
  }

  const splitNameInput = katalonLocator(
    page,
    'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/input_SplitsBasicSetupName'
  );
  if (!((await hasMatch(splitNameInput)) && (await splitNameInput.isEditable().catch(() => false)))) {
    const editSplitLink = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/a_Splits_EditGroup', {
      groupNo: 1
    });
    if (await editSplitLink.isVisible().catch(() => false)) {
      await editSplitLink.click();
    } else {
      const fallbackEditSplit = page.getByRole('link', { name: /Edit Split/i }).first();
      if (await fallbackEditSplit.isVisible().catch(() => false)) {
        await fallbackEditSplit.click();
      }
    }
  }

  if ((await hasMatch(splitNameInput)) && (await splitNameInput.isEditable().catch(() => false))) {
    const currentName = await splitNameInput.inputValue().catch(() => '');
    if (currentName) {
      await splitNameInput.fill('');
      await splitNameInput.fill(currentName);
    }
  }

  const splitBidModifiers = katalonLocator(
    page,
    'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/input_SplitsBasicSetupBidModifiers'
  );
  if ((await hasMatch(splitBidModifiers)) && (await splitBidModifiers.isEditable().catch(() => false))) {
    const currentBid = await splitBidModifiers.inputValue().catch(() => '');
    if (currentBid) {
      await splitBidModifiers.fill('');
      await splitBidModifiers.fill(currentBid);
    }
  }

  const splitCreativesTab = katalonLocator(
    page,
    'Object Repository/Frontend/Order-Entry/Splits-Tab/Creatives Tab/Splits Creatives Tab Link'
  );
  if (await splitCreativesTab.isVisible().catch(() => false)) {
    await splitCreativesTab.click();

    const splitCreativesInheritToggle = katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Splits-Tab/Creatives Tab/Split Creatives Inherit Modify Checkbox'
    );
    if (await splitCreativesInheritToggle.isVisible().catch(() => false)) {
      const currentMode = ((await splitCreativesInheritToggle.textContent().catch(() => '')) || '').trim().toLowerCase();
      if (currentMode === 'modify') {
        await splitCreativesInheritToggle.click();
      }
    }

    const splitCreativeError = page.getByText(/Unable to set creatives on split/i).first();
    if ((await splitCreativeError.isVisible().catch(() => false)) && hasValue(options.creativeName)) {
      const editSplitCreativeButton = katalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Splits-Tab/Creatives Tab/Edit Split Creative Button'
      );
      if (
        (await editSplitCreativeButton.isVisible().catch(() => false)) &&
        (await waitUntilEnabled(editSplitCreativeButton, 1500))
      ) {
        await editSplitCreativeButton.click();

        const splitCreativeModalSearch = katalonLocator(
          page,
          'Object Repository/Frontend/Order-Entry/Splits-Tab/Creatives Tab/Splits Creatives Modal Searchbox'
        );
        if (await splitCreativeModalSearch.isVisible().catch(() => false)) {
          await splitCreativeModalSearch.fill('');
          await splitCreativeModalSearch.fill(options.creativeName);

          const splitCreativeOption = katalonLocator(
            page,
            'Object Repository/Frontend/Order-Entry/Splits-Tab/Creatives Tab/Split Creative Modal Span',
            { creativeName: options.creativeName }
          );
          if (await splitCreativeOption.isVisible().catch(() => false)) {
            await splitCreativeOption.click();
          }
        }
      }
    }

    const splitCreativesContinue = katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Splits-Tab/Creatives Tab/Split Creatives Continue Button'
    );
    if (
      (await splitCreativesContinue.isVisible().catch(() => false)) &&
      (await waitUntilEnabled(splitCreativesContinue, 5000))
    ) {
      await splitCreativesContinue.click();
      await splitCreativesContinue.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => undefined);
      await waitForUiToSettle(page, 10000);
    }
  }

  const returnToSplits = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/span_Return to Splits');
  if (await returnToSplits.isVisible().catch(() => false)) {
    await returnToSplits.click();
  }

  await openSplitsTab(page);

  const openAllocation = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/span_SplitsOpenSplitAllocation');
  if (await openAllocation.isVisible().catch(() => false)) {
    await openAllocation.click();
  }

  const divideEquallyButton = katalonLocator(
    page,
    'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/button_SplitsAllocationDivideEqually'
  );
  if (!(await divideEquallyButton.isVisible().catch(() => false))) {
    return;
  }

  if ((options.splitsDivideEqually || '').toLowerCase() === 'yes') {
    await divideEquallyButton.click();
  } else if (options.splitsAllocations?.length) {
    for (const allocation of options.splitsAllocations) {
      const parts = allocation.split(':').map((item) => item.trim());
      if (parts.length < 2) {
        continue;
      }

      const groupNumber = String(Math.max(Number(parts[0]) - 1, 0));
      const allocationInput = katalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/input_SplitsAllicationPercentageForGroup',
        { groupNumber }
      );
      if (await allocationInput.isVisible().catch(() => false)) {
        await allocationInput.fill('');
        await allocationInput.fill(parts[1]);
      }
    }
  }

  await katalonLocator(
    page,
    'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/button_SplitsAllocationContinue'
  ).click();
  await divideEquallyButton.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => undefined);
}

export async function verifyOrderEntryPrimaryTabs(page: Page): Promise<void> {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/a_BasicSetupTab').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/h2_BasicSetup_TabHeader').waitFor();
  await waitForBudgetFlightTab(page);
  await waitForInventoryTab(page);
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/a_ObjectivesTab').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/a_Audience_Tab').click();
  await openCreativesTab(page);
  await openSplitsTab(page);
}

export async function createSplit(page: Page, options: SplitUpdateOptions = {}): Promise<void> {
  await openSplitsTab(page);
  await createSplitOnCurrentPage(page, options);
}

export async function createSplitOnCurrentPage(page: Page, options: SplitUpdateOptions = {}): Promise<void> {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/button_Create Split').click();
  await updateCurrentSplit(page, options);
}

export async function editSplit(
  page: Page,
  groupNumber: number,
  options: SplitUpdateOptions
): Promise<void> {
  await openSplitsTab(page);
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/span_Splits_OpenGroupMenu', {
    groupNo: groupNumber - 1
  }).click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/a_Splits_EditGroup', {
    groupNo: groupNumber
  }).click();
  await updateCurrentSplit(page, options);
}

export async function deleteSplit(page: Page, groupNumber: number): Promise<void> {
  await openSplitsTab(page);
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/span_Splits_OpenGroupMenu', {
    groupNo: groupNumber - 1
  }).click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/a_Splits_DeleteGroup', {
    groupNo: groupNumber
  }).click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/button_Splits_DeleteGroupComfirmationContinue').click();

  const divideEquallyButton = katalonLocator(
    page,
    'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/button_SplitsAllocationDivideEqually'
  );
  if (await divideEquallyButton.isVisible().catch(() => false)) {
    await divideEquallyButton.click();
  }

  const allocationContinue = katalonLocator(
    page,
    'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/button_SplitsAllocationContinue'
  );
  if (await allocationContinue.isVisible().catch(() => false)) {
    await allocationContinue.click();
  }
}

export async function verifySplitGroupCount(page: Page, minimumCount = 1): Promise<void> {
  await openSplitsTab(page);
  const groups = page.locator('[id^="split-open-menu-"]');
  await groups.first().waitFor();
  if ((await groups.count()) < minimumCount) {
    throw new Error(`Expected at least ${minimumCount} split groups.`);
  }
}

export async function saveOrderAsDraft(page: Page): Promise<void> {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/button_OrderEntry_SaveAsDraft').click();
}

async function applySplitAllocationsIfModalOpen(
  page: Page,
  options: {
    splitsDivideEqually?: string;
    splitsAllocations?: string[];
  } = {}
): Promise<boolean> {
  const divideEquallyButton = katalonLocator(
    page,
    'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/button_SplitsAllocationDivideEqually'
  );
  if (!(await divideEquallyButton.isVisible().catch(() => false))) {
    return false;
  }

  if ((options.splitsDivideEqually || '').toLowerCase() === 'yes') {
    await divideEquallyButton.click();
  } else if (options.splitsAllocations?.length) {
    for (const allocation of options.splitsAllocations) {
      const parts = allocation.split(':').map((item) => item.trim());
      if (parts.length < 2) {
        continue;
      }

      const groupNumber = String(Math.max(Number(parts[0]) - 1, 0));
      const percentage = parts[1];
      const lockStatus = (parts[2] || '').toLowerCase();

      const allocationInput = katalonLocator(
        page,
        'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/input_SplitsAllicationPercentageForGroup',
        { groupNumber }
      );
      if (await allocationInput.isVisible().catch(() => false)) {
        await allocationInput.fill('');
        await allocationInput.fill(percentage);
      }

      if (lockStatus === 'lock' || lockStatus === 'unlock') {
        const lockIcon = katalonLocator(
          page,
          'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/span_SplitsAllicationLockGroup',
          { groupNumber, lockStatus }
        );
        if (await lockIcon.isVisible().catch(() => false)) {
          await lockIcon.click();
        }
      }
    }
  }

  await katalonLocator(
    page,
    'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/button_SplitsAllocationContinue'
  ).click();
  await divideEquallyButton.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => undefined);
  await waitForUiToSettle(page, 10000);
  return true;
}

export async function verifySubmitOrderDisabled(page: Page): Promise<void> {
  const submitButton = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Submit-Order/button_SubmitOrder');
  await submitButton.waitFor({ state: 'visible', timeout: 20000 });

  const preSubmitWaitMs = Number(process.env.ADDAPTIVE_PRE_SUBMIT_WAIT_MS || '0');
  if (Number.isFinite(preSubmitWaitMs) && preSubmitWaitMs > 0) {
    await page.waitForTimeout(preSubmitWaitMs);
  }

  if (await waitForSubmitReady(page, submitButton, 2000)) {
    throw new Error('Submit Order is enabled for an invalid-order case.');
  }
}

export async function submitOrder(
  page: Page,
  options: {
    adServer?: string;
    splitsDivideEqually?: string;
    splitsAllocations?: string[];
    confirmationMessages?: string[];
  } = {}
): Promise<void> {
  const submitButton = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Submit-Order/button_SubmitOrder');
  await submitButton.waitFor({ state: 'visible', timeout: 20000 });

  const preSubmitWaitMs = Number(process.env.ADDAPTIVE_PRE_SUBMIT_WAIT_MS || '0');
  if (Number.isFinite(preSubmitWaitMs) && preSubmitWaitMs > 0) {
    await page.waitForTimeout(preSubmitWaitMs);
  }
  if (!(await waitForSubmitReady(page, submitButton, 20000))) {
    const topNavState = await page
      .locator('nav a[href^="/orders/create/"]')
      .evaluateAll((links) =>
        links.map((link) => ({
          text: (link.textContent || '').replace(/\s+/g, ' ').trim(),
          className: link.getAttribute('class') || ''
        }))
      )
      .catch(() => []);
    const tabListState = await page
      .locator('nav li')
      .evaluateAll((items) =>
        items.map((item) => ({
          text: (item.textContent || '').replace(/\s+/g, ' ').trim(),
          className: item.getAttribute('class') || ''
        }))
      )
      .catch(() => []);
    const visibleErrors = (
      (await page
        .locator('.invalid-feedback, .alert-danger, .text-danger, [class*="error"]')
        .evaluateAll((nodes) =>
          nodes
            .map((node) => (node.textContent || '').replace(/\s+/g, ' ').trim())
            .filter(Boolean)
        )
        .catch(() => [])) as string[]
    ).slice(0, 10);
    const invalidControls = await page
      .locator('input.ng-invalid, select.ng-invalid, textarea.ng-invalid, .ng-invalid input, .ng-invalid select, .ng-invalid textarea')
      .evaluateAll((nodes) =>
        nodes
          .map((node) => {
            const element = node as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
            const rect = element.getBoundingClientRect();
            return {
              id: element.id || '',
              name: element.getAttribute('name') || '',
              formControlName: element.getAttribute('formcontrolname') || '',
              placeholder: element.getAttribute('placeholder') || '',
              value: 'value' in element ? element.value : '',
              className: element.className,
              visible: rect.width > 0 && rect.height > 0
            };
          })
          .filter((item) => item.visible)
      )
      .catch(() => []);
    throw new Error(
      `Submit Order is still disabled. Top nav: ${JSON.stringify(topNavState)}. Tab list: ${JSON.stringify(tabListState)}. Visible errors: ${JSON.stringify(visibleErrors)}. Invalid controls: ${JSON.stringify(invalidControls)}.`
    );
  }
  await applySplitAllocationsIfModalOpen(page, options);
  await submitButton.click();
  await applySplitAllocationsIfModalOpen(page, options);

  for (const confirmationMessage of options.confirmationMessages || []) {
    const confirmation = katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Submit-Order/div_SubmitOrderConfirmationMessage',
      { confirmationMessage }
    );
    if (await confirmation.isVisible().catch(() => false)) {
      await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Submit-Order/button_PopupMessageNoAudienceContinue').click();
    }
  }
}

export async function verifyOrderEntryAudienceTab(page: Page): Promise<void> {
  await openAudienceTab(page);
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/button_Audience_Include').waitFor({
    state: 'visible'
  });
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/button_Audience_Exclude').waitFor({
    state: 'visible'
  });
}

export async function verifyOrderEntryObjectivesTab(page: Page): Promise<void> {
  await openObjectivesTab(page);
  await page.getByRole('heading', { name: /Create an Order/i }).waitFor();
  const objectivesHeading = page.getByRole('heading', { name: /Objectives/i }).first();
  if (await objectivesHeading.isVisible().catch(() => false)) {
    await objectivesHeading.waitFor();
  }
}

export async function verifyOrderEntrySubmitControls(page: Page): Promise<void> {
  const submitButton = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Submit-Order/button_SubmitOrder');
  await submitButton.waitFor({ state: 'visible' });
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/button_OrderEntry_SaveAsDraft').waitFor({
    state: 'visible'
  });
}

export function envList(value?: string): string[] {
  return parseList(value);
}

export async function verifyPmpBasicSetup(
  page: Page,
  options: {
    orderName?: string;
    advertiser?: string;
    singleObjectDealId?: string;
  }
): Promise<void> {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/a_BasicSetupTab').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/h2_BasicSetup_TabHeader').waitFor();

  if (hasValue(options.orderName)) {
    const value = await katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupOrderName'
    ).inputValue();
    if (value !== options.orderName) {
      throw new Error(`Expected order name "${options.orderName}" but found "${value}".`);
    }
  }

  if (hasValue(options.advertiser)) {
    const value = await katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupAdvertiser'
    ).inputValue();
    if (!value.includes(options.advertiser)) {
      throw new Error(`Expected advertiser to include "${options.advertiser}" but found "${value}".`);
    }
  }

  if (hasValue(options.singleObjectDealId)) {
    const value = await katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Basic-Setup-Tab/input_BasicSetupSingleObjectDealId'
    ).inputValue();
    if (value !== options.singleObjectDealId) {
      throw new Error(`Expected single object deal id "${options.singleObjectDealId}" but found "${value}".`);
    }
  }
}

async function updateCurrentSplit(page: Page, options: SplitUpdateOptions): Promise<void> {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/a_SplitsBasicSetupTab').click();

  await clearAndFill(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/input_SplitsBasicSetupName', options.name);
  await clearAndFill(
    page,
    'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/input_SplitsBasicSetupBidModifiers',
    options.bidModifiers
  );

  if (hasValue(options.status)) {
    const statusToggle = katalonLocator(
      page,
      'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/label_SplitsBasicSetupStatus'
    );
    const current = (await statusToggle.textContent()) || '';
    if (
      (options.status.toLowerCase() === 'active' && !/active/i.test(current)) ||
      (options.status.toLowerCase() === 'inactive' && /active/i.test(current))
    ) {
      await statusToggle.click();
    }
  }

  if (options.iabViewabilityRate) {
    await setCheckboxState(
      page,
      'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/input_IABViewabilityRateCheckbox',
      options.iabViewabilityRate.enabled
    );

    if (options.iabViewabilityRate.enabled) {
      if (hasValue(options.iabViewabilityRate.operator)) {
        await katalonLocator(
          page,
          'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/select_SplitsBasicSetupIABViewabilityRateOperator'
        ).selectOption({ label: options.iabViewabilityRate.operator });
      }

      await clearAndFill(
        page,
        'Object Repository/Frontend/Order-Entry/Splits-Tab/BasicSetup-Tab/input_SplitsBasicSetupIABViewabilityRateValue',
        options.iabViewabilityRate.value
      );
    }
  }

  const allocationContinue = katalonLocator(
    page,
    'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/button_SplitsAllocationContinue'
  );
  if (await allocationContinue.isVisible().catch(() => false)) {
    await allocationContinue.click();
  }

  const splitSaveButton = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/button_SplitsSave');
  if ((await splitSaveButton.isVisible().catch(() => false)) && (await waitUntilEnabled(splitSaveButton, 5000))) {
    await splitSaveButton.click();
  }

  const returnToSplits = katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/span_Return to Splits');
  if (await returnToSplits.isVisible().catch(() => false)) {
    await returnToSplits.click();
  }
}
