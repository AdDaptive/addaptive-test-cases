import { test as base, expect } from '@playwright/test';
import { env } from '../utils/env';
import { impersonateFrontendUser, loginToFrontend } from '../pages/frontend-auth';
import { loadOrderEntryFlowValues } from '../utils/order-entry-db';
import { requireAudienceFlowValues } from '../utils/audience-db';
import { loadInsightStudioCaseData, requireInsightStudioFlowValues } from '../utils/insight-studio-db';
import { resolveFrontendImpersonationTarget, resolveFrontendLogin } from '../utils/auth-config';

type SessionFixtures = {
  loginAsDefaultUser: () => Promise<void>;
  impersonateConfiguredUser: () => Promise<void>;
};

export const test = base.extend<SessionFixtures>({
  loginAsDefaultUser: async ({ page }, use) => {
    await use(async () => {
      const orderEntryValues = loadOrderEntryFlowValues();
      const insightStudioRow = loadInsightStudioCaseData();
      const insightStudioValues = insightStudioRow ? requireInsightStudioFlowValues() : null;
      let audienceValues: ReturnType<typeof requireAudienceFlowValues> | null = null;
      try {
        audienceValues = requireAudienceFlowValues();
      } catch {
        audienceValues = null;
      }

      const login = resolveFrontendLogin({
        username: orderEntryValues?.username || insightStudioValues?.username || audienceValues?.username,
        password: orderEntryValues?.password || insightStudioValues?.password || audienceValues?.password,
        baseUrl: env.frontendUrl
      });

      await loginToFrontend(
        page,
        login.username,
        login.password,
        login.baseUrl || ''
      );
    });
  },
  impersonateConfiguredUser: async ({ page }, use, testInfo) => {
    await use(async () => {
      const flowValues = loadOrderEntryFlowValues();
      const insightStudioRow = loadInsightStudioCaseData();
      const insightStudioFlowValues = insightStudioRow ? requireInsightStudioFlowValues() : null;
      let audienceValues: ReturnType<typeof requireAudienceFlowValues> | null = null;
      try {
        audienceValues = requireAudienceFlowValues();
      } catch {
        audienceValues = null;
      }
      const orderEntryUsers = (env.orderEntryImpersonateUser || '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);
      const targetUser = resolveFrontendImpersonationTarget(
        {
          impersonateUserProfile:
            insightStudioFlowValues?.impersonateUserProfile ||
            flowValues?.impersonateUserProfile ||
            audienceValues?.impersonateUserProfile
        },
        [env.impersonateUser, orderEntryUsers[testInfo.parallelIndex % Math.max(orderEntryUsers.length, 1)]]
      );
      if (!targetUser) {
        throw new Error(
          'Missing impersonation target. Set a suite-table impersonate profile, ADDAPTIVE_IMPERSONATE_USER_OVERRIDE, or ADDAPTIVE_IMPERSONATE_USER.'
        );
      }
      await expect(page).toHaveURL(/addaptive/i);
      await impersonateFrontendUser(page, targetUser);
    });
  }
});

export { expect } from '@playwright/test';
