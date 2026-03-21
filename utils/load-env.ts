import fs from 'node:fs';
import path from 'node:path';
import { config as loadDotEnvFile } from 'dotenv';

let loaded = false;

export function loadEnv(): void {
  if (loaded) {
    return;
  }

  const baseEnvFile = path.resolve(process.cwd(), '.env');
  const localEnvFile = path.resolve(process.cwd(), '.env.local');

  if (fs.existsSync(baseEnvFile)) {
    loadDotEnvFile({ path: baseEnvFile, override: false });
  }

  if (fs.existsSync(localEnvFile)) {
    loadDotEnvFile({ path: localEnvFile, override: true });
  }

  loaded = true;
}

export function requiredProcessEnv(name: string): string {
  loadEnv();
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
