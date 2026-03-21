import { test, expect } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Verify Objectives Tab', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/a_ObjectivesTab').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/span_ObjectivesAdminOnlyAccordion').click();
  await expect(katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/input_ObjectivesAdminOnlyMinMargin')).toHaveText(String(''));
  await expect(katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/input_ObjectivesAdminOnlyOptimizationAmount')).toHaveText(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/button_ObjectivesEditConversionPixel').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/input_ObjectivesConversionPixelsSearch').waitFor({ state: 'visible' });
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/button_ObjectivesConversionPixelsContinue').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Orders/Objectives Tab/Verify Objectives Tab
});
