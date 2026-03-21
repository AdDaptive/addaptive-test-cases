import { test, expect } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('BudgetFlight (Pacing Percentage)', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/a_BudgetFlightTab').click();
  await expect(katalonLocator(page, 'Object Repository/Frontend/Order-Entry/BudgetFlight-Tab/span_BudgetFlightPacingPercentage')).toHaveText(String(''));
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Orders/Budget Flight Tab/BudgetFlight (Pacing Percentage)
});
