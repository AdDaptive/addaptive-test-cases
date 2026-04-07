import { test } from '../../fixtures/session';
import { openOrderEntryPage, verifyOrderEntryPrimaryTabs } from '../../pages/order-entry';
import { config } from '../../utils/config';
import { env } from '../../utils/env';
import { requireOrderEntryFlowValues } from '../../utils/order-entry-db';
import { shouldUseOrderEntryImpersonation } from '../../utils/auth-config';

test('frontend: order entry primary tabs render', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  const flowValues = requireOrderEntryFlowValues();
  await loginAsDefaultUser();

  if (shouldUseOrderEntryImpersonation({ impersonateUserProfile: flowValues.impersonateUserProfile }, [env.impersonateUser, env.orderEntryImpersonateUser])) {
    await impersonateConfiguredUser();
  }

  await openOrderEntryPage(page);
  await verifyOrderEntryPrimaryTabs(page);
});
