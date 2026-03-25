import { expect, test } from '@playwright/test';
import { loginToBackend } from '../../pages/backend-auth';
import {
  editDailyBudget,
  filterByColumn,
  makeAllColumnsVisible,
  openOpsDashboard,
  readDailyBudget,
  runMassAction,
  selectLineItems,
  waitForLineItem
} from '../../pages/backend-ops-dashboard';
import { createOpsDashboardSeedOrders } from '../../pages/ops-dashboard-order-setup';
import { config } from '../../utils/config';
import { requireOpsDashboardDailyBudgetCase, resolveSelectedOpsDashboardTable } from '../../utils/ops-dashboard-db';

test('backend: ops dashboard daily budget can be edited', async ({ page }) => {
  test.setTimeout(1200000);
  test.skip(resolveSelectedOpsDashboardTable() !== 'daily-budget', 'Set ADDAPTIVE_OPS_DASHBOARD_TABLE=daily-budget to run this spec.');

  const row = requireOpsDashboardDailyBudgetCase();

  try {
    await createOpsDashboardSeedOrders(page, row.seed);
    await page.context().clearCookies();
    await page.goto('about:blank');
    await loginToBackend(page, config.loginUser, config.loginPassword, new URL('/admin/dashboard', config.backendUrl).toString());
    await openOpsDashboard(page);

    await makeAllColumnsVisible(page);
    await filterByColumn(page, 'Line Item Name', row.seed.lineItemNames);

    for (const lineItemName of row.seed.lineItemNames) {
      await waitForLineItem(page, lineItemName);
      await expect(await readDailyBudget(page, lineItemName)).toBe(row.apDailyBudget);
      await editDailyBudget(page, lineItemName, row.apDailyBudgetNew);
      await waitForLineItem(page, lineItemName);
      await expect(await readDailyBudget(page, lineItemName)).toBe(row.apDailyBudgetNew);
    }
  } finally {
    try {
      await filterByColumn(page, 'Line Item Name', row.seed.lineItemNames);
      await selectLineItems(page, row.seed.lineItemNames);
      await runMassAction(page, 'delete');
    } catch {
      // cleanup is best-effort for generated line items
    }
  }
});
