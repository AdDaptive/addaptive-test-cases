import { test } from '../../fixtures/session';
import { openOrderEntryPage, verifyOrderEntrySubmitControls } from '../../pages/order-entry';
import { config } from '../../utils/config';

test('frontend: order entry submit controls are available', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await loginAsDefaultUser();

  if (config.orderEntryUseImpersonation) {
    await impersonateConfiguredUser();
  }

  await openOrderEntryPage(page);
  await verifyOrderEntrySubmitControls(page);
});
