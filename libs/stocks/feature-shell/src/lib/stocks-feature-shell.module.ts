import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { SharedUiCustomMaterialModule } from '@coding-challenge/shared/ui/custom-material';
import { StocksComponent } from './stocks/stocks.component';
import { ReactiveFormsModule } from '@angular/forms';

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
  declarations: [StocksComponent]
})
export class StocksFeatureShellModule {}
