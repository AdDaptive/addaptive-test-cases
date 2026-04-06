import type { Page } from '@playwright/test';
import { katalonLocator } from '../locators/resolve';

export async function loginToBackend(page: Page, username: string, password: string, baseUrl: string): Promise<void> {
  const usernameInput = katalonLocator(page, 'Object Repository/Backend/Authentication/Login/Login Username Input');
  const sidebarAnchor = katalonLocator(page, 'Object Repository/Backend/Sidebar Anchor', { sidebarItem: 'Clients' });

  await page.goto(baseUrl);
  const loginVisible = await usernameInput.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
  if (!loginVisible) {
    const backendReady = await sidebarAnchor.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
    if (backendReady) {
      return;
    }
    await usernameInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  await usernameInput.fill(username);
  await katalonLocator(page, 'Object Repository/Backend/Authentication/Login/Login Password Input').fill(password);
  await katalonLocator(page, 'Object Repository/Backend/Authentication/Login/Login Button').click();
}
