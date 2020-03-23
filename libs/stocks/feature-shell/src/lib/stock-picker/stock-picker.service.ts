import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import moment, { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class StockPickerService {
  constructor() {}

  /**
   * This ensures that the FormControl's date isn't in the future (if it is, it is reset to today).
   * @param control The FormControl to examine
   * @returns {boolean} true if the date was fixed
   */
  fixFutureDate(control: AbstractControl): boolean {
    const date: Moment = control.value;
    const today = moment();
    const isFixNeeded = date && date.isAfter(today, 'day');
    if (isFixNeeded) {
      // emitEvent is false so that we don't trigger valueChanges again
      control.setValue(today, { emitEvent: false });
    }
    return isFixNeeded;
  }

  /**
   * If the To date is before From, this sets it to the From date.
   * @param fromControl The From FormControl
   * @param toControl The To FormControl
   * @returns {boolean} true if the To date was fixed
   */
  fixToBeforeFrom(
    fromControl: AbstractControl,
    toControl: AbstractControl
  ): boolean {
    const fromDate: Moment = fromControl.value;
    const toDate: Moment = toControl.value;
    const isFixNeeded = fromDate && toDate && fromDate.isAfter(toDate, 'day');
    if (isFixNeeded) {
      // emitEvent is false so that we don't trigger valueChanges again
      toControl.setValue(fromDate, { emitEvent: false });
    }
    return isFixNeeded;
  }
}
