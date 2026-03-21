import { test } from '../../../../fixtures/session';
import { katalonLocator } from '../../../../locators/resolve';

test('Create Modify User', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Users/Create User Button').click();
  await katalonLocator(page, 'Object Repository/Frontend/Users/Manage Users Search').fill(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Users/First Name Input').fill(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Users/Last Name Input').fill(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Users/Email Input').fill(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Users/Password Input').fill(String(process.env.ADDAPTIVE_FRONTEND_PASSWORD || ''));
  await katalonLocator(page, 'Object Repository/Frontend/Users/Password Confirmation Input').fill(String(process.env.ADDAPTIVE_FRONTEND_PASSWORD || ''));
  await katalonLocator(page, 'Object Repository/Frontend/Users/Submit User Button').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Users/Create Modify User
});
