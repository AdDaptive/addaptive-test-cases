import { test } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Save Settings', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/a_Audiences_SaveSettingsTab').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_SegmentName').fill('');
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_SegmentName').pressSequentially(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_ExpirationDate').fill('');
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_ExpirationDate').pressSequentially(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_SegmentName').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/International Targeting Yes Button').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/International Targeting No Button').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/select_Activation_Source').waitFor({ state: 'visible' });
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/span_Audiences_SaveSettings_Status').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/span_Audiences_SaveSettings_Status').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/span_Audiences_SaveSettings_BackendImagePixel').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/span_Audiences_SaveSettings_BackendImagePixel').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/button_Audiences_SaveSettings_AdvancedSettings').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/button_Audiences_SaveSettings_AdvancedSettings').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/button_Audiences_SaveSettings_BackfillSegmentAdd').waitFor({ state: 'visible' });
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/button_Audiences_SaveSettings_BackfillSegmentAdd').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/select_Audiences_1stParty_SaveSettings_BackfillSegment_LookbackWindow').selectOption({ label: String('') });
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/span_Audiences_1stParty_SaveSettings_BackfillSegment_SetCustomDateRange').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/span_Audiences_1stParty_SaveSettings_BackfillSegment_Save').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/label_Audiences_SaveSettings_PrimaryAddressOnly').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/label_Audiences_SaveSettings_GenerateMatchedOrgIPCountReport').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/label_Audiences_SaveSettings_IPsOnlyReport').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/label_Audiences_SaveSettings_IPStats').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_CustomImageURL').pressSequentially(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/input_Audiences_SaveSettings_CustomJavascriptURL').pressSequentially(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/SaveSettings/textarea_Audiences_SaveSettings_CustomHTML').pressSequentially(String(''));
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Audiences/Submission/Save Settings
});
