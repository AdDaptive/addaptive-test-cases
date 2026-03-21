import { test } from '../../../../fixtures/session';
import { katalonLocator } from '../../../../locators/resolve';

test('CreateInventoryList', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Lists-InventoryList/a_Lists').click();
  await katalonLocator(page, 'Object Repository/Frontend/Lists-InventoryList/a_Lists_InventoryLists').click();
  await katalonLocator(page, 'Object Repository/Frontend/Lists-InventoryList/a_Lists_InventoryLists_Create_an_Inventory_List').click();
  await katalonLocator(page, 'Object Repository/Frontend/Lists-InventoryList/button_Lists_InventoryLists_AdServer_PMP').click();
  await katalonLocator(page, 'Object Repository/Frontend/Lists-InventoryList/button_Lists_InventoryLists_AdServer_DPM').click();
  await katalonLocator(page, 'Object Repository/Frontend/Lists-InventoryList/input_Lists_InvetoryLists_PMP_ListName').pressSequentially(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Lists-InventoryList/button_Lists_InventoryLists_InclusionList').click();
  await katalonLocator(page, 'Object Repository/Frontend/Lists-InventoryList/button_Lists_InventoryLists_ExclusionList').click();
  await katalonLocator(page, 'Object Repository/Frontend/Lists-InventoryList/input_Lists_InventoryLists_FileUpload').setInputFiles(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Lists-InventoryList/button_Lists_InventoryLists_SaveList').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/InventoryLists Modules/CreateInventoryList
});
