const { Client } = require('pg');

async function main() {
  const requestRaw = process.argv[2];
  if (!requestRaw) {
    throw new Error('Missing query request payload.');
  }

  const request = JSON.parse(requestRaw);
  const connection = request.connection || {};
  const query = String(request.query || '');
  const mode = request.mode;

  const client = new Client({
    host: connection.host,
    port: Number(connection.port),
    database: connection.database,
    user: connection.user,
    password: connection.password
  });

  await client.connect();
  try {
    const result = await client.query(query);
    const payload = result.rows[0] ? result.rows[0].payload : mode === 'many' ? [] : null;
    process.stdout.write(JSON.stringify(payload));
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack || error.message : String(error)}\n`);
  process.exit(1);
});
