import 'reflect-metadata';
import { container } from 'tsyringe';
import { Configuration } from '@solid-soda/config';

import { HttpEntrypoint } from './presentation/http/HttpEntrypoint';
import { config } from './external/config';
import { UserStorage } from './domain/UserStorage';
import { UserRepository } from './domain/UserRepository';
import { DbUserStorage } from './infrastructure/DBUserStorage';
import { DbUserRepository } from './infrastructure/DBUserRepository';
import { dbConnectionToken, createDbConnection } from './external/dbConnection';

container.registerInstance(Configuration as any, config);
container.register(dbConnectionToken, {
  useFactory: (c) => {
    return createDbConnection(c.resolve(Configuration as any));
  },
});

container.register<UserStorage>(UserStorage as any, {
  useClass: DbUserStorage,
});
container.register<UserRepository>(UserRepository as any, {
  useClass: DbUserRepository,
});

container.resolve(HttpEntrypoint).start();
