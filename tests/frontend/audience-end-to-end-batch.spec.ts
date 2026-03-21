import { test } from '../../fixtures/session';
import { buildAudienceCaseSelectionError, loadAudienceCaseSummaries } from '../../utils/audience-db';
import { shouldPauseAtEnd, runAudienceEndToEnd } from './audience-end-to-end.helpers';

test.describe.configure({ mode: 'parallel' });

test.afterEach(async ({ page }, testInfo) => {
  if (shouldPauseAtEnd() && testInfo.status !== testInfo.expectedStatus) {
    await page.pause();
  }
});

const selectedCases = loadAudienceCaseSummaries();

if (selectedCases.length === 0) {
  test('frontend: audience end-to-end batch requires matching filters', async () => {
    throw new Error(buildAudienceCaseSelectionError());
  });
}

for (const selectedCase of selectedCases) {
  test(`frontend: audience end-to-end for DB row ${selectedCase.id} (${selectedCase.testCaseName || 'untitled'})`, async ({
    page,
    loginAsDefaultUser,
    impersonateConfiguredUser
  }) => {
    const timeoutOverride = Number(process.env.ADDAPTIVE_TEST_TIMEOUT_MS || '90000');
    test.setTimeout(Number.isFinite(timeoutOverride) && timeoutOverride > 0 ? timeoutOverride : 90000);

    const previousId = process.env.ADDAPTIVE_AUDIENCE_DB_ID;
    const previousTestCaseName = process.env.ADDAPTIVE_AUDIENCE_DB_TEST_CASE_NAME;

    process.env.ADDAPTIVE_AUDIENCE_DB_ID = selectedCase.id;
    delete process.env.ADDAPTIVE_AUDIENCE_DB_TEST_CASE_NAME;

    try {
      await runAudienceEndToEnd(page, loginAsDefaultUser, impersonateConfiguredUser);
    } finally {
      if (previousId === undefined) {
        delete process.env.ADDAPTIVE_AUDIENCE_DB_ID;
      } else {
        process.env.ADDAPTIVE_AUDIENCE_DB_ID = previousId;
      }

      if (previousTestCaseName === undefined) {
        delete process.env.ADDAPTIVE_AUDIENCE_DB_TEST_CASE_NAME;
      } else {
        process.env.ADDAPTIVE_AUDIENCE_DB_TEST_CASE_NAME = previousTestCaseName;
      }
    }
  });
}
