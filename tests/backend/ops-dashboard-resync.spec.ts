import { test } from '@playwright/test';
import { loginToBackend } from '../../pages/backend-auth';
import {
  filterByColumn,
  openOpsDashboard,
  runMassAction,
  selectLineItems,
  verifySyncIcon,
  waitForLineItem
} from '../../pages/backend-ops-dashboard';
import { createOpsDashboardSeedOrders } from '../../pages/ops-dashboard-order-setup';
import { config } from '../../utils/config';
import { requireOpsDashboardResyncCase, resolveSelectedOpsDashboardTable } from '../../utils/ops-dashboard-db';

test('backend: ops dashboard resync mass action is scriptable', async ({ page }) => {
  test.setTimeout(180000);
  test.skip(resolveSelectedOpsDashboardTable() !== 'resync', 'Set ADDAPTIVE_OPS_DASHBOARD_TABLE=resync to run this spec.');

  const row = requireOpsDashboardResyncCase();

  await createOpsDashboardSeedOrders(page, row.seed);
  await page.context().clearCookies();
  await page.goto('about:blank');
  await loginToBackend(page, config.loginUser, config.loginPassword, new URL('/admin/dashboard', config.backendUrl).toString());
  await openOpsDashboard(page);
  await filterByColumn(page, 'Line Item Name', row.seed.lineItemNames);

  for (const lineItemName of row.seed.lineItemNames) {
    await waitForLineItem(page, lineItemName);
  }

  await selectLineItems(page, row.seed.lineItemNames);
  await runMassAction(page, 'resync');

  for (const lineItemName of row.seed.lineItemNames) {
    await verifySyncIcon(page, lineItemName);
  }
});
