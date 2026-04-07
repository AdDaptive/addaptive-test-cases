import fs from 'node:fs';
import path from 'node:path';
import { config as loadDotEnvFile } from 'dotenv';

let loaded = false;

type EnvFile = {
  path: string;
  override: boolean;
};

export function loadEnv(): void {
  if (loaded) {
    return;
  }

  for (const envFile of getEnvFiles()) {
    if (fs.existsSync(envFile.path)) {
      loadDotEnvFile({ path: envFile.path, override: envFile.override });
    }
  }

  loaded = true;
}

function getEnvFiles(): EnvFile[] {
  const cwd = process.cwd();
  const envName = resolveRequestedEnvName();
  const explicitEnvFile = normalizeValue(process.env.ADDAPTIVE_ENV_FILE);
  const files: EnvFile[] = [{ path: path.resolve(cwd, '.env'), override: false }];

  if (envName) {
    files.push({ path: path.resolve(cwd, `.env.${envName}`), override: true });
  }

  files.push({ path: path.resolve(cwd, '.env.local'), override: true });

  if (envName) {
    files.push({ path: path.resolve(cwd, `.env.${envName}.local`), override: true });
  }

  if (explicitEnvFile) {
    files.push({ path: path.resolve(cwd, explicitEnvFile), override: true });
  }

  return files;
}

function resolveRequestedEnvName(): string | undefined {
  const explicitEnv = normalizeValue(process.env.ADDAPTIVE_ENV);
  if (explicitEnv) {
    return explicitEnv;
  }

  const inferredEnv = inferDefaultEnvNameFromArgs(process.argv);
  if (inferredEnv) {
    process.env.ADDAPTIVE_ENV = inferredEnv;
  }

  return inferredEnv;
}

function inferDefaultEnvNameFromArgs(argv: string[]): string | undefined {
  const args = argv.map((value) => value.toLowerCase());

  if (matchesAny(args, ['insight-studio'])) {
    return 'dev';
  }

  if (
    matchesAny(args, [
      'tests/frontend/audience-',
      'tests/frontend/audiences-',
      'tests/generated/frontend/audiences/',
      'tests/backend/',
      'tests/api/',
      'order-entry',
      'tests/generated/frontend/orders/'
    ])
  ) {
    return 'ali';
  }

  return undefined;
}

function matchesAny(haystack: string[], patterns: string[]): boolean {
  return haystack.some((value) => patterns.some((pattern) => value.includes(pattern)));
}

function normalizeValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function requiredProcessEnv(name: string): string {
  loadEnv();
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
