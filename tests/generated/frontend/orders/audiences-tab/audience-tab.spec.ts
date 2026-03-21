import { test } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Audience Tab', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/a_Audience_Tab').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/button_Audience_Include').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/AudienceTab/button_SplitsAudienceInclude').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Audience-Tab/button_Audience_Exclude').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/AudienceTab/button_SplitsAudienceExclude').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Orders/Audiences Tab/Audience Tab
});
