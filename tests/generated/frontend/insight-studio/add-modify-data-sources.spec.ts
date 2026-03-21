import { test } from '../../../../fixtures/session';
import { katalonLocator } from '../../../../locators/resolve';

test('Add Modify Data Sources', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Add Data Source Button').click();
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Air Config Group Dropdown').selectOption({ label: String('') });
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Air Config Searchbox').fill(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Data Source Modal Selection Span').click();
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/URL Inclusion Tab').click();
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/URL Exclusion Tab').click();
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Selected Line Item Div').click();
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Data Selection Line Item Search Input').fill(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Data Source Modal Selection Span').click();
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Data Selection Dynamic Filter Tab').click();
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Dynamic Filter Dimension Dropdown').selectOption({ label: String('') });
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Dynamic Filter Operator Dropdown').selectOption({ label: String('') });
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Dynamic Filter Searchbox').fill(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Add Dynamic Filter Button').click();
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/Data Selection Continue Button').click();
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/Dynamic Filter Dimension Dropdown').selectOption({ label: String('') });
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/Dynamic Filter Operator Dropdown').selectOption({ label: String('') });
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/Match Value Input').pressSequentially(String(''));
  await katalonLocator(page, 'Object Repository/Frontend/Insight Studio/Data Sources/Site Analytics V2/Add Filter Button').click();
  // TODO: replace generated steps with feature-specific Playwright interactions.
  // Original Katalon test case: Test Cases/Frontend/Insight Studio/Add Modify Data Sources
});
