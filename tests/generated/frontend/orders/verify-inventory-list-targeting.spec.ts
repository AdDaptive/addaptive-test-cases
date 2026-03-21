import { test } from '../../../../fixtures/session';
import { katalonLocator } from '../../../../locators/resolve';

test('Verify Inventory List Targeting', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventoryInventoryListTargetingEdit').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryInventoryListTargetingType').selectOption({ label: String("Exclusion List") });
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/select_InventoryInventoryListTargetingType').selectOption({ label: String("Inclusion List") });
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventoryInventoryListTargetingContinue').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Orders/Verify Inventory List Targeting
});
