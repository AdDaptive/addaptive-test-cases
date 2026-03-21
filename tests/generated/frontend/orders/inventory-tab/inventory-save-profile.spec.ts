import { test } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Inventory (Save Profile)', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventorySaveProfile').waitFor({ state: 'visible' });
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/button_InventorySaveProfile').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventoryGeoProfileName').pressSequentially(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/a_InventoryGeoProfileNameSave').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Orders/Inventory Tab/Inventory (Save Profile)
});
