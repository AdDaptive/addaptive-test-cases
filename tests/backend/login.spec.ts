import { test, expect } from '@playwright/test';
import { loginToBackend } from '../../pages/backend-auth';
import { config } from '../../utils/config';

test('backend: login with configured admin user', async ({ page }) => {
  const username = config.loginUser;
  const password = config.loginPassword;
  const baseUrl = config.backendUrl;

  test.skip(!username || !password || !baseUrl, 'Backend URL and credentials are required.');

  await loginToBackend(page, username, password, baseUrl);
  await expect(page).toHaveURL(/addaptive/i);
});
