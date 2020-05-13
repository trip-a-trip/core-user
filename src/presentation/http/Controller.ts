import { RequestHandler } from 'fastify';

import { HttpMethod } from './HttpMethod';

export interface Controller {
  method: HttpMethod;
  route: string;
  handle: RequestHandler;
}
