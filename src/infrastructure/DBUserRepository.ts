import { UserRepository } from '&app/domain/UserRepository';

export class DbUserRepository extends UserRepository {
  count = async (): Promise<number> => {
    // TODO: write code here
    return 0;
  };
}
