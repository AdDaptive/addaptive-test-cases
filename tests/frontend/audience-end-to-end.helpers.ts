import type { Page } from '@playwright/test';
import {
  chooseSegmentActivationType,
  configureBusinessDataMatchCriteria,
  configureFirstPartyMatchCriteria,
  openExistingAudiencePage,
  openFirstPartyAudiencePage,
  saveAudienceSettings,
  verifyBusinessDataMatchCriteria,
  verifyAudienceSubmissionControls
} from '../../pages/audiences-first-party';
import {
  requireAudienceBusinessDataValues,
  requireAudienceFlowValues,
  requireAudienceMatchCriteriaValues,
  requireAudienceSaveSettingsValues
} from '../../utils/audience-db';
import { config } from '../../utils/config';

export function shouldPauseAtEnd(): boolean {
  return config.pauseAtEnd;
}

export async function runAudienceEndToEnd(
  page: Page,
  loginAsDefaultUser: () => Promise<void>,
  impersonateConfiguredUser: () => Promise<void>
): Promise<void> {
  const flowValues = requireAudienceFlowValues();
  const saveSettingsValues = requireAudienceSaveSettingsValues();
  const normalizedSegmentType = (flowValues.segmentType || '').trim().toLowerCase();

  await loginAsDefaultUser();

  if (config.audienceUseImpersonation) {
    await impersonateConfiguredUser();
  }

  if (flowValues.audienceAction === 'edit') {
    await openExistingAudiencePage(page, {
      objectId: flowValues.objectId,
      existingSegmentName: flowValues.existingSegmentName
    });
  } else {
    await openFirstPartyAudiencePage(page);
    await chooseSegmentActivationType(page, flowValues.segmentType || '1st Party Data');
  }

  const matchCriteriaResult =
    normalizedSegmentType === 'business data'
      ? await runBusinessDataPath(page, flowValues.audienceAction)
      : await runFirstPartyPath(page);
  await saveAudienceSettings(page, saveSettingsValues);
  await verifyAudienceSubmissionControls(page, {
    action: flowValues.audienceAction,
    isDraftSegment: flowValues.isDraftSegment,
    audienceErrors: matchCriteriaResult.audienceErrors
  });

  if (shouldPauseAtEnd()) {
    await page.pause();
  }
}

async function runFirstPartyPath(page: Page): Promise<{ audienceErrors: string[] }> {
  const audienceValues = requireAudienceMatchCriteriaValues();
  return configureFirstPartyMatchCriteria(page, audienceValues);
}

async function runBusinessDataPath(page: Page, audienceAction: 'create' | 'edit'): Promise<{ audienceErrors: string[] }> {
  const businessDataValues = requireAudienceBusinessDataValues();
  if (audienceAction === 'create') {
    await verifyBusinessDataMatchCriteria(page, {
      criteria: [],
      targetMode: 'any',
      bulkImportMode: 'inactive',
      bulkImportFileType: 'NAICS Code'
    });
  }
  const result = await configureBusinessDataMatchCriteria(page, businessDataValues);
  await verifyBusinessDataMatchCriteria(page, businessDataValues);
  return result;
}
