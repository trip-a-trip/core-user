import { singleton } from 'tsyringe';
import { RequestHandler } from 'fastify';

import { Registrator } from '&app/domain/Registrator';
import { Notificator } from '&app/application/Notificator';

import { Controller } from './Controller';
import { HttpMethod } from './HttpMethod';

@singleton()
export class SignUpController implements Controller {
  constructor(
    private readonly registrator: Registrator,
    private readonly notificator: Notificator,
  ) {}

  method = HttpMethod.Post;

  route = '/v1/sign-up';

  handle: RequestHandler = async (_, reply) => {
    const userId = await this.registrator.registerUser();

    await this.notificator.notifyAboutNewUser();

    reply.code(201).send({ userId });
  };
}
