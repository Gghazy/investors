import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialDetailsFormComponent } from './components/financial-details-form/financial-details-form.component';
import { FinancialDetailsRoutingModule } from './financial-details-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FinancialDetailsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FinancialDetailsRoutingModule
  ]
})
export class FinancialDetailsModule { }
