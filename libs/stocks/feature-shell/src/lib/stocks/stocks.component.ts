import { Component, OnInit } from '@angular/core';
import { ChartOptions } from '@coding-challenge/shared/ui/chart';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { StockPickerSelection } from '../stock-picker-selection';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  symbol: string;
  period: string;

  quotes$ = this.priceQuery.priceQueries$;

  chartOptions: ChartOptions = {
    title: '',
    type: 'LineChart',
    data: [],
    columnNames: ['period', 'close'],
    options: { title: `Stock price`, width: '600', height: '400' }
  };

  constructor(private priceQuery: PriceQueryFacade) {}

  ngOnInit() {}

  fetchQuote({ symbol, period }: StockPickerSelection) {
    this.priceQuery.fetchQuote(symbol, period);
  }
}
