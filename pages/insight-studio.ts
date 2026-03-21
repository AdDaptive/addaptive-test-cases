import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { katalonLocator } from '../locators/resolve';
import { config } from '../utils/config';
import { loadInsightStudioCaseData } from '../utils/insight-studio-db';

export type InsightStudioWidgetOptions = {
  action: 'add' | 'edit' | 'delete';
  widgetIndex?: number;
  dataSource?: string;
  widgetType?: string;
  dimension?: string;
  metric?: string;
  content?: string;
};

export type InsightStudioReportOptions = {
  reportAction: 'create' | 'edit';
  templateType?: string;
  reportName?: string;
  existingReportName?: string;
  status?: string;
  fileTypes?: string[];
  cadence?: string;
  enableItemizedReporting?: boolean;
  tagsToUse?: string[];
  recipients?: string[];
};

export type InsightStudioDataSourceOptions = {
  action: 'add' | 'edit' | 'delete';
  index: number;
  dataSourceType?: string;
  dateRange?: string;
  dataSelectionType?: string;
  lineItems: string[];
};

export type InsightStudioExportTargetOptions = {
  action: 'add' | 'edit' | 'delete';
  index: number;
  targetType?: string;
};

function widgetDataSourceDropdown(page: Page) {
  return page
    .locator(
      'app-edit-widget select[formcontrolname="dataSource"], app-edit-widget select[data-test-id="data-source"], app-edit-widget select[id*="datasource"]'
    )
    .first();
}

function widgetTypeDropdown(page: Page) {
  return page
    .locator(
      'app-edit-widget select[formcontrolname="widgetType"], app-edit-widget select[data-test-id="widget-type"], app-edit-widget select[placeholder="Widget Type"]'
    )
    .first();
}

function widgetApplyButton(page: Page) {
  return page.locator('app-edit-widget button[data-test-id="widget-apply-btn"]').first();
}

function widgetEditorPanel(page: Page) {
  return page.locator('app-edit-widget').first();
}

function recipientInput(page: Page) {
  return page
    .locator(
      'input[data-test-id="email-recipient-input"]:visible, [data-test-id="email-recipient-input"] input:visible'
    )
    .first();
}

function addRecipientButton(page: Page) {
  return page
    .locator(
      'button[data-test-id="add-email-recipient-btn"]:visible'
    )
    .first();
}

async function isWidgetEditorVisible(page: Page): Promise<boolean> {
  const checks = [
    widgetEditorPanel(page),
    widgetDataSourceDropdown(page),
    widgetTypeDropdown(page),
    widgetApplyButton(page),
    page.getByText('Dimension', { exact: true }).first(),
    page.getByText('Metrics', { exact: true }).first(),
    page.getByText('Data Source', { exact: true }).first(),
    page.getByText('Widget Type', { exact: true }).first()
  ];

  for (const locator of checks) {
    if (await locator.isVisible().catch(() => false)) {
      return true;
    }
  }

  return false;
}

function visibleAddWidgetButton(page: Page) {
  return page.locator('div.add-widget').filter({ hasText: 'Add New' }).last();
}

async function clickWidgetSelectionItem(item: ReturnType<Page['locator']>): Promise<void> {
  await expect(item).toBeVisible({ timeout: 15000 });
  await item.scrollIntoViewIfNeeded();
  await item.click({ force: true });
}

async function waitForWidgetEditor(page: Page, timeout = 15000): Promise<void> {
  await expect.poll(
    async () => isWidgetEditorVisible(page),
    { timeout }
  ).toBeTruthy();
}

