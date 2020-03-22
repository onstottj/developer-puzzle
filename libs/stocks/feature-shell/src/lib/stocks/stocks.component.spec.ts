import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { SharedUiCustomMaterialModule } from '@coding-challenge/shared/ui/custom-material';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { provideMockStore } from '@ngrx/store/testing';
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
      providers: [PriceQueryFacade, provideMockStore()]
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
});
