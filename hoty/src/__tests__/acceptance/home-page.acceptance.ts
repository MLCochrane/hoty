import { Client } from '@loopback/testlab';
import { setupApplication } from './test-helper';
import { ExpressServer } from '../../server';

describe('ExpressApplication', () => {
  let server: ExpressServer;
  let client: Client;

  before('setupApplication', async () => {
    ({ server, client } = await setupApplication());
  });

  after('closes application', async () => {
    await server.stop();
  });

  it('redirects to "api/explorer" from "api/explorer"', async () => {
    await client
      .get('/api/explorer')
      .expect(301)
      .expect('location', '/api/explorer/');
  });

  it('displays explorer page', async () => {
    await client
      .get('/api/explorer/')
      .expect(200)
      .expect('content-type', /html/)
      .expect(/url\: '\/api\/openapi\.json'\,/)
      .expect(/<title>LoopBack API Explorer/);
  });
});