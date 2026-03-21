import { loadEnv, requiredProcessEnv } from './load-env';
import { config } from './config';

loadEnv();

export function requiredEnv(name: string): string {
  return requiredProcessEnv(name);
}

export const env = {
  frontendUrl: config.frontendUrl,
  backendUrl: config.backendUrl,
  loginUser: config.loginUser,
  loginPassword: config.loginPassword,
  impersonateUser: config.impersonateUser,
  orderEntryImpersonateUser: config.orderEntryImpersonateUser
};
