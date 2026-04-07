import { test } from '../../fixtures/session';
import { createSplit, deleteSplit, editSplit, openOrderEntryPage, saveOrderAsDraft, verifySplitGroupCount } from '../../pages/order-entry';
import { requireOrderEntryFlowValues, requireOrderEntrySplitValues } from '../../utils/order-entry-db';
import { config } from '../../utils/config';
import { env } from '../../utils/env';
import { shouldUseOrderEntryImpersonation } from '../../utils/auth-config';

test('frontend: order entry splits tab is scriptable', async ({
  page,
  loginAsDefaultUser,
  impersonateConfiguredUser
}) => {
  const dbValues = requireOrderEntrySplitValues();
  const flowValues = requireOrderEntryFlowValues();

  await loginAsDefaultUser();

  if (shouldUseOrderEntryImpersonation({ impersonateUserProfile: flowValues.impersonateUserProfile }, [env.impersonateUser, env.orderEntryImpersonateUser])) {
    await impersonateConfiguredUser();
  }

  await openOrderEntryPage(page);
  await createSplit(page, {
    name: dbValues.splitName || 'Playwright Split',
    bidModifiers: undefined,
    status: undefined,
    iabViewabilityRate:
      undefined
  });

  if (false) {
    await editSplit(page, 1, {
      name: '',
      bidModifiers: undefined
    });
  }

  await verifySplitGroupCount(page, 1);

  if (false) {
    await deleteSplit(page, 1);
  }

  if (config.orderEntrySaveDraft) {
    await saveOrderAsDraft(page);
  }
});
