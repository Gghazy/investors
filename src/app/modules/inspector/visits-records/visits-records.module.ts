import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitsRecordsFormComponent } from './components/visits-records-form/visits-records-form.component';
import { VisitsRecordsRoutingModule } from './visits-records-routing.module';



@NgModule({
  declarations: [
    VisitsRecordsFormComponent
  ],
  imports: [
    CommonModule,
    VisitsRecordsRoutingModule
  ]
})
export class VisitsRecordsModule { }
