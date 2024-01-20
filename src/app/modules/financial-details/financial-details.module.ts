import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialDetailsRoutingModule } from './financial-details-routing.module';
import { FinancialDetailFormComponent } from './components/financial-detail-form/financial-detail-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FinancialFileComponent } from './components/financial-file/financial-file.component';


@NgModule({
  declarations: [
    FinancialDetailFormComponent,
    FinancialFileComponent
  ],
  imports: [
    CommonModule,
    FinancialDetailsRoutingModule,
    SharedModule
  ]
})
export class FinancialDetailsModule { }
