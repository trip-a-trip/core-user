import Knex from 'knex';
import { inject, injectable } from 'tsyringe';

import { UserRepository } from '&app/domain/UserRepository';
import { queryBuilderToken } from '&app/external/queryBuilder';

import { USER_TABLE } from './TABLES';

@injectable()
export class DbUserRepository implements UserRepository {
  constructor(
    @inject(queryBuilderToken)
    private readonly qb: Knex,
  ) {}

  count = async (): Promise<number> => {
    const result = await this.qb.table(USER_TABLE).count().first();

    if (!result) {
      return 0;
    }

    return Number(result.count);
  };
}
