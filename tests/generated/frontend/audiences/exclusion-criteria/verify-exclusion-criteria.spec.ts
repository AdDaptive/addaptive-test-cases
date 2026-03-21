import { test } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Verify Exclusion Criteria', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/a_Exclusion Criteria').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/button_Audiences_1stParty_ExclusionCriteria_DunsNumberAccordian').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/button_Audiences_1stParty_ExclusionCriteria_NACISCodeAccordian').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/textarea_Audiences_1stParty_ExclusionCriteria_NAICSCode').waitFor({ state: 'visible' });
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/button_Audiences_1stParty_ExclusionCriteria_SalesVolumeAccordian').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/button_Audiences_1stParty_ExclusionCriteria_EmployeeCountAccordian').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/button_Audiences_1stParty_ExclusionCriteria_YearsInBusinessAccordian').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/ExclusionCriteria/button_Audiences_1stParty_ExclusionCriteria_GeoTargetingAccordian').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Audiences/Exclusion Criteria/Verify Exclusion Criteria
});
