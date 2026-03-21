import { test as base, expect } from '@playwright/test';
import { env, requiredEnv } from '../utils/env';
import { impersonateFrontendUser, loginToFrontend } from '../pages/frontend-auth';
import { loadOrderEntryFlowValues } from '../utils/order-entry-db';
import { loadInsightStudioCaseData, requireInsightStudioFlowValues } from '../utils/insight-studio-db';

type SessionFixtures = {
  loginAsDefaultUser: () => Promise<void>;
  impersonateConfiguredUser: () => Promise<void>;
};

export const test = base.extend<SessionFixtures>({
  loginAsDefaultUser: async ({ page }, use) => {
    await use(async () => {
      await loginToFrontend(
        page,
        requiredEnv('ADDAPTIVE_LOGIN_USER'),
        requiredEnv('ADDAPTIVE_LOGIN_PASSWORD'),
        env.frontendUrl || requiredEnv('ADDAPTIVE_FRONTEND_URL')
      );
    });
  },
  impersonateConfiguredUser: async ({ page }, use, testInfo) => {
    await use(async () => {
      const flowValues = loadOrderEntryFlowValues();
      const insightStudioRow = loadInsightStudioCaseData();
      const insightStudioFlowValues = insightStudioRow ? requireInsightStudioFlowValues() : null;
      const orderEntryUsers = (env.orderEntryImpersonateUser || '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);
      const targetUser =
        insightStudioFlowValues?.impersonateUserProfile ||
        flowValues?.impersonateUserProfile ||
        env.impersonateUser ||
        orderEntryUsers[testInfo.parallelIndex % Math.max(orderEntryUsers.length, 1)] ||
        requiredEnv('ADDAPTIVE_IMPERSONATE_USER');
      await expect(page).toHaveURL(/addaptive/i);
      await impersonateFrontendUser(page, targetUser);
    });
  }
});

export { expect } from '@playwright/test';
