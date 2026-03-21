import type { APIRequestContext, APIResponse } from '@playwright/test';
import { locatorCatalog } from '../locators/generated';

type ApiObjectPath = {
  [K in keyof typeof locatorCatalog]: (typeof locatorCatalog)[K] extends { kind: 'api' } ? K : never;
}[keyof typeof locatorCatalog];

type Variables = Record<string, string | number | boolean>;

function assertApiEntry(objectPath: ApiObjectPath) {
  const entry = locatorCatalog[objectPath] as
    | { kind: 'api'; method: string; url: string }
    | { kind: 'web' }
    | undefined;

  if (!entry || entry.kind !== 'api') {
    throw new Error(`Katalon object is not an API request: ${objectPath}`);
  }

  return entry;
}

export function resolveKatalonApiUrl(objectPath: ApiObjectPath, variables: Variables = {}): string {
  const entry = assertApiEntry(objectPath);

  return entry.url.replace(/\$\{([^}]+)\}/g, (_full, variableName) => {
    if (!(variableName in variables)) {
      throw new Error(`Missing URL variable "${variableName}" for ${objectPath}`);
    }
    return encodeURIComponent(String(variables[variableName]));
  });
}

export async function callKatalonApi(
  request: APIRequestContext,
  objectPath: ApiObjectPath,
  options: {
    variables?: Variables;
    headers?: Record<string, string>;
    data?: unknown;
  } = {}
): Promise<APIResponse> {
  const entry = assertApiEntry(objectPath);
  const method = entry.method.toUpperCase();
  const url = resolveKatalonApiUrl(objectPath, options.variables);

  switch (method) {
    case 'GET':
      return request.get(url, { headers: options.headers });
    case 'POST':
      return request.post(url, { headers: options.headers, data: options.data });
    case 'PUT':
      return request.put(url, { headers: options.headers, data: options.data });
    case 'PATCH':
      return request.patch(url, { headers: options.headers, data: options.data });
    case 'DELETE':
      return request.delete(url, { headers: options.headers, data: options.data });
    default:
      throw new Error(`Unsupported Katalon API method "${entry.method}" for ${objectPath}`);
  }
}
