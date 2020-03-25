import { Server } from 'hapi';
import { init } from '../server';

describe('GET stocks', function() {
  let server: Server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('should retrieve sample stocks', async () => {
    const response = await server.inject({
      method: 'get',
      url: '/stocks/AAPL/1m'
    });
    expect(response.statusCode).toBe(200);
  });
});