async function selectInsightStudioLineItem(page: Page, lineItem: string): Promise<void> {
  const modal = page.locator('text=Data Selection').locator('..').first();
  const escapedLineItem = lineItem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const resultAction = page.locator('span.action:visible, button:has-text("Select"):visible').first();
  const lineItemText = page.getByText(new RegExp(`^${escapedLineItem}$`)).first();
  const lineItemRow = lineItemText
    .locator('xpath=ancestor::*[self::tr or contains(@class,"list-item") or contains(@class,"row") or self::div][1]')
    .first();
  const selectedLineItem = page
    .locator(`.list-item.is-selected:has-text("${lineItem}")`)
    .first();
  const noResults = page.getByText(/No Line Items have been found/i).first();

  await expect
    .poll(
      async () => {
        if (await noResults.isVisible().catch(() => false)) {
          return 'no-results';
        }
        if (await resultAction.isVisible().catch(() => false)) {
          return 'result';
        }
        return 'waiting';
      },
      { timeout: 10000 }
    )
    .not.toBe('waiting');

  if (await noResults.isVisible().catch(() => false)) {
    throw new Error(`No Insight Studio line item results found for "${lineItem}".`);
  }

  await expect(lineItemText).toBeVisible({ timeout: 10000 });

  const rowScopedAction = lineItemRow
    .locator('span.action:visible, button:has-text("Select"):visible')
    .first();

  if (await modal.isVisible().catch(() => false)) {
    await lineItemRow.scrollIntoViewIfNeeded().catch(() => undefined);
  }

  if (await rowScopedAction.isVisible().catch(() => false)) {
    await rowScopedAction.click({ force: true });
  } else if (await lineItemRow.isVisible().catch(() => false)) {
    await lineItemRow.click({ force: true });
  } else {
    await resultAction.click({ force: true });
  }

  await expect
    .poll(
      async () => {
        if (await selectedLineItem.isVisible().catch(() => false)) {
          return true;
        }
        const rowClass = ((await lineItemRow.getAttribute('class').catch(() => '')) || '').toLowerCase();
        return rowClass.includes('selected') || rowClass.includes('active');
      },
      { timeout: 10000 }
    )
    .toBeTruthy();
}

async function clearSelectedInsightStudioLineItems(page: Page): Promise<void> {
  const modal = page.locator('app-report-builder-data-selection-modal').first();
  const removeSelectedButtons = modal
    .locator('.list-item.is-selected .action:visible, .list-item.is-selected [class*="remove"]:visible')
    .filter({ hasNotText: /^$/ });

  const count = await removeSelectedButtons.count().catch(() => 0);
  for (let index = 0; index < count; index += 1) {
    const button = removeSelectedButtons.nth(index);
    if (await button.isVisible().catch(() => false)) {
      await button.click({ force: true });
    }
  }
}

async function verifyInsightStudioLineItemAttached(
  page: Page,
  options: InsightStudioDataSourceOptions,
  lineItem: string
): Promise<void> {
  const noSelectionText = page.getByText(/No Line Items Selected/i).first();
  const lineItemAttachedText = page.getByText(new RegExp(lineItem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))).first();
  const dataSourceCard = katalonLocator(
    page,
    'Object Repository/Frontend/Insight Studio/Data Sources/Data Source Select Data Button',
    {
      index: String(options.index)
    }
  ).locator('xpath=ancestor::div[contains(@class,"parent-source")] | ancestor::div[contains(@class,"source")]').first();

  await expect
    .poll(
      async () => {
        if (await lineItemAttachedText.isVisible().catch(() => false)) {
          return 'attached';
        }
        if (await noSelectionText.isVisible().catch(() => false)) {
          return 'missing';
        }
        if (await dataSourceCard.isVisible().catch(() => false)) {
          const text = (await dataSourceCard.textContent().catch(() => '')) || '';
          if (text.includes(lineItem)) {
            return 'attached';
          }
          if (/No Line Items Selected/i.test(text)) {
            return 'missing';
          }
        }
        return 'waiting';
      },
      { timeout: 10000 }
    )
    .not.toBe('waiting');

  const cardText = ((await dataSourceCard.textContent().catch(() => '')) || '').trim();
  if (!(cardText.includes(lineItem)) && /No Line Items Selected/i.test(cardText)) {
    throw new Error(`Insight Studio line item "${lineItem}" was not attached to the datasource card after selection.`);
  }
}

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
    throw new Error('Unable to resolve Insight Studio route. Set ADDAPTIVE_FRONTEND_URL.');
  }

  return new URL(fallbackPath, frontendUrl).toString();
}

