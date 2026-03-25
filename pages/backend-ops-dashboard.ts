import { expect, type Page } from '@playwright/test';
import { katalonLocator } from '../locators/resolve';
import { config } from '../utils/config';

function resolveBackendRoute(page: Page, fallbackPath: string): string {
  const currentUrl = page.url();
  if (currentUrl) {
    try {
      return new URL(fallbackPath, currentUrl).toString();
    } catch {
      // fall through
    }
  }

  if (!config.backendUrl) {
    throw new Error('ADDAPTIVE_BACKEND_URL is required to open the Ops Dashboard.');
  }

  return new URL(fallbackPath, config.backendUrl).toString();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findLineItemRow(page: Page, lineItemName: string) {
  return page
    .locator('table tbody tr')
    .filter({ has: page.getByRole('link', { name: lineItemName, exact: true }) })
    .first();
}

async function applyFilter(page: Page): Promise<void> {
  const applyButton = page.locator('input[type="submit"][value="Apply Filters"]').first();
  await applyButton.click();
  await waitForOpsDashboardIdle(page);
}

export async function waitForOpsDashboardIdle(page: Page): Promise<void> {
  const loader = katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/Ops Dashboard Filter Loader');
  await loader.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => undefined);
  await page.waitForLoadState('domcontentloaded').catch(() => undefined);
}

export async function openOpsDashboard(page: Page): Promise<void> {
  const adminBackendLink = page.getByRole('link', { name: /Admin Backend/i }).first();
  if (await adminBackendLink.isVisible().catch(() => false)) {
    await adminBackendLink.click();
    await page.waitForLoadState('domcontentloaded').catch(() => undefined);
  } else if (/ali\.addaptive\.com/i.test(page.url()) && !/\/admin\//i.test(page.url())) {
    await page.goto(resolveBackendRoute(page, '/admin/dashboard'), { waitUntil: 'domcontentloaded' });
  }

  const opsLink = page.getByRole('link', { name: /Ops Dashboard/i }).first();
  if (await opsLink.isVisible().catch(() => false)) {
    await opsLink.click();
  } else {
    await page.goto(resolveBackendRoute(page, '/dpm/admin/ops-dashboard'), { waitUntil: 'domcontentloaded' });
  }

  await expect(page).toHaveURL(/ops-dashboard/i);
  await waitForOpsDashboardIdle(page);
}

export async function makeAllColumnsVisible(page: Page): Promise<void> {
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/Visible Columns Modal/Visible Columns Modal Toggle').click();
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/Visible Columns Modal/Visible Columns Modal Searchbox').waitFor({
    state: 'visible'
  });
  await page.getByRole('link', { name: 'All', exact: true }).click();
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/Visible Columns Modal/Visible Columns Save Changes Button').click();
  await waitForOpsDashboardIdle(page);
}

export async function clearAllFilters(page: Page): Promise<void> {
  const resetButton = page.locator('input.grid-search-reset, input[type="reset"]').first();
  if (await resetButton.isVisible().catch(() => false)) {
    await resetButton.click();
    await waitForOpsDashboardIdle(page);
  }
}

export async function filterByColumn(page: Page, columnName: string, values: string[]): Promise<void> {
  await page.locator('#filter-toolbar button.dropdown-toggle').click();
  await page.locator('#filter-toolbar a.filter-list-item', { hasText: new RegExp(`^${escapeRegExp(columnName)}$`) }).click();

  const inputs = page
    .locator(`#filterCollapse label:text-is("${columnName}")`)
    .locator('xpath=following-sibling::div[contains(@class, "control-filters")]//input[contains(@class,"grid-filter-input-query-from")]');

  for (let index = 0; index < values.length; index += 1) {
    if (index > 0) {
      await page
        .locator(`#filterCollapse label:text-is("${columnName}")`)
        .locator('xpath=following-sibling::div[contains(@class, "control-filters")]//button[contains(@class,"grid-filter-box-add")]')
        .click();
    }

    const input = inputs.nth(index);
    await input.fill('');
    await input.fill(values[index]);
  }

  await applyFilter(page);
}

export async function waitForLineItem(page: Page, lineItemName: string): Promise<void> {
  const row = findLineItemRow(page, lineItemName);
  const checkbox = row.locator('input[type="checkbox"]').first();
  const syncIcon = row.locator('[title*="Line Item is being processed"], .fa-sync, [data-icon="sync"]').first();
  if (process.env.ADDAPTIVE_PAUSE_AT_END === 'true') {
    await page.pause();
  }

  if (!(await row.isVisible().catch(() => false))) {
    throw new Error(`Line item "${lineItemName}" was not found on the Ops Dashboard after filtering.`);
  }

  for (let attempt = 0; attempt < 90; attempt += 1) {
    if (await checkbox.isVisible().catch(() => false)) {
      return;
    }

    if (!(await row.isVisible().catch(() => false))) {
      throw new Error(`Line item "${lineItemName}" disappeared from the Ops Dashboard while waiting for processing to finish.`);
    }

    if (await syncIcon.isVisible().catch(() => false)) {
      await page.waitForTimeout(10000);
      await applyFilter(page);
      continue;
    }

    await page.waitForTimeout(3000);
    await applyFilter(page);
  }

  throw new Error(`Line item "${lineItemName}" never became editable on the Ops Dashboard after processing.`);
}

