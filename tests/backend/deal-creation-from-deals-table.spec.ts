import { test } from '@playwright/test';
import { loginToBackend } from '../../pages/backend-auth';
import { createBackendDeal, updateInFlightSubdealDescription, uploadDealAttachments } from '../../pages/backend-deal-create';
import {
  configureBackendDealStage,
  saveClosedWonDeal,
  sendDealToClosedWon,
  sendDealToProposalSentNegotiation,
  sendDealToVerbalAgreement
} from '../../pages/backend-deal-stage';
import {
  buildDealsCaseSelectionError,
  loadDealsCaseSummaries,
  requireDealsCreationFlowValues
} from '../../utils/deals-db';
import { config } from '../../utils/config';

const selectedCases = loadDealsCaseSummaries();

if (selectedCases.length === 0) {
  test('backend: deals_table deal-creation batch requires matching filters', async () => {
    throw new Error(buildDealsCaseSelectionError());
  });
}

for (const selectedCase of selectedCases) {
  test(`backend: deals_table deal-creation flow for object ${selectedCase.objectId}`, async ({ page }) => {
    test.setTimeout(120000);

    const baseUrl = config.backendUrl;
    const username = config.loginUser;
    const password = config.loginPassword;

    test.skip(!baseUrl || !username || !password, 'Backend URL and credentials are required.');

    const previousObjectId = process.env.ADDAPTIVE_DEALS_DB_OBJECT_ID;
    const previousTestCaseName = process.env.ADDAPTIVE_DEALS_DB_TEST_CASE_NAME;

    process.env.ADDAPTIVE_DEALS_DB_OBJECT_ID = selectedCase.objectId;
    delete process.env.ADDAPTIVE_DEALS_DB_TEST_CASE_NAME;

    try {
      const flowValues = requireDealsCreationFlowValues();

      await loginToBackend(page, username, password, baseUrl);
      await createBackendDeal(page, flowValues);
      await sendDealToProposalSentNegotiation(page);
      await sendDealToVerbalAgreement(page);
      await configureBackendDealStage(page, {
        b2bAnalyticsCadence: flowValues.completeDealB2BAnalytics,
        accountNotes: flowValues.completeDealAccountNotes,
        canTargetOutsideAbmList: flowValues.completeDealCanAMtargetOutsideOfABMList
      });
      await saveClosedWonDeal(page);
      await sendDealToClosedWon(page);
      await uploadDealAttachments(page, flowValues);
      await updateInFlightSubdealDescription(page, flowValues);
    } finally {
      if (previousObjectId === undefined) {
        delete process.env.ADDAPTIVE_DEALS_DB_OBJECT_ID;
      } else {
        process.env.ADDAPTIVE_DEALS_DB_OBJECT_ID = previousObjectId;
      }

      if (previousTestCaseName === undefined) {
        delete process.env.ADDAPTIVE_DEALS_DB_TEST_CASE_NAME;
      } else {
        process.env.ADDAPTIVE_DEALS_DB_TEST_CASE_NAME = previousTestCaseName;
      }
    }
  });
}
