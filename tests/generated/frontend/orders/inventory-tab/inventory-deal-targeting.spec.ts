import { test } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Inventory (Deal Targeting)', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Deal Targeting/button_InventoryDealTargetingEdit').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Deal Targeting/span_InventoryDealTargetingInclude').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Deal Targeting/span_InventoryDealTargetingExclude').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryDealTargetingDealType').selectOption({ label: String('') });
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Deal Targeting/button_InventoryDealTargetingContinue').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Orders/Inventory Tab/Inventory (Deal Targeting)
});
