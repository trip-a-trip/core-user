import { Configuration } from '@solid-soda/config';
import { createConnection } from 'typeorm';
import { join, dirname } from 'path';
import { readFileSync } from 'fs';

export const dbConnectionToken = Symbol('queryBuilder');

export const createDbConnection = (config: Configuration) => {
  const certPath = join(
    dirname(process.cwd()),
    '.secure',
    'ca-certificate.txt',
  );

  const createSslConfig = config.isProd()
    ? () => ({ ca: readFileSync(certPath).toString() })
    : () => undefined;

  return createConnection({
    type: 'postgres',
    host: config.getStringOrThrow('DB_HOST'),
    username: config.getStringOrThrow('DB_USER'),
    password: config.getStringOrThrow('DB_PASSWORD'),
    database: config.getStringOrThrow('DB_NAME'),
    ssl: createSslConfig(),
  });
};
