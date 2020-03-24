import { PriceQueryAction, PriceQueryActionTypes } from './price-query.actions';
import { transformPriceQueryResponse } from './price-query-transformer.util';
import { PriceQuery } from './price-query.type';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const PRICEQUERY_FEATURE_KEY = 'priceQuery';

export interface PriceQueryState extends EntityState<PriceQuery> {
  selectedSymbol: string;
}

export function sortByDateNumeric(a: PriceQuery, b: PriceQuery): number {
  return a.dateNumeric - b.dateNumeric;
}

export const priceQueryAdapter: EntityAdapter<PriceQuery> = createEntityAdapter<
  PriceQuery
>({
  selectId: (priceQuery: PriceQuery) => priceQuery.dateNumeric,
  sortComparer: sortByDateNumeric
});

export interface PriceQueryPartialState {
  readonly [PRICEQUERY_FEATURE_KEY]: PriceQueryState;
}

export const initialState: PriceQueryState = priceQueryAdapter.getInitialState({
  selectedSymbol: ''
});

export function priceQueryReducer(
  state: PriceQueryState = initialState,
  action: PriceQueryAction
): PriceQueryState {
  switch (action.type) {
    case PriceQueryActionTypes.PriceQueryFetched: {
      const clearedState = priceQueryAdapter.removeAll(state);
      const priceQueries = transformPriceQueryResponse(action.queryResults);
      return priceQueryAdapter.addAll(priceQueries, clearedState);
    }
    case PriceQueryActionTypes.SelectSymbol: {
      return {
        ...state,
        selectedSymbol: action.symbol
      };
    }
  }
  return state;
}
