import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActualProductionAndDesignedCapacityRoutingModule } from './actual-production-and-designed-capacity-routing.module';
import { FormComponent } from './components/form/form.component';


@NgModule({
  declarations: [
    FormComponent,
    
  ],
  imports: [
    CommonModule,
    ActualProductionAndDesignedCapacityRoutingModule
  ]
})
export class ActualProductionAndDesignedCapacityModule { }
