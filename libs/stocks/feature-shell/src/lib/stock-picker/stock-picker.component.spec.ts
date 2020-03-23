import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiCustomMaterialModule } from '@coding-challenge/shared/ui/custom-material';
import moment from 'moment';
import { StockPickerComponent } from './stock-picker.component';

describe('StockPickerComponent', () => {
  let component: StockPickerComponent;
  let fixture: ComponentFixture<StockPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockPickerComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        SharedUiCustomMaterialModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPickerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('listenForInvalidDates()', function() {
    it('should fix dates when the From control is changed', fakeAsync(() => {
      spyOn(component, 'fixInvalidDates');
      component.ngOnInit();
      component.stockPickerForm.get('fromDate').setValue(moment());

      tick();

      expect(component.fixInvalidDates).toHaveBeenCalled();
    }));

    it('should fix dates when the To control is changed', fakeAsync(() => {
      spyOn(component, 'fixInvalidDates');
      component.ngOnInit();
      component.stockPickerForm.get('toDate').setValue(moment());

      tick();

      expect(component.fixInvalidDates).toHaveBeenCalled();
    }));

    it('should not do anything when the symbol is changed', fakeAsync(() => {
      spyOn(component, 'fixInvalidDates');
      component.ngOnInit();
      component.stockPickerForm.get('symbol').setValue('MSFT');

      tick();

      expect(component.fixInvalidDates).not.toHaveBeenCalled();
    }));
  });

  it('should emit stock and period selections', function() {
    spyOn(component.select, 'emit');
    spyOn(component, 'listenForInvalidDates');
    component.ngOnInit();
    const tenDaysAgo = moment().subtract(10, 'day');
    const fiveDaysAgo = moment().subtract(5, 'day');
    component.stockPickerForm.setValue({
      symbol: 'AAPL',
      fromDate: tenDaysAgo,
      toDate: fiveDaysAgo
    });

    component.selectStock();

    expect(component.select.emit).toHaveBeenCalledWith({
      symbol: 'AAPL',
      fromDate: tenDaysAgo,
      toDate: fiveDaysAgo
    });
  });
});
