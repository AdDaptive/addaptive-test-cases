import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { config } from './config';

export type AddaptiveDbConfig = {
  host: string;
  port: string;
  database: string;
  user: string;
  password: string;
};

type QueryMode = 'single' | 'many';

export function getAddaptiveDbConfig(): AddaptiveDbConfig {
  if (!config.dbHost || !config.dbPort || !config.dbName || !config.dbUser || !config.dbPassword) {
    throw new Error(
      'Missing required database configuration. Set ADDAPTIVE_DB_HOST, ADDAPTIVE_DB_PORT, ADDAPTIVE_DB_NAME, ADDAPTIVE_DB_USER, and ADDAPTIVE_DB_PASSWORD in .env.'
    );
  }

  return {
    host: config.dbHost,
    port: config.dbPort,
    database: config.dbName,
    user: config.dbUser,
    password: config.dbPassword
  };
}

export function sqlLiteral(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

function runPgQuery<T>(query: string, mode: QueryMode): T {
  const config = getAddaptiveDbConfig();
  const runnerPath = path.resolve(process.cwd(), 'utils/run-pg-query.cjs');
  const request = JSON.stringify({
    connection: config,
    query,
    mode
  });
  const output = execFileSync(
    process.execPath,
    [runnerPath, request],
    {
      encoding: 'utf8'
    }
  );

  return JSON.parse(output || (mode === 'many' ? '[]' : 'null')) as T;
}

export function querySingleJson<T>(query: string): T | null {
  const wrappedQuery = `select row_to_json(q) as payload from (${query}) q;`;
  return runPgQuery<T | null>(wrappedQuery, 'single');
}

export function queryJson<T>(query: string): T {
  const wrappedQuery = `select coalesce(json_agg(q), '[]'::json) as payload from (${query}) q;`;
  return runPgQuery<T>(wrappedQuery, 'many');
}
