import 'reflect-metadata';
import { container } from 'tsyringe';
import { Configuration } from '@solid-soda/config';

import { HttpEntrypoint } from './presentation/http/HttpEntrypoint';
import { config } from './external/config';
import { UserStorage } from './domain/UserStorage';
import { DbUserStorage } from './infrastructure/DBUserStorage';

container.registerInstance(Configuration as any, config);

container.register<UserStorage>(UserStorage as any, {
  useClass: DbUserStorage,
});

container.resolve(HttpEntrypoint).start();
