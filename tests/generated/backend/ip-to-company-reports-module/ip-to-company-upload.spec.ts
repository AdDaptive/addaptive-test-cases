import { test } from '../../../../fixtures/session';
import { katalonLocator } from '../../../../locators/resolve';

test('IP to Company Upload', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  // TODO: Katalon opened a fresh browser instance here.
  await page.goto("https://ali.addaptive.com/dpm/admin/ip-to-company-report");
  await katalonLocator(page, 'Object Repository/Backend/Authentication/Login/Login Username Input').fill(String(process.env.KATALON_USER_NAME_FRONTEND || ''));
  await katalonLocator(page, 'Object Repository/Backend/Authentication/Login/Login Password Input').fill(String(process.env.KATALON_USER_PASSWORD_FRONTEND || ''));
  // TODO: verify encrypted Katalon secrets are replaced with plaintext env vars.
  await katalonLocator(page, 'Object Repository/Backend/Authentication/Login/Login Button').click();
  await katalonLocator(page, 'Object Repository/Backend/IP To Company Upload/Page_IP to Company Report/a_Submit Request').waitFor({ state: 'visible' });
  await katalonLocator(page, 'Object Repository/Backend/IP To Company Upload/Page_IP to Company Report/a_Submit Request').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Backend/IP to Company Reports Module/IP to Company Upload
});
