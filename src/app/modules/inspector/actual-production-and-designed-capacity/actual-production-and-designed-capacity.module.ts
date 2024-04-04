import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualProductionAndDesignedCapacityFormComponent } from './components/actual-production-and-designed-capacity-form/actual-production-and-designed-capacity-form.component';
import { ActualProductionAndDesignedCapacityRoutingModule } from './actual-production-and-designed-capacity-routing.module';



@NgModule({
  declarations: [
    ActualProductionAndDesignedCapacityFormComponent
  ],
  imports: [
    CommonModule,
    ActualProductionAndDesignedCapacityRoutingModule
  ]
})
export class ActualProductionAndDesignedCapacityModule { }
