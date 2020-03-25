import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class StockPickerService {
  constructor() {}

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
