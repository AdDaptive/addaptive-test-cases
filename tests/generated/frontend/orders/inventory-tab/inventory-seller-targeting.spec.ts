import { test } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Inventory (Seller Targeting)', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Seller/button_InventorySellerTargetingEdit').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Seller/button_InventorySellerTargetingInclude').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Seller/button_InventorySellerTargetingExclude').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventorySellerTargetingSearch').fill('');
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/input_InventorySellerTargetingSearch').pressSequentially(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Inventory-Tab/Inventory Seller/button_InventorySellerTargetingContinue').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Orders/Inventory Tab/Inventory (Seller Targeting)
});