export async function openInsightStudio(page: Page): Promise<void> {
  const navLink = katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Navbar Insight Studio Link');
  if (await navLink.isVisible().catch(() => false)) {
    await navLink.click();
    await page.waitForLoadState('domcontentloaded');
    return;
  }

  const fallbackLink = page.getByRole('link', { name: /Insight Studio/i }).first();
  if (await fallbackLink.isVisible().catch(() => false)) {
    await fallbackLink.click();
    await page.waitForLoadState('domcontentloaded');
    return;
  }

  await page.goto(resolveFrontendRoute(page, '/insight-studio'), { waitUntil: 'domcontentloaded' });
}

export async function openInsightStudioReport(page: Page, options: InsightStudioReportOptions): Promise<void> {
  await openInsightStudio(page);

  const reportsLink = katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Navbar Reports Link');
  if (await reportsLink.isVisible().catch(() => false)) {
    await reportsLink.click();
    await page.waitForLoadState('domcontentloaded');
    await openInsightStudio(page);
  }

  if (options.reportAction === 'create') {
    const createReportButton = katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Create Report Button');
    if (await createReportButton.isVisible().catch(() => false)) {
      await createReportButton.click();
    } else {
      await page.goto(resolveFrontendRoute(page, '/insight-studio/create'), { waitUntil: 'domcontentloaded' });
    }

    await expect
      .poll(() => page.url(), { timeout: 15000 })
      .toContain('/insight-studio/create');

    if ((options.templateType || '').toLowerCase() === 'blank report') {
      await expect(
        katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Blank Report')
      ).toBeVisible({ timeout: 15000 });
      await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Blank Report').click();
    } else if (options.templateType) {
      const templateDropdown = katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Report Template Dropdown');
      await expect(templateDropdown).toBeVisible({ timeout: 15000 });
      await templateDropdown.selectOption({ label: options.templateType });
    }
    return;
  }

  if (!options.existingReportName) {
    throw new Error('Insight Studio edit requires existingReportName.');
  }

  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Report Searchbox').fill(options.existingReportName);
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/First Report Edit Button').click();
  await page.waitForLoadState('domcontentloaded');
}

export async function configureInsightStudioReport(page: Page, options: InsightStudioReportOptions): Promise<void> {
  if (options.enableItemizedReporting) {
    await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Create Report Settings/Create Report Settings Cog').click();
    await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Create Report Settings/Itemized Reporting Toggle').click();

    for (const tag of options.tagsToUse || []) {
      await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Create Report Settings/Export Name Tag', {
        tagName: tag
      }).click();
    }

    await katalonLocator(page, 'Object Repository/Frontend/Generic Modal Continue Button').click();
  }

  if (options.reportName) {
    await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Report Name Field').fill(options.reportName);
  }

  if (options.status) {
    const statusCheckbox = katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Status Checkbox');
    if (await statusCheckbox.isVisible().catch(() => false)) {
      await statusCheckbox.click();
    }
  }

  if (options.fileTypes && options.fileTypes.length > 0) {
    await configureInsightStudioFileTypes(page, options.fileTypes);
  }

  if (options.cadence) {
    await configureInsightStudioCadence(page, options.cadence);
  }
}

async function configureInsightStudioFileTypes(page: Page, fileTypes: string[]): Promise<void> {
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/File Type Dropdown').click();

  if (fileTypes.length === 1 && fileTypes[0].toLowerCase() === 'all') {
    await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/File Type Dropdown LI', {
      fileType: 'multiselect-select-all'
    }).click();
    return;
  }

  const selectAll = katalonLocator(page, 'Object Repository/Frontend/Insight Studio/File Type Dropdown LI', {
    fileType: 'multiselect-select-all'
  });
  await selectAll.click();
  await selectAll.click();

  for (const fileType of fileTypes) {
    await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/File Type Dropdown LI', {
      fileType: fileType.toUpperCase()
    }).click();
  }
}

