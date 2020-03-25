import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { SharedUiCustomMaterialModule } from '@coding-challenge/shared/ui/custom-material';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { StockPickerComponent } from '../stock-picker/stock-picker.component';
import { StocksListComponent } from '../stocks-list/stocks-list.component';
import { StocksComponent } from './stocks.component';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StocksComponent,
        StockPickerComponent,
        StocksListComponent
      ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        SharedUiChartModule,
        SharedUiCustomMaterialModule
      ],
      providers: [
        provideMockStore(),
        {
          provide: PriceQueryFacade,
          useClass: class {
            selectedSymbol$ = of([]);
            pricesForChart$ = of([]);
            priceQueries$ = of([]);
            selectSymbol = jasmine.createSpy('selectSymbol');
            fetchQuote = jasmine.createSpy('fetchQuote');
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch actions to set the selected symbol and fetch stock prices', function() {
    component.stockSelected({ symbol: 'AAPL', period: '5y' });

    expect(component.priceQuery.selectSymbol).toHaveBeenCalledWith('AAPL');
    expect(component.priceQuery.fetchQuote).toHaveBeenCalledWith('AAPL', '5y');
  });
});
