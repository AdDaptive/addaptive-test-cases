const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const reportsRoot = path.resolve(__dirname, '..', 'playwright-report');

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
        mtimeMs: stats.mtimeMs
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

const latestReport = findLatestReport(reportsRoot);

if (!latestReport) {
  console.error(`No saved Playwright reports found under ${reportsRoot}`);
  process.exit(1);
}

const child = spawnSync('npx', ['playwright', 'show-report', latestReport.fullPath], {
  stdio: 'inherit',
  shell: process.platform === 'win32'
});

if (child.error) {
  console.error(child.error.message);
  process.exit(1);
}

process.exit(child.status ?? 0);
