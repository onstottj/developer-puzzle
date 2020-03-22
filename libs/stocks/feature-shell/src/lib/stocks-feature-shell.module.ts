import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { SharedUiCustomMaterialModule } from '@coding-challenge/shared/ui/custom-material';
import { StockListService } from './stock-list.service';
import { StockPickerComponent } from './stock-picker/stock-picker.component';
import { StocksListComponent } from './stocks-list/stocks-list.component';
import { StocksComponent } from './stocks/stocks.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: StocksComponent}
    ]),
    ReactiveFormsModule,
    SharedUiChartModule,
    SharedUiCustomMaterialModule
  ],
  declarations: [StocksComponent, StockPickerComponent, StocksListComponent],
  providers: [StockListService],
})
export class StocksFeatureShellModule {
}
