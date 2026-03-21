import { test } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Add Match Criteria', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/a_MatchCriteria').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/button_Audiences_OnsiteIntent_MatchCriteria_AddGroup').click();
  // TODO: manual conversion required for Katalon switch/case logic.
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/button_Audiences_OnsiteIntent_MatchCriteria_AddRule').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudienceOnsiteIntent/MatchCriteria/label_Audiences_OnsiteIntent_MatchCriteria_TargetType').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Audiences/Intent Segment/Add Match Criteria
});
