import { test } from '../../fixtures/session';
import { configureOrderEntryBasicSetup, openOrderEntryPage } from '../../pages/order-entry';
import { requireOrderEntryBasicSetupValues } from '../../utils/order-entry-db';

test('frontend: order entry basic setup is scriptable', async ({ page, loginAsDefaultUser }) => {
  const dbValues = requireOrderEntryBasicSetupValues();

  await loginAsDefaultUser();
  await openOrderEntryPage(page);
  await configureOrderEntryBasicSetup(page, {
    adServer: dbValues.adServer,
    orderName: dbValues.orderName,
    ioName: dbValues.ioName,
    campaignName: dbValues.campaignName,
    campaignType: dbValues.campaignType,
    revenueType: dbValues.revenueType,
    lineItemName: dbValues.lineItemName,
    lineItems: dbValues.lineItems,
    curateDealName: dbValues.curateDealName,
    curateDSP: dbValues.curateDSP,
    advertiser: dbValues.advertiser,
    singleObjectDealId: dbValues.singleObjectDealId,
    targetType: dbValues.targetType,
    creativeType: dbValues.creativeType,
    insertionOrder: dbValues.insertionOrder,
    orderNotes: dbValues.orderNotes
  });
});
