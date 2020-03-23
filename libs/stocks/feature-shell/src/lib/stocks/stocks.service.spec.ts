import { TestBed } from '@angular/core/testing';
import moment from 'moment';
import { PriceQuery } from '@coding-challenge/stocks/data-access-price-query';
import { StocksService } from './stocks.service';

describe('StocksService', () => {
  let service: StocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(StocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should filter stock prices using From and To dates', function() {
    const marchFirst = { date: '2015-01-01', close: 150 } as PriceQuery;
    const marchFifth = { date: '2015-03-05', close: 165 } as PriceQuery;
    const prices: PriceQuery[] = [
      { date: '2010-01-01', close: 150 } as PriceQuery,
      marchFirst,
      marchFifth,
      { date: '2020-01-01', close: 150 } as PriceQuery
    ];

    const filteredPrices = service.filterPriceData(
      prices,
      moment('2015-01-01'),
      moment('2015-12-31')
    );

    expect(filteredPrices).toEqual([marchFirst, marchFifth]);
  });
});
