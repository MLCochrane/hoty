import { givenHttpServerConfig, Client, supertest } from '@loopback/testlab';
import { HotyApplication } from '../../application';
import { ExpressServer } from '../../server';

export async function setupApplication(): Promise<AppWithClient> {
  const server = new ExpressServer({ rest: givenHttpServerConfig() });
  await server.boot();
  await server.start();

  const app = server.lbApp;

  const client = supertest('http://127.0.0.1:3000');

  return { server, client, app };
}

export interface AppWithClient {
  server: ExpressServer;
  client: Client;
  app: HotyApplication;
}