import { test } from '../../fixtures/session';
import {
  configureInsightStudioDataSource,
  configureInsightStudioExportTargets,
  configureInsightStudioRecipients,
  configureInsightStudioReport,
  modifyInsightStudioWidget,
  openInsightStudio,
  openInsightStudioCustomizeTab,
  openInsightStudioReport,
  saveInsightStudioReport
} from '../../pages/insight-studio';
import { config } from '../../utils/config';
import {
  loadInsightStudioCaseData,
  requireInsightStudioDataSourceValues,
  requireInsightStudioExportTargetValues,
  requireInsightStudioFlowValues,
  requireInsightStudioWidgetValues
} from '../../utils/insight-studio-db';

test.setTimeout(300000);

test('frontend: insight studio end-to-end flow is scriptable', async ({ page, loginAsDefaultUser, impersonateConfiguredUser }) => {
  const logStage = (label: string) => {
    console.log(`[insight] ${new Date().toISOString()} ${label}`);
  };
  const dbRow = loadInsightStudioCaseData();
  const insightValues = dbRow ? requireInsightStudioFlowValues() : null;

  logStage('login:start');
  await loginAsDefaultUser();
  logStage('login:done');

  if (config.insightUseImpersonation || insightValues?.impersonateUserProfile) {
    logStage('impersonation:start');
    await impersonateConfiguredUser();
    logStage('impersonation:done');
  }

  if (dbRow) {
    const dataSourceValues = requireInsightStudioDataSourceValues();
    const exportTargetValues = requireInsightStudioExportTargetValues();
    const widgetValues = requireInsightStudioWidgetValues();
    logStage('report-open:start');
    await openInsightStudioReport(page, insightValues!);
    logStage('report-open:done');
    logStage('report-config:start');
    await configureInsightStudioReport(page, insightValues!);
    logStage('report-config:done');
    for (const dataSource of dataSourceValues) {
      logStage(`datasource:${dataSource.index}:start`);
      await configureInsightStudioDataSource(page, dataSource);
      logStage(`datasource:${dataSource.index}:done`);
    }
    logStage('export-targets:start');
    await configureInsightStudioExportTargets(page, exportTargetValues);
    logStage('export-targets:done');
    logStage('recipients:start');
    await configureInsightStudioRecipients(page, insightValues!.recipients);
    logStage('recipients:done');
    if (widgetValues.length > 0) {
      logStage('customize:start');
      await openInsightStudioCustomizeTab(page);
      for (const widget of widgetValues) {
        logStage(`widget:${widget.index}:${widget.action}:start`);
        await modifyInsightStudioWidget(page, {
          action: widget.action,
          widgetIndex: widget.index,
          dataSource: widget.dataSource,
          widgetType: widget.widgetType,
          dimension: widget.dimension,
          metric: widget.metric,
          content: widget.content
        });
        logStage(`widget:${widget.index}:${widget.action}:done`);
      }
      logStage('customize:done');
    }
    if (config.pauseAtEnd && dbRow.id === '42') {
      await page.pause();
    }
    logStage('save:start');
    await saveInsightStudioReport(page);
    logStage('save:done');
    return;
  }

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
