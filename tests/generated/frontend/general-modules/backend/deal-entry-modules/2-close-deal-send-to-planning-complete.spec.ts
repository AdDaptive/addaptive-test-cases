import { test } from '../../../../../../fixtures/session';
import { katalonLocator } from '../../../../../../locators/resolve';

test('2_Close_Deal_Send_To_Planning_Complete', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/Send-To-Planning/button_SendToPlanning_SendToPlanningReceived').click();
  await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/Planning-Complete/textarea_PlanningComplete_PlanningNotes').fill(String(''));
  await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/Planning-Complete/button_PlanningComplete_SaveChanges').click();
  await katalonLocator(page, 'Object Repository/Backend/Sales Dashboard/Spotlight Page/Planning-Complete/button_PlanningComplete_SendToPlanningComplete').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/General Modules/Backend/Deal Entry Modules/2_Close_Deal_Send_To_Planning_Complete
});