async function configureInsightStudioCadence(page: Page, cadence: string): Promise<void> {
  const cadenceArr = cadence.split('|');
  const cadenceType = cadenceArr[0];
  const cadenceDropdown = katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Report Cadences/Report Cadence Dropdown');
  const cadenceTimeInput = katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Report Cadences/Cadence Time Input');
  const cadenceDateInput = katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Report Cadences/Cadence Date Input');
  const stopSendingInput = katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Report Cadences/Cadence Stop Sending Input');
  const cadenceDayDropdown = katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Report Cadences/Cadence Day Dropdown');
  const cadenceDayOfMonthDropdown = katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Report Cadences/Cadence Day of Month Dropdown');

  switch (cadenceType) {
    case '1':
      await cadenceDropdown.selectOption({ label: 'Immediate' });
      break;
    case '2':
      await cadenceDropdown.selectOption({ label: 'One-time' });
      if (cadenceArr[1]) {
        await cadenceTimeInput.fill(cadenceArr[1]);
      }
      if (cadenceArr[2]) {
        await cadenceDateInput.fill(cadenceArr[2]);
      }
      break;
    case '3':
      await cadenceDropdown.selectOption({ label: 'Daily' });
      if (cadenceArr[1]) {
        await cadenceTimeInput.fill(cadenceArr[1]);
      }
      if (cadenceArr[2]) {
        await stopSendingInput.fill(cadenceArr[2]);
      }
      break;
    case '4':
      await cadenceDropdown.selectOption({ label: 'Weekly' });
      if (cadenceArr[1]) {
        await cadenceTimeInput.fill(cadenceArr[1]);
      }
      if (cadenceArr[2]) {
        await stopSendingInput.fill(cadenceArr[2]);
      }
      if (cadenceArr[3]) {
        await cadenceDayDropdown.selectOption({ label: cadenceArr[3] });
      }
      break;
    case '5':
      await cadenceDropdown.selectOption({ label: 'Biweekly' });
      if (cadenceArr[1]) {
        await cadenceTimeInput.fill(cadenceArr[1]);
      }
      if (cadenceArr[2]) {
        await stopSendingInput.fill(cadenceArr[2]);
      }
      if (cadenceArr[3]) {
        await cadenceDayDropdown.selectOption({ label: cadenceArr[3] });
      }
      break;
    case '6':
      await cadenceDropdown.selectOption({ label: 'Monthly' });
      if (cadenceArr[1]) {
        await cadenceTimeInput.fill(cadenceArr[1]);
      }
      if (cadenceArr[2]) {
        await stopSendingInput.fill(cadenceArr[2]);
      }
      if (cadenceArr[3]) {
        await cadenceDayOfMonthDropdown.selectOption({ label: cadenceArr[3] });
      }
      break;
    case '7':
      await cadenceDropdown.selectOption({ label: 'Business Days' });
      if (cadenceArr[1]) {
        await cadenceTimeInput.fill(cadenceArr[1]);
      }
      if (cadenceArr[2]) {
        await stopSendingInput.fill(cadenceArr[2]);
      }
      break;
    default:
      throw new Error(`Unsupported Insight Studio cadence type: ${cadenceType}`);
  }
}

export async function saveInsightStudioReport(page: Page): Promise<void> {
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Save Report Button').click();
  const confirmImmediate = katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Confirm Immediate Report Btn');
  if (await confirmImmediate.isVisible().catch(() => false)) {
    await confirmImmediate.click();
  }
}

