import { Injectable } from '@angular/core';
import moment from 'moment';
import { PriceQuery } from '@coding-challenge/stocks/data-access-price-query';

export interface PriceForList {
  dateLabel: string;
  averagePrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockListService {
  constructor() {}

  getPricesForList(priceQuery: PriceQuery[]): PriceForList[] {
    const pricesByMonth = this.getPricesByMonth(priceQuery);
    const pricesByMonthArray = Array.from(pricesByMonth.entries());
    return pricesByMonthArray.map(([dateLabel, prices]) => ({
      dateLabel,
      averagePrice: this.getAveragePrice(prices)
    }));
  }

  getPricesByMonth(priceQuery: PriceQuery[]): Map<string, number[]> {
    const pricesByMonth = new Map<string, number[]>();
    priceQuery.forEach(entry => {
      const dateLabel = moment(entry.date)
        .startOf('month')
        .format('MMMM YYYY');
      const previousPrices = pricesByMonth.get(dateLabel) || [];
      pricesByMonth.set(dateLabel, [...previousPrices, entry.close]);
    });
    return pricesByMonth;
  }

  getAveragePrice(prices: number[]): number {
    const total = prices.reduce((previous, current) => previous + current, 0);
    return total / prices.length;
  }
}
