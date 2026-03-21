import { test, expect } from '@playwright/test';
import { callKatalonApi } from '../../api/katalon-api';
import { config } from '../../utils/config';

test('api: current user endpoint responds with auth context', async ({ request }) => {
  test.fixme(!config.backendUrl || !config.backendCookie, 'Backend URL and cookie are required.');

  const response = await callKatalonApi(request, 'Object Repository/Backend/API-Request/Current User', {
    variables: {
      url: config.backendUrl
    },
    headers: {
      Cookie: config.backendCookie
    }
  });

  expect(response.ok()).toBeTruthy();
});
