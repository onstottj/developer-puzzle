import { Injectable } from '@angular/core';
import moment, { Moment } from 'moment';
import { PriceQuery } from '@coding-challenge/stocks/data-access-price-query';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  constructor() {}

  filterPriceData(
    prices: PriceQuery[],
    fromDate: Moment,
    toDate: Moment
  ): PriceQuery[] {
    return prices.filter(priceData => {
      // '[]' allows the filter to match dates that fall on the From or To dates
      return moment(priceData.date).isBetween(fromDate, toDate, 'day', '[]');
    });
  }
}
