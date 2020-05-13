import { singleton } from 'tsyringe';
import { RequestHandler } from 'fastify';

import { Registrator } from '&app/domain/Registrator';

import { Controller } from './Controller';
import { HttpMethod } from './HttpMethod';

@singleton()
export class SignUpController implements Controller {
  constructor(private readonly registrator: Registrator) {}

  method = HttpMethod.Post;
  route = '/v1/sign-up';

  handle: RequestHandler = async (_, reply) => {
    const userId = await this.registrator.registerUser();

    reply.code(201).send({ userId });
  };
}
