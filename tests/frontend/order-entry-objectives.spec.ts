import { test } from '../../fixtures/session';
import { openOrderEntryPage, verifyOrderEntryObjectivesTab } from '../../pages/order-entry';
import { config } from '../../utils/config';

test('frontend: order entry objectives tab is scriptable', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await loginAsDefaultUser();

  if (config.orderEntryUseImpersonation) {
    await impersonateConfiguredUser();
  }

  await openOrderEntryPage(page);
  await verifyOrderEntryObjectivesTab(page);
});
