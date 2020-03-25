import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { SharedUiCustomMaterialModule } from '@coding-challenge/shared/ui/custom-material';
import { StockPickerComponent } from './stock-picker/stock-picker.component';
import { StockPickerService } from './stock-picker/stock-picker.service';
import { StocksComponent } from './stocks/stocks.component';
import { StocksService } from './stocks/stocks.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: StocksComponent }
    ]),
    ReactiveFormsModule,
    SharedUiChartModule,
    SharedUiCustomMaterialModule
  ],
  declarations: [StocksComponent, StockPickerComponent],
  providers: [StockPickerService, StocksService]
})
export class StocksFeatureShellModule {}
