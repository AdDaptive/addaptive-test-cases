import { test } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Inventory (Targeting Admin)', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/a_InventoryTargetingAdminGear').click();
  // TODO: manual conversion required for Katalon switch/case logic.
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/crossDevice_On').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/CrossDeviceActivation_dropdown').selectOption({ label: String('') });
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/crossDevice_Off').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/a_InventoryTargetingAdminGear').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Orders/Inventory Tab/Inventory (Targeting Admin)
});
