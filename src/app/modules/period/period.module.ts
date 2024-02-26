import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodRoutingModule } from './period-routing.module';
import { PeriodListComponent } from './components/period-list/period-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PeriodListComponent
  ],
  imports: [
    CommonModule,
    PeriodRoutingModule,
    SharedModule
  ]
})
export class PeriodModule { }
