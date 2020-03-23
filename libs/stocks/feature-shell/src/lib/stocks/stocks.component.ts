import { Component, OnInit } from '@angular/core';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { ChartOptions } from '@coding-challenge/shared/ui/chart';
import { map } from 'rxjs/operators';
import { StockListService } from '../stock-list.service';
import { StockPickerSelection } from '../stock-picker/stock-picker.component';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  pricesForChart$ = this.priceQuery.priceQueries$.pipe(
    map(prices => prices.map(priceQuery => [priceQuery.date, priceQuery.close]))
  );
  pricesForList$ = this.priceQuery.priceQueries$.pipe(
    map(prices => this.stockListService.getPricesForList(prices))
  );

  chartOptions: ChartOptions = {
    title: '',
    type: 'LineChart',
    data: [],
    columnNames: ['period', 'close'],
    options: { title: `Stock price`, width: '600', height: '400' }
  };

  constructor(
    public priceQuery: PriceQueryFacade,
    private stockListService: StockListService
  ) {}

  ngOnInit() {}

  fetchQuote({ symbol, period }: StockPickerSelection) {
    this.priceQuery.selectSymbol(symbol);
    this.priceQuery.fetchQuote(symbol, period);
  }
}
