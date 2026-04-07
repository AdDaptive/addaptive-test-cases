import { config } from './config';

type FrontendAuthInput = {
  username?: string;
  password?: string;
  impersonateUserProfile?: string;
  baseUrl?: string;
};

function valueOrUndefined(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function resolveFrontendLogin(input: FrontendAuthInput = {}): {
  username: string;
  password: string;
  baseUrl?: string;
} {
  const username = valueOrUndefined(config.loginUserOverride) || valueOrUndefined(input.username) || valueOrUndefined(config.loginUser);
  const password =
    valueOrUndefined(config.loginPasswordOverride) || valueOrUndefined(input.password) || valueOrUndefined(config.loginPassword);

  if (!username || !password) {
    throw new Error(
      'Missing frontend login credentials. Set suite-table username/password values or ADDAPTIVE_LOGIN_USER and ADDAPTIVE_LOGIN_PASSWORD.'
    );
  }

  return {
    username,
    password,
    baseUrl: valueOrUndefined(input.baseUrl) || valueOrUndefined(config.frontendUrl)
  };
}

export function resolveFrontendImpersonationTarget(input: FrontendAuthInput = {}, fallbacks: string[] = []): string | undefined {
  return (
    valueOrUndefined(config.impersonateUserOverride) ||
    valueOrUndefined(input.impersonateUserProfile) ||
    fallbacks.map((value) => valueOrUndefined(value)).find(Boolean)
  );
}

export function shouldUseOrderEntryImpersonation(input: FrontendAuthInput = {}, fallbacks: string[] = []): boolean {
  const override = valueOrUndefined(config.orderEntryUseImpersonationOverride);
  if (override) {
    return override.toLowerCase() === 'true';
  }

  return Boolean(resolveFrontendImpersonationTarget(input, fallbacks));
}
