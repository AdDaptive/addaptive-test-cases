import { test } from '../../fixtures/session';
import { runQueuedOrderEntryValidations } from '../../utils/order-entry-validation';

test('frontend: run queued order entry validations', async ({ request }) => {
  await runQueuedOrderEntryValidations(request);
});
