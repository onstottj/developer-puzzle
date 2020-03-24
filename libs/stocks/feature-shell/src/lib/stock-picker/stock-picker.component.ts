import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'moment';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StockPickerService } from './stock-picker.service';

export interface StockPickerSelection {
  symbol: string;
  fromDate: Moment;
  toDate: Moment;
}

@Component({
  selector: 'coding-challenge-stock-picker',
  templateUrl: './stock-picker.component.html',
  styleUrls: ['./stock-picker.component.css']
})
export class StockPickerComponent implements OnInit, OnDestroy {
  @Output()
  select = new EventEmitter<StockPickerSelection>();

  stockPickerForm: FormGroup;
  errorMessage = '';
  private unsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private stockPickerService: StockPickerService
  ) {}

  ngOnInit() {
    this.createForm();
    this.listenForInvalidDates();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  createForm() {
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });
  }

  listenForInvalidDates() {
    merge(
      this.stockPickerForm.get('fromDate').valueChanges,
      this.stockPickerForm.get('toDate').valueChanges
    )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.fixInvalidDates());
  }

  fixInvalidDates() {
    this.errorMessage = '';

    const fromControl = this.stockPickerForm.get('fromDate');
    const isFromFixed = this.stockPickerService.fixFutureDate(fromControl);
    if (isFromFixed) {
      this.errorMessage +=
        "The From date can't be in the future; it has been reset to today. ";
    }

    const toControl = this.stockPickerForm.get('toDate');
    const isToFixed = this.stockPickerService.fixFutureDate(toControl);
    if (isToFixed) {
      this.errorMessage +=
        "The To date can't be in the future; it has been reset to today. ";
    }

    const isDateRangeFixed = this.stockPickerService.fixToBeforeFrom(
      fromControl,
      toControl
    );
    if (isDateRangeFixed) {
      this.errorMessage +=
        "The To date can't be before From, so it has been reset to match From. ";
    }
  }

  selectStock() {
    if (this.stockPickerForm.valid) {
      const { symbol, fromDate, toDate } = this.stockPickerForm.value;
      this.select.emit({
        symbol,
        fromDate,
        toDate
      });
    }
  }
}
