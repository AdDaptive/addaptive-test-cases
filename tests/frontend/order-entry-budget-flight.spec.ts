import { test } from '../../fixtures/session';
import { configureOrderEntryBudgetFlight, openOrderEntryPage } from '../../pages/order-entry';
import { requireOrderEntryBudgetFlightValues } from '../../utils/order-entry-db';
import { config } from '../../utils/config';

test('frontend: order entry budget and flight tab is scriptable', async ({
  page,
  loginAsDefaultUser,
  impersonateConfiguredUser
}) => {
  const dbValues = requireOrderEntryBudgetFlightValues();

  await loginAsDefaultUser();

  if (config.orderEntryUseImpersonation) {
    await impersonateConfiguredUser();
  }

  await openOrderEntryPage(page);
  await configureOrderEntryBudgetFlight(page, {
    adServer: dbValues.adServer,
    orderAction: dbValues.orderAction,
    startDate: dbValues.startDate,
    endDate: dbValues.endDate,
    subDealId: dbValues.subDealId,
    cpmValue: dbValues.cpmValue,
    impressionGoal: dbValues.impressionGoal,
    optimizationCpm: dbValues.optimizationCpm,
    pacingPercentage: dbValues.pacingPercentage,
    pacingImpressionType: dbValues.pacingImpressionType,
    pacingImpression: dbValues.pacingImpression,
    dailyBudget: dbValues.dailyBudget,
    xandrLifeBuffer: dbValues.xandrLifeBuffer,
    xandrLifeBudget: dbValues.xandrLifeBudget
  });
});
