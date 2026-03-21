import { test } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Audience Composition', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/AudienceComposition/a_Audiences_AudienceComposition').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/AudienceComposition/div_Audiences_AudienceComposition_PreviewSelectionToggle').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/CommonObjects/AudienceComposition/span_Audiences_AudienceComposition_PreviewSelectionClose').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Audiences/Common/Audience Composition
});
