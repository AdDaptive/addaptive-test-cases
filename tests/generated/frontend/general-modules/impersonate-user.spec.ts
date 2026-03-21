import { test } from '../../../../fixtures/session';
import { katalonLocator } from '../../../../locators/resolve';

test('Impersonate User', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Impersonate-User/img_impersonate svg icon').waitFor({ state: 'visible' });
  await katalonLocator(page, 'Object Repository/Frontend/Impersonate-User/img_impersonate svg icon').click();
  await katalonLocator(page, 'Object Repository/Frontend/Impersonate-User/input_ImpersonateUserEmail').fill(String(process.env.ADDAPTIVE_IMPERSONATE_USER || ''));
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/General Modules/Impersonate User
});
