import { test } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Splits Tab', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/a_Splits_Tab').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/Splits Settings Cog').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/AppNexus LineItem Targeting Label').click();
  // TODO: convert nested Katalon test case call: Frontend/Orders/Splits Tab/Add Modify Split
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Orders/Splits Tab/Splits Tab
});
