import { test } from '../../fixtures/session';
import {
  chooseSegmentActivationType,
  expectAudienceFilterTarget,
  openFirstPartyAudiencePage,
  setAudienceFilterTarget
} from '../../pages/audiences-first-party';
import { requireAudienceFilterTargetValues } from '../../utils/audience-db';

test('frontend: first-party audience filter target toggle is scriptable', async ({ page, loginAsDefaultUser }) => {
  const { targetMode } = requireAudienceFilterTargetValues();

  await loginAsDefaultUser();
  await openFirstPartyAudiencePage(page);
  await chooseSegmentActivationType(page, 'Business Data');
  await setAudienceFilterTarget(page, targetMode);
  await expectAudienceFilterTarget(page, targetMode);
});
