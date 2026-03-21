import type { APIRequestContext, APIResponse } from '@playwright/test';

export async function loginToBackendApi(
  request: APIRequestContext,
  options: {
    baseUrl: string;
    username: string;
    password: string;
  }
): Promise<APIResponse> {
  return request.post(`${options.baseUrl}/ng-api/v2/account/login`, {
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      username: options.username,
      password: options.password
    }
  });
}

export function extractSessionCookie(setCookieHeader: string | null): string | null {
  if (!setCookieHeader) {
    return null;
  }

  const match = setCookieHeader.match(/(addaptive_session_[a-zA-Z]+)=([^;]+)/);
  if (!match) {
    return null;
  }

  return `${match[1]}=${match[2]};`;
}