export async function modifyInsightStudioWidget(page: Page, options: InsightStudioWidgetOptions): Promise<void> {
  const insightRow = loadInsightStudioCaseData();

  const editorAlreadyVisible = await isWidgetEditorVisible(page);

  if (options.action === 'add' && !editorAlreadyVisible) {
    const addNewWidgetButton = visibleAddWidgetButton(page);
    await expect(addNewWidgetButton).toBeVisible({ timeout: 15000 });
    await addNewWidgetButton.scrollIntoViewIfNeeded();
    await addNewWidgetButton.click({ force: true });
  } else if (options.action === 'edit') {
    await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Widgets/Edit Widget Icon', {
      index: (options.widgetIndex ?? 1) - 1
    }).click();
  } else {
    await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Widgets/Delete Widget Icon', {
      index: (options.widgetIndex ?? 1) - 1
    }).click();
    await katalonLocator(page, 'Object Repository/Frontend/Generic/Generic Modal').click();
    return;
  }

  if (config.pauseAtEnd && insightRow?.id === '9') {
    await page.pause();
  }

  await waitForWidgetEditor(page, 20000);

  if (options.dataSource) {
    await widgetDataSourceDropdown(page).selectOption({
      label: options.dataSource
    });
  }
  if (options.widgetType) {
    await widgetTypeDropdown(page).selectOption({
      label: options.widgetType
    });
  }

  if (options.dimension) {
    const widgetType = (options.widgetType || '').toLowerCase();
    if (widgetType === 'pie' || widgetType === 'bar') {
      await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Widgets/Widget Dimension Dropdown').selectOption({
        label: options.dimension
      });
    } else {
      await clickWidgetSelectionItem(katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Widgets/Widget Dimension Multiselector', {
        dimensionName: options.dimension
      }));
    }
  }

  if (options.metric) {
    const widgetType = (options.widgetType || '').toLowerCase();
    if (widgetType === 'pie' || widgetType === 'bar') {
      await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Widgets/Widget Metric Dropdown').selectOption({
        label: options.metric
      });
    } else {
      await clickWidgetSelectionItem(katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Widgets/Widget Metrics Multiselector', {
        metricName: options.metric
      }));
    }
  }

  if (options.content) {
    await page.frameLocator('iframe').locator('body').fill(options.content);
  }

  await widgetApplyButton(page).click();
}

export async function configureInsightStudioExportTargets(
  page: Page,
  options: InsightStudioExportTargetOptions[]
): Promise<void> {
  for (const option of options) {
    if (option.action === 'delete') {
      continue;
    }

    await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Export Targets/Add Export Target Button').click();

    if (option.targetType) {
      await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Export Targets/Export Target Type Dropdown', {
        index: String(option.index)
      }).selectOption({ label: option.targetType });
    }
  }
}

export async function configureInsightStudioRecipients(page: Page, recipients: string[]): Promise<void> {
  for (const recipient of recipients) {
    const [, email = recipient] = recipient.split(':').map((value) => value.trim());
    if (!email) {
      continue;
    }

    const input = recipientInput(page);
    const addButton = addRecipientButton(page);

    await input.scrollIntoViewIfNeeded();
    await expect(input).toBeVisible({ timeout: 15000 });
    await input.click();
    await input.fill(email);
    await expect(addButton).toBeVisible({ timeout: 15000 });
    await addButton.click();
    await expect(page.getByText(new RegExp(email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))).first()).toBeVisible({
      timeout: 15000
    });
  }
}

export async function configureInsightStudioDataSource(
  page: Page,
  options: InsightStudioDataSourceOptions
): Promise<void> {
  const insightRow = loadInsightStudioCaseData();

  if (options.action === 'delete') {
    return;
  }

  if (options.dataSourceType && options.action === 'add' && options.index > 0) {
    await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Data Source Type Dropdown', {
      index: String(options.index)
    }).selectOption({ label: options.dataSourceType });
  }

  if (options.dateRange) {
    await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Data Source Date Range Dropdown', {
      index: String(options.index)
    }).selectOption({ label: options.dateRange });
  }

  if ((options.dataSelectionType || '').toLowerCase() === 'line item selection') {
    await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Data Source Select Data Button', {
      index: String(options.index)
    }).click();

    await clearSelectedInsightStudioLineItems(page);

    const lineItemSearch = katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Data Selection Line Item Search Input');
    for (const lineItem of options.lineItems) {
      await lineItemSearch.fill(lineItem);
      if (config.pauseAtEnd && insightRow?.id === '9') {
        await page.pause();
      }
      await selectInsightStudioLineItem(page, lineItem);
    }

    await katalonLocator(
      page,
      'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/Data Selection Continue Button'
    ).click();

    for (const lineItem of options.lineItems) {
      await verifyInsightStudioLineItemAttached(page, options, lineItem);
    }
  }
}

export async function openInsightStudioCustomizeTab(page: Page): Promise<void> {
  const customizeTab = katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Customize Report Tab');
  await expect
    .poll(async () => {
      const className = (await customizeTab.getAttribute('class').catch(() => '')) || '';
      return !className.toLowerCase().includes('disabled');
    }, { timeout: 15000 })
    .toBeTruthy();
  await customizeTab.click();
}
