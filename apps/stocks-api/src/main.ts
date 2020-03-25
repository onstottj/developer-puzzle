/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import * as Wreck from '@hapi/wreck';
import { Server } from 'hapi';
import { createStockPricesCache } from './stocks';

const apiUrl = 'https://sandbox.iexapis.com/beta';

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['http://localhost:4200']
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/stocks/{symbol}/{period}',
    handler: async (request, h) => {
      const symbol = request.params.symbol;
      const period = request.params.period;
      const token = request.query.token;
      const result = await Wreck.get(
        `${apiUrl}/stock/${symbol}/chart/${period}?token=${token}`
      );
      // stockPricesCache.get(`AAPL`);
      return result.payload;
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
