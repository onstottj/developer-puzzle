import { TestBed } from '@angular/core/testing';
import { PriceQuery } from '../../../data-access-price-query/src/lib/+state/price-query.type';
import { PriceForList, StockListService } from './stock-list.service';

describe('StockListService', () => {
  let service: StockListService;

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    service = TestBed.get(StockListService);
    expect(service).toBeTruthy();
  });

  it('should get average stock price by month', function() {
    const prices: PriceQuery[] = [
      { date: '2018-03-27', close: 169 } as PriceQuery,
      { date: '2018-03-28', close: 174 } as PriceQuery,
      { date: '2018-03-29', close: 170 } as PriceQuery,
      { date: '2018-04-01', close: 180 } as PriceQuery,
      { date: '2018-04-02', close: 197 } as PriceQuery
    ];

    const pricesForList: PriceForList[] = service.getPricesForList(prices);

    expect(pricesForList).toEqual([
      { dateLabel: 'March 2018', averagePrice: 171 },
      { dateLabel: 'April 2018', averagePrice: 188.5 }
    ]);
  });

  it('should group prices by month', function() {
    const prices: PriceQuery[] = [
      { date: '2018-03-27', close: 169 } as PriceQuery,
      { date: '2018-03-28', close: 174 } as PriceQuery,
      { date: '2018-03-29', close: 170 } as PriceQuery,
      { date: '2018-04-01', close: 180 } as PriceQuery,
      { date: '2018-04-02', close: 197 } as PriceQuery
    ];

    const pricesByMonth = service.getPricesByMonth(prices);

    const expectedPrices = new Map<string, number[]>();
    expectedPrices.set('March 2018', [169, 174, 170]);
    expectedPrices.set('April 2018', [180, 197]);
    expect(pricesByMonth).toEqual(expectedPrices);
  });

  it('should determine the average price from an array of stock prices', function() {
    const prices = [150, 170, 140, 145];

    const averagePrice = service.getAveragePrice(prices);

    expect(averagePrice).toBe(151.25);
  });
});
