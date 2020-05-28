import { singleton } from 'tsyringe';
import fastify, { FastifyInstance } from 'fastify';
import { Configuration } from '@solid-soda/config';

import { Controller } from './Controller';
import { SignUpController } from './SignUpController';
import { CountController } from './CountController';

@singleton()
export class HttpEntrypoint {
  private readonly app: FastifyInstance;

  private readonly port: number;

  constructor(
    config: Configuration,
    signUp: SignUpController,
    count: CountController,
  ) {
    const controllers: Controller[] = [signUp, count];

    this.app = fastify({ logger: true });

    controllers.forEach((controller) => {
      this.app.route({
        method: controller.method,
        url: controller.route,
        handler: controller.handle,
      });
    });

    this.port = config.getNumberOrElse('PORT', 3000);
  }

  start = async () => {
    this.app.listen(this.port, '0.0.0.0');
    console.log('Server started');
  };
}
