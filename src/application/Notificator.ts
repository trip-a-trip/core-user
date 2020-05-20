import { singleton } from 'tsyringe';

import { UserRepository } from '&app/domain/UserRepository';
import { NotifyClient } from '&app/infrastructure/NotifyClient';

@singleton()
export class Notificator {
  constructor(
    private readonly repo: UserRepository,
    private readonly notify: NotifyClient,
  ) {}

  notifyAboutNewUser = async (): Promise<void> => {
    const count = await this.repo.count();

    const message = ['New user!', `Total: ${count}`].join('\n');

    await this.notify.send(message);
  };
}
