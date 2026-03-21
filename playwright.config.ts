import { defineConfig } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from './utils/load-env';

loadEnv();

const baseURL = process.env.ADDAPTIVE_FRONTEND_URL;
const braveExecutableOverride = process.env.ADDAPTIVE_BRAVE_EXECUTABLE_PATH;
const workersOverride = process.env.ADDAPTIVE_PLAYWRIGHT_WORKERS?.trim();

function resolveWorkersOverride(): number | undefined {
  if (!workersOverride) {
    return undefined;
  }

  const parsed = Number(workersOverride);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`Invalid ADDAPTIVE_PLAYWRIGHT_WORKERS "${workersOverride}". Expected a positive integer.`);
  }

  return parsed;
}

function resolveBraveExecutablePath(): string | undefined {
  if (braveExecutableOverride && fs.existsSync(braveExecutableOverride)) {
    return braveExecutableOverride;
  }

  const candidates =
    process.platform === 'win32'
      ? [
          'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
          'C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'
        ]
      : process.platform === 'darwin'
        ? ['/Applications/Brave Browser.app/Contents/MacOS/Brave Browser']
        : ['/usr/bin/brave-browser', '/snap/bin/brave', '/usr/bin/brave'];

  return candidates.find((path) => fs.existsSync(path));
}

const braveExecutablePath = resolveBraveExecutablePath();
const reportTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
const htmlReportOutputFolder = path.join('playwright-report', reportTimestamp);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: resolveWorkersOverride(),
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never', outputFolder: htmlReportOutputFolder }]],
  use: {
    baseURL: baseURL || undefined,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: null
      }
    },
    {
      name: 'brave-ubuntu',
      use: {
        browserName: 'chromium',
        viewport: null,
        launchOptions: {
          headless: false,
          executablePath: braveExecutablePath
        },
      },
    }
  ]
});
