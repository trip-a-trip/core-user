import { inject, injectable } from 'tsyringe';
import { Connection } from 'typeorm';

import { UserStorage } from '&app/domain/UserStorage';
import { dbConnectionToken } from '&app/external/dbConnection';

import { USER_TABLE } from './TABLES';

@injectable()
export class DbUserStorage implements UserStorage {
  constructor(
    @inject(dbConnectionToken)
    private readonly db: Connection,
  ) {}

  saveNewUser = async (id: string): Promise<void> => {
    await this.db
      .createQueryBuilder()
      .insert()
      .into(USER_TABLE)
      .values({ id })
      .execute();
  };
}
