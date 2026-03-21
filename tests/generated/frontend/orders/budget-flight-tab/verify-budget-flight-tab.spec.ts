import { test } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Verify Budget Flight Tab', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/a_BudgetFlightTab').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/span_BudgetFlight_AdminSettings').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/a_BudgetFlightSwitchToDailyBudget').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/span_Pacing_budget-flight-pacing-settings-cog').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/span_Pacing_budget-flight-pacing-settings-cog').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Orders/Budget Flight Tab/Verify Budget Flight Tab
});
