import { test, expect } from '@playwright/test';
import { extractSessionCookie, loginToBackendApi } from '../../api/backend-auth';
import { config } from '../../utils/config';

test('api: backend login returns a session cookie', async ({ request }) => {
  const username = config.loginUser;
  const password = config.loginPassword;
  const baseUrl = config.backendUrl;

  test.skip(!username || !password || !baseUrl, 'Backend URL and credentials are required.');

  const response = await loginToBackendApi(request, {
    baseUrl,
    username,
    password
  });

  expect(response.ok()).toBeTruthy();

  const sessionCookie = extractSessionCookie(response.headers()['set-cookie'] || null);
  expect(sessionCookie).toBeTruthy();
});
