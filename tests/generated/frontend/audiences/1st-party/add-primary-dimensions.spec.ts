import { test } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Add Primary Dimensions', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/New Custom Dimension Span').click();
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/Custom Dimension Input').waitFor({ state: 'visible' });
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/Custom Dimension Input').fill(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Audiences/Custom Dimension Continue Button').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Audiences/1st Party/Add Primary Dimensions
});
