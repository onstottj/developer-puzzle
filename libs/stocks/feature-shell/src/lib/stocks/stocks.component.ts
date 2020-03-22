import { Component, OnInit } from '@angular/core';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { ChartOptions } from '../../../../../shared/ui/chart/src/lib/chart/chart.component';
import { StockPickerSelection } from '../stock-picker/stock-picker.component';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
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
