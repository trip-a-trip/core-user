import { singleton } from 'tsyringe';
import { RequestHandler } from 'fastify';

import { UserRepository } from '&app/domain/UserRepository';

import { Controller } from './Controller';
import { HttpMethod } from './HttpMethod';

@singleton()
export class CountController implements Controller {
  constructor(private readonly repo: UserRepository) {}

  method = HttpMethod.Get;

  route = '/v1/count';

  handle: RequestHandler = async (_, reply) => {
    const count = await this.repo.count();

    return { count };
  };
}
