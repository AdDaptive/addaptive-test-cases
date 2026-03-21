import { test } from '../../fixtures/session';
import { modifyInsightStudioWidget, openInsightStudio } from '../../pages/insight-studio';
import { config } from '../../utils/config';

test('frontend: insight studio widget modification is scriptable', async ({ page, loginAsDefaultUser }) => {
  await loginAsDefaultUser();
  await openInsightStudio(page);
  await modifyInsightStudioWidget(page, {
    action: config.insightWidgetAction,
    widgetIndex: config.insightWidgetIndex,
    dataSource: config.insightWidgetDataSource,
    widgetType: config.insightWidgetType,
    dimension: config.insightWidgetDimension,
    metric: config.insightWidgetMetric,
    content: config.insightWidgetContent
  });
});
