import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import moment from 'moment';
import { StockPickerService } from './stock-picker.service';

describe('StockPickerService', () => {
  let service: StockPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(StockPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fixFutureDate()', function() {
    it('should allow dates in the past', function() {
      const threeDaysAgo = moment().subtract(3, 'day');
      const control = new FormControl(threeDaysAgo);

      const isFixed = service.fixFutureDate(control);

      expect(isFixed).toBeFalsy();
      expect(control.value).toBe(threeDaysAgo);
    });

    it('should allow a date of today', function() {
      const today = moment();
      const control = new FormControl(today);

      const isFixed = service.fixFutureDate(control);

      expect(isFixed).toBeFalsy();
      expect(control.value).toBe(today);
    });

    it('should fix future dates', function() {
      const tomorrow = moment().add(1, 'day');
      const control = new FormControl(tomorrow);

      const isFixed = service.fixFutureDate(control);

      expect(isFixed).toBeTruthy();
      const today = moment();
      expect(today.isSame(control.value, 'day')).toBeTruthy();
    });
  });

  describe('fixToBeforeFrom()', function() {
    it('should allow the To date to be after From', function() {
      const fiveDaysAgo = moment().subtract(5, 'day');
      const yesterday = moment().subtract(1, 'day');
      const fromControl = new FormControl(fiveDaysAgo);
      const toControl = new FormControl(yesterday);

      const isFixed = service.fixToBeforeFrom(fromControl, toControl);

      expect(isFixed).toBeFalsy();
      expect(fromControl.value).toBe(fiveDaysAgo);
      expect(toControl.value).toBe(yesterday);
    });

    it('should allow To to be equal to From', function() {
      const threeDaysAgo = moment().subtract(3, 'day');
      const fromControl = new FormControl(threeDaysAgo);
      const toControl = new FormControl(threeDaysAgo);

      const isFixed = service.fixToBeforeFrom(fromControl, toControl);

      expect(isFixed).toBeFalsy();
      expect(fromControl.value).toBe(threeDaysAgo);
      expect(toControl.value).toBe(threeDaysAgo);
    });

    it('should set the To date to the From date, when To is before From', function() {
      const threeDaysAgo = moment().subtract(3, 'day');
      const fiveDaysAgo = moment().subtract(5, 'day');
      const fromControl = new FormControl(threeDaysAgo);
      const toControl = new FormControl(fiveDaysAgo);

      const isFixed = service.fixToBeforeFrom(fromControl, toControl);

      expect(isFixed).toBeTruthy();
      expect(fromControl.value).toBe(threeDaysAgo);
      expect(toControl.value).toBe(threeDaysAgo);
    });
  });
});