export async function selectLineItems(page: Page, lineItemNames: string[]): Promise<void> {
  for (const lineItemName of lineItemNames) {
    const checkbox = findLineItemRow(page, lineItemName).locator('input[type="checkbox"]').first();
    await checkbox.check({ force: true });
  }
}

export async function readDailyBudget(page: Page, lineItemName: string): Promise<string> {
  const value = katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/Line Item Columns/AP Daily Budget/AP Daily Budget Span', {
    lineItemName
  });
  return ((await value.textContent()) || '').trim();
}

export async function editDailyBudget(page: Page, lineItemName: string, newValue: string): Promise<void> {
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/LineItemsList/svg_OpsDashboard_LineItemList_APDailyBudget_EditButton', {
    lineItemName
  }).click();
  const input = katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/LineItemsList/input_OpsDashboard_LineItemList_APDailyBudgetEdit', {
    lineItemName
  });
  await input.fill('');
  await input.pressSequentially(newValue, { delay: 20 });
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/LineItemsList/button_OpsDashboard_LineItemList_APDailyBudgetValue_Save', {
    lineItemName
  }).click();
  await waitForOpsDashboardIdle(page);
}

export async function readLifeBudget(page: Page, lineItemName: string): Promise<string> {
  const value = katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/LineItemsList/span_OpsDashboard_LineItemList_APLifeBudgetValue', {
    lineItemName
  });
  return ((await value.textContent()) || '').trim();
}

export async function editLifeBudget(page: Page, lineItemName: string, newValue: string): Promise<void> {
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/LineItemsList/svg_OpsDashboard_LineItemList_APLifeBudget_EditButton', {
    lineItemName
  }).click();
  const input = katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/LineItemsList/input_OpsDashboard_LineItemList_APLifeBudgetEdit', {
    lineItemName
  });
  await input.fill('');
  await input.pressSequentially(newValue, { delay: 20 });
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/LineItemsList/button_OpsDashboard_LineItemList_APLifeBudgetValue_Save', {
    lineItemName
  }).click();
  await waitForOpsDashboardIdle(page);
}

export async function readPacingPercentage(page: Page, lineItemName: string): Promise<string> {
  const value = katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/Line Item Columns/Pacing Percentage/Pacing Percentage TD', {
    lineItemName
  });
  return ((await value.textContent()) || '').trim();
}

export async function editPacingPercentage(page: Page, lineItemName: string, newValue: string): Promise<void> {
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/LineItemsList/svg_OpsDashboard_LineItemList_PacingPercentage_EditButton', {
    lineItemName
  }).click();
  const input = katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/LineItemsList/input_OpsDashboard_LineItemList_PacingPercentageEdit', {
    lineItemName
  });
  await input.fill('');
  await input.pressSequentially(newValue, { delay: 20 });
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/LineItemsList/button_OpsDashboard_LineItemList_PacingPercentage_Save', {
    lineItemName
  }).click();
  await waitForOpsDashboardIdle(page);
}

export async function runMassAction(page: Page, action: 'delete' | 'resync'): Promise<void> {
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/MassAction/select_OpsDashboard_MassAction_Selection').selectOption({
    label: action === 'delete' ? 'Delete' : 'Re-sync'
  });
  const dialogPromise = page.waitForEvent('dialog', { timeout: 5000 }).catch(() => null);
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/MassAction/input_OpsDashboard_MassAction_Submit').click();
  const dialog = await dialogPromise;
  if (dialog) {
    await dialog.accept().catch(() => undefined);
  }
  await waitForOpsDashboardIdle(page);
}

export async function verifySyncIcon(page: Page, lineItemName: string): Promise<void> {
  await expect(
    katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/Line Item Columns/Resync/Sync Icon', { lineItemName })
  ).toBeVisible();
}

export async function addUserNote(page: Page, lineItemName: string, note: string): Promise<void> {
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/Line Item Columns/Has Notes/Has Notes Modal Link', {
    lineItemName
  }).click();
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/Line Item Columns/Has Notes/Has Notes Modal Textarea').fill(note);
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/Line Item Columns/Has Notes/Save Note Button').click();
  await expect(
    katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/Line Item Columns/Has Notes/User Notes Table Note Column TD', {
      userNotes: note
    })
  ).toBeVisible();
}
