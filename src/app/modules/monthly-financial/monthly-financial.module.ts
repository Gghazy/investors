import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthlyFinancialRoutingModule } from './monthly-financial-routing.module';
import { MonthlyFinancialFormComponent } from './components/monthly-financial-form/monthly-financial-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MonthlyFinancialFormComponent
  ],
  imports: [
    CommonModule,
    MonthlyFinancialRoutingModule,
    SharedModule
  ]
})
export class MonthlyFinancialModule { }
