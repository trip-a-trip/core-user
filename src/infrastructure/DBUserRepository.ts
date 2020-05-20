import { inject, injectable } from 'tsyringe';
import { Connection } from 'typeorm';

import { UserRepository } from '&app/domain/UserRepository';
import { dbConnectionToken } from '&app/external/dbConnection';

import { USER_TABLE } from './TABLES';

@injectable()
export class DbUserRepository implements UserRepository {
  constructor(
    @inject(dbConnectionToken)
    private readonly db: Promise<Connection>,
  ) {}

  count = async (): Promise<number> => {
    const connection = await this.db;

    const result = await connection.query(`SELECT count(*) from ${USER_TABLE}`);

    try {
      const { count } = result[0];

      return count;
    } catch (error) {
      return 0;
    }
  };
}
