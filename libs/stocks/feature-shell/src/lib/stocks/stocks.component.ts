import { Component, OnInit } from '@angular/core';
import { ChartOptions } from '@coding-challenge/shared/ui/chart';
import {
  PriceQuery,
  PriceQueryFacade
} from '@coding-challenge/stocks/data-access-price-query';
import { Moment } from 'moment';
import { combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { StockPickerSelection } from '../stock-picker/stock-picker.component';
import { StocksService } from './stocks.service';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  private priceQueries$ = this.priceQuery.priceQueries$;
  private fromDate$ = new Subject<Moment>();
  private toDate$ = new Subject<Moment>();

  chartData$ = combineLatest(
    this.priceQueries$,
    this.fromDate$,
    this.toDate$
  ).pipe(
    map(([prices, fromDate, toDate]) => {
      return this.stockService.filterPriceData(prices, fromDate, toDate);
    }),
    map((prices: PriceQuery[]) =>
      prices.map(price => [price.date, price.close])
    )
  );

  chartOptions: ChartOptions = {
    title: '',
    type: 'LineChart',
    data: [],
    columnNames: ['period', 'close'],
    options: { title: `Stock price`, width: '600', height: '400' }
  };

  constructor(
    private priceQuery: PriceQueryFacade,
    private stockService: StocksService
  ) {}

  ngOnInit() {}

  fetchQuote({ symbol, fromDate, toDate }: StockPickerSelection) {
    this.priceQuery.fetchQuote(symbol);
    this.fromDate$.next(fromDate);
    this.toDate$.next(toDate);
  }
}
