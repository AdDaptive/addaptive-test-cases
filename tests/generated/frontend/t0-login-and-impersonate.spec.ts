import { test } from '../../../fixtures/session';

test('T0 - Login and Impersonate', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await loginAsDefaultUser();
  await impersonateConfiguredUser();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/T0 - Login and Impersonate
});
