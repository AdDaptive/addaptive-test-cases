import { test } from '../../../../fixtures/session';
import { katalonLocator } from '../../../../locators/resolve';

test('Submit Order', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/button_SplitsAllocationDivideEqually').click();
  // TODO: convert nested Katalon test case call: Frontend/Orders/Splits Tab/Allocation By Group Number
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/button_SplitsAllocationDivideEqually').click();
  // TODO: convert nested Katalon test case call: Frontend/Orders/Splits Tab/Allocation By Group Number
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Splits-Tab/Allocation-Modal/button_SplitsAllocationContinue').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Submit-Order/button_PopupMessageNoAudienceContinue').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Orders/Submit Order
});
