import { test } from '../../fixtures/session';
import { openOrderEntryPage, verifyOrderEntryPrimaryTabs } from '../../pages/order-entry';
import { config } from '../../utils/config';

test('frontend: order entry primary tabs render', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await loginAsDefaultUser();

  if (config.orderEntryUseImpersonation) {
    await impersonateConfiguredUser();
  }

  await openOrderEntryPage(page);
  await verifyOrderEntryPrimaryTabs(page);
});
