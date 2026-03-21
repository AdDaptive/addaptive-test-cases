import { test } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Make Columns Visible', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/Visible Columns Modal/Visible Columns Modal Toggle').click();
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/Visible Columns Modal/Select All Columns Visible Link').click();
  await katalonLocator(page, 'Object Repository/Backend/Ops Dashboard/Visible Columns Modal/Visible Columns Save Changes Button').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Backend/Common Modules/Grid/Make Columns Visible
});
