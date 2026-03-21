import type { Page } from '@playwright/test';
import { katalonLocator } from '../locators/resolve';

export async function loginToBackend(page: Page, username: string, password: string, baseUrl: string): Promise<void> {
  await page.goto(baseUrl);
  await katalonLocator(page, 'Object Repository/Backend/Authentication/Login/Login Username Input').waitFor({
    state: 'visible'
  });
  await katalonLocator(page, 'Object Repository/Backend/Authentication/Login/Login Username Input').fill(username);
  await katalonLocator(page, 'Object Repository/Backend/Authentication/Login/Login Password Input').fill(password);
  await katalonLocator(page, 'Object Repository/Backend/Authentication/Login/Login Button').click();
}
