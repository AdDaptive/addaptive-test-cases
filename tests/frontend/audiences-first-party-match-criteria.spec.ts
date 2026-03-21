import { test } from '../../fixtures/session';
import {
  chooseSegmentActivationType,
  configureFirstPartyMatchCriteria,
  openFirstPartyAudiencePage
} from '../../pages/audiences-first-party';
import { requireAudienceMatchCriteriaValues } from '../../utils/audience-db';
import { config } from '../../utils/config';

test('frontend: first-party match criteria is scriptable', async ({
  page,
  loginAsDefaultUser,
  impersonateConfiguredUser
}) => {
  const audienceValues = requireAudienceMatchCriteriaValues();

  await loginAsDefaultUser();

  if (config.audienceUseImpersonation) {
    await impersonateConfiguredUser();
  }

  await openFirstPartyAudiencePage(page);
  await chooseSegmentActivationType(page, audienceValues.segmentType || '1st Party Data');
  await configureFirstPartyMatchCriteria(page, audienceValues);
});
