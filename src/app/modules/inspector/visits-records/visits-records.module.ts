import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitsRecordsFormComponent } from './components/visits-records-form/visits-records-form.component';
import { VisitsRecordsRoutingModule } from './visits-records-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    VisitsRecordsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VisitsRecordsRoutingModule
  ]
})
export class VisitsRecordsModule { }
