import { test } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Inventory (Brand Safty Targeting)', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventoryBrandSaftyTargetingEdit').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryBrandSafetyTargetingSupplier').selectOption({ label: String('') });
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryBrandSafetyTargetingSearch').pressSequentially(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventoryBrandSafetyTargetingContinue').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Orders/Inventory Tab/Inventory (Brand Safty Targeting)
});
