import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface StockPickerSelection {
  symbol: string;
  period: string;
}

@Component({
  selector: 'coding-challenge-stock-picker',
  templateUrl: './stock-picker.component.html',
  styleUrls: ['./stock-picker.component.css']
})
export class StockPickerComponent implements OnInit {
  @Output()
  select = new EventEmitter<StockPickerSelection>();

  stockPickerForm: FormGroup;

  timePeriods = [
    { viewValue: 'All available data', value: 'max' },
    { viewValue: 'Five years', value: '5y' },
    { viewValue: 'Two years', value: '2y' },
    { viewValue: 'One year', value: '1y' },
    { viewValue: 'Year-to-date', value: 'ytd' },
    { viewValue: 'Six months', value: '6m' },
    { viewValue: 'Three months', value: '3m' },
    { viewValue: 'One month', value: '1m' }
  ];

  constructor(private fb: FormBuilder) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.stockPickerForm.valueChanges.subscribe(this.selectStock);
  }

  selectStock() {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.select.emit({
        symbol,
        period
      });
    }
  }
}
