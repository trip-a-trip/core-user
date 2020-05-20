import { inject, injectable } from 'tsyringe';
import Knex from 'knex';

import { queryBuilderToken } from '&app/external/queryBuilder';
import { UserStorage } from '&app/domain/UserStorage';

import { USER_TABLE } from './TABLES';

@injectable()
export class DbUserStorage implements UserStorage {
  constructor(
    @inject(queryBuilderToken)
    private readonly qb: Knex,
  ) {}

  saveNewUser = async (id: string): Promise<void> => {
    await this.qb.insert({ id }).table(USER_TABLE);
  };
}
