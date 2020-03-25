import * as Wreck from '@hapi/wreck';
import { Server } from 'hapi';
import { environment } from './environments/environment';

export const server = new Server({
  port: 3333,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['http://localhost:4200']
    }
  }
});

const getStocksUrl = (cacheKey: string) => {
  const [symbol, period] = cacheKey.split('|');
  const { apiUrl, apiKey } = environment;
  return `${apiUrl}/stock/${symbol}/chart/${period}?token=${apiKey}`;
};

const retrieveStocks = async (cacheKey: string | { id: string }) => {
  const url = getStocksUrl(cacheKey as string);
  const result = await Wreck.get(url);
  return result.payload;
};

const stockPricesCache = server.cache({
  generateFunc: retrieveStocks,
  generateTimeout: 10_000,
  expiresIn: 5 * 60_000,
  segment: 'stockPrices'
});

server.route({
  method: 'GET',
  path: '/stocks/{symbol}/{period}',
  handler: async request => {
    const symbol = request.params.symbol;
    const period = request.params.period;
    const cacheResult: any = await stockPricesCache.get(`${symbol}|${period}`);
    if (cacheResult.type === 'Buffer') {
      return Buffer.from(cacheResult);
    } else {
      return cacheResult;
    }
  }
});

export const init = async () => {
  await server.initialize();
  return server;
};

export const start = async () => {
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});
