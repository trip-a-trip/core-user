import { singleton } from 'tsyringe';
import uid from 'uid';

import { UserStorage } from './UserStorage';

@singleton()
export class Registrator {
  constructor(private readonly userStore: UserStorage) {}

  registerUser = async () => {
    const userId = uid();

    await this.userStore.saveNewUser(userId);

    return userId;
  };
}
