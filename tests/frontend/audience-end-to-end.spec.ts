import { test } from '../../fixtures/session';
import { runAudienceEndToEnd, shouldPauseAtEnd } from './audience-end-to-end.helpers';

test.afterEach(async ({ page }, testInfo) => {
  if (shouldPauseAtEnd() && testInfo.status !== testInfo.expectedStatus) {
    await page.pause();
  }
});

test('frontend: audience creation end-to-end flow is scriptable', async ({
  page,
  loginAsDefaultUser,
  impersonateConfiguredUser
}) => {
  await runAudienceEndToEnd(page, loginAsDefaultUser, impersonateConfiguredUser);
});
