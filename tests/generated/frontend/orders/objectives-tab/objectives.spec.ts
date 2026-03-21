import { test } from '../../../../../fixtures/session';
import { katalonLocator } from '../../../../../locators/resolve';

test('Objectives', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/a_ObjectivesTab').click();
  await katalonLocator(page, 'Object Repository/Frontend/Generic/Generic Modal').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/select_ObjectivesGoal').selectOption({ label: String('') });
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/span_ObjectivesAdminOnlyAccordion').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/Media Math/Units Value Input').fill(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/span_ObjectivesAdminOnlyAccordion').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/input_ObjectivesAdminOnlyMinMargin').fill(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/label_ObjectivesAdminOnlyOptimizationMethodToggle').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/label_ObjectivesAdminOnlyOptimizationMethodToggle').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/button_ObjectivesEditConversionPixel').click();
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/input_ObjectivesConversionPixelsSearch').fill('');
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/input_ObjectivesConversionPixelsSearch').pressSequentially(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Order-Entry/Objectives-Tab/button_ObjectivesConversionPixelsContinue').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Orders/Objectives Tab/Objectives
});
