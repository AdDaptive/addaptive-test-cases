import { test } from '../../fixtures/session';
import { createSplit, deleteSplit, editSplit, openOrderEntryPage, saveOrderAsDraft, verifySplitGroupCount } from '../../pages/order-entry';
import { requireOrderEntrySplitValues } from '../../utils/order-entry-db';
import { config } from '../../utils/config';

test('frontend: order entry splits tab is scriptable', async ({
  page,
  loginAsDefaultUser,
  impersonateConfiguredUser
}) => {
  const dbValues = requireOrderEntrySplitValues();

  await loginAsDefaultUser();

  if (config.orderEntryUseImpersonation) {
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
