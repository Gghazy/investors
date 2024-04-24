import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualProductionAndDesignedCapacityFormComponent } from './components/actual-production-and-designed-capacity-form/actual-production-and-designed-capacity-form.component';
import { ActualProductionAndDesignedCapacityRoutingModule } from './actual-production-and-designed-capacity-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActualProductionAndDesignedCapacityFileComponent } from './components/actual-production-and-designed-capacity-file/actual-production-and-designed-capacity-file.component';



@NgModule({
  declarations: [
    ActualProductionAndDesignedCapacityFormComponent,
    ActualProductionAndDesignedCapacityFileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ActualProductionAndDesignedCapacityRoutingModule
  ]
})
export class ActualProductionAndDesignedCapacityModule { }
