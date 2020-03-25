import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { skip } from 'rxjs/operators';
import { FetchPriceQuery } from './price-query.actions';
import { PriceQueryPartialState } from './price-query.reducer';
import { getAllPriceQueries, getSelectedSymbol } from './price-query.selectors';

@Injectable()
export class PriceQueryFacade {
  selectedSymbol$ = this.store.pipe(select(getSelectedSymbol));
  priceQueries$ = this.store.pipe(
    select(getAllPriceQueries),
    skip(1)
  );

  constructor(private store: Store<PriceQueryPartialState>) {}

  fetchQuote(symbol: string) {
    this.store.dispatch(new FetchPriceQuery(symbol));
  }
}
