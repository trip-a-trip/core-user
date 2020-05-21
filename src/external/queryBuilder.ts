import { Configuration } from '@solid-soda/config';
import knex from 'knex';
import { join, dirname } from 'path';
import { readFileSync } from 'fs';

export const queryBuilderToken = Symbol('queryBuilder');

export const createQueryBuilder = (config: Configuration) => {
  const certPath = join(
    dirname(process.cwd()),
    '.secure',
    'ca-certificate.txt',
  );

  const createSslConfig = config.isProd()
    ? () => ({ ca: readFileSync(certPath).toString() })
    : () => undefined;

  return knex({
    client: 'pg',
    connection: {
      host: config.getStringOrThrow('DB_HOST'),
      user: config.getStringOrThrow('DB_USER'),
      password: config.getStringOrThrow('DB_PASSWORD'),
      database: config.getStringOrThrow('DB_NAME'),
      port: config.getNumberOrThrow('DB_PORT'),
      ssl: createSslConfig(),
    },
  });
};
