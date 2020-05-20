import { singleton } from 'tsyringe';
import { Configuration } from '@solid-soda/config';
import axios from 'axios';

@singleton()
export class NotifyClient {
  private readonly userId: string;

  private readonly notifyUrl: string;

  constructor(config: Configuration) {
    this.userId = config.getStringOrThrow('NOTIFY_USER_ID');
    this.notifyUrl = config.getStringOrThrow('NOTIFY_URL');
  }

  send = async (message: string): Promise<void> => {
    const payload = {
      user: this.userId,
      message: {
        medium: 'service',
        from: 'core-user',
        name: 'production',
        text: message,
      },
    };

    await axios.post(`${this.notifyUrl}/v0/telegram`, payload);
  };
}
