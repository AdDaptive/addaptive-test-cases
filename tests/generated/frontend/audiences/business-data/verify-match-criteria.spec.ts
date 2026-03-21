import { test, expect } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Verify Match Criteria', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/a_Match Criteria').click();
  await expect(katalonLocator(page, 'Object Repository/Frontend/Audiences/ChooseSegmentActivationType/ActivateAudience1stParty/MatchCriteria/a_Match Criteria')).toBeVisible();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Audiences/Business Data/Verify Match Criteria
});
