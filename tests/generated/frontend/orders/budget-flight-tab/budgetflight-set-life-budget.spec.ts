import { test } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('BudgetFlight (Set Life Budget)', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/span_Pacing_budget-flight-pacing-settings-cog').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/span_Pacing_budget-flight-pacing-settings-cog').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Orders/Budget Flight Tab/BudgetFlight (Set Life Budget)
});
