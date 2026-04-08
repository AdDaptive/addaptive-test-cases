const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const projectRoot = path.resolve(__dirname, '..');
const reportsRoot = path.join(projectRoot, 'playwright-report');
const lastRunPath = path.join(projectRoot, 'test-results', '.last-run.json');
const staleReportThresholdMs = 60 * 1000;

function listReportDirectories(rootDir) {
  if (!fs.existsSync(rootDir)) {
    return [];
  }

  return fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const fullPath = path.join(rootDir, entry.name);
      const indexPath = path.join(fullPath, 'index.html');
      const stats = fs.statSync(fullPath);
      return {
        name: entry.name,
        fullPath,
        indexPath,
        mtimeMs: Math.max(stats.mtimeMs, fs.existsSync(indexPath) ? fs.statSync(indexPath).mtimeMs : 0)
      };
    })
    .filter((entry) => fs.existsSync(entry.indexPath))
    .sort((left, right) => right.mtimeMs - left.mtimeMs);
}

function findLatestReport(rootDir) {
  const candidates = listReportDirectories(rootDir);
  const legacyIndexPath = path.join(rootDir, 'index.html');

  if (fs.existsSync(legacyIndexPath)) {
    const stats = fs.statSync(legacyIndexPath);
    candidates.push({
      name: 'legacy-root-report',
      fullPath: rootDir,
      indexPath: legacyIndexPath,
      mtimeMs: stats.mtimeMs
    });
  }

  candidates.sort((left, right) => right.mtimeMs - left.mtimeMs);
  return candidates[0];
}

function readLastRunMetadata(lastRunFile) {
  if (!fs.existsSync(lastRunFile)) {
    return null;
  }

  const stats = fs.statSync(lastRunFile);
  let summary = null;

  try {
    summary = JSON.parse(fs.readFileSync(lastRunFile, 'utf8'));
  } catch {
    summary = null;
  }

  return {
    mtimeMs: stats.mtimeMs,
    summary
  };
}

function maybeWarnAboutStaleReport(latestReport, lastRun) {
  if (!latestReport || !lastRun) {
    return;
  }

  const ageGapMs = lastRun.mtimeMs - latestReport.mtimeMs;
  if (ageGapMs <= staleReportThresholdMs) {
    return;
  }

  const lastRunStatus = typeof lastRun.summary?.status === 'string' ? lastRun.summary.status : 'unknown';
  console.warn(
    [
      'Warning: the newest saved Playwright HTML report is older than the most recent recorded test run.',
      `Saved report time: ${new Date(latestReport.mtimeMs).toISOString()}.`,
      `Last recorded test run: ${new Date(lastRun.mtimeMs).toISOString()} (status: ${lastRunStatus}).`,
      'The most recent run likely did not generate an HTML report, which can happen when overriding reporters via the CLI',
      '(for example: --reporter=line). Opening the newest saved HTML report instead.'
    ].join(' ')
  );
}

const lastRun = readLastRunMetadata(lastRunPath);
const latestReport = findLatestReport(reportsRoot);

if (!latestReport) {
  if (lastRun) {
    const lastRunStatus = typeof lastRun.summary?.status === 'string' ? lastRun.summary.status : 'unknown';
    console.error(
      `No saved Playwright HTML reports found under ${reportsRoot}. ` +
        `The most recent recorded test run completed at ${new Date(lastRun.mtimeMs).toISOString()} ` +
        `(status: ${lastRunStatus}) and may have used a non-HTML reporter such as --reporter=line.`
    );
  } else {
    console.error(`No saved Playwright reports found under ${reportsRoot}`);
  }
  process.exit(1);
}

maybeWarnAboutStaleReport(latestReport, lastRun);

function resolvePlaywrightCommand(reportPath) {
  try {
    const playwrightCli = require.resolve('@playwright/test/cli');
    return {
      command: process.execPath,
      args: [playwrightCli, 'show-report', reportPath]
    };
  } catch {
    return {
      command: process.platform === 'win32' ? 'npx.cmd' : 'npx',
      args: ['playwright', 'show-report', reportPath]
    };
  }
}

const { command, args } = resolvePlaywrightCommand(latestReport.fullPath);
const child = spawnSync(command, args, {
  stdio: 'inherit'
});

if (child.error) {
  console.error(child.error.message);
  process.exit(1);
}

process.exit(child.status ?? 0);
