import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActualProductionAndDesignedCapacityRoutingModule } from './actual-production-and-designed-capacity-routing.module';
import { ActualProductionListComponent } from './components/actual-production-list/actual-production-list.component';
import { ActualProductionFormComponent } from './components/actual-production-form/actual-production-form.component';
import { ActualProductionFileComponent } from './components/actual-production-file/actual-production-file.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReasoninCreasingProductionFormComponent } from './components/reasonin-creasing-production-form/reasonin-creasing-production-form.component';


@NgModule({
  declarations: [
    ActualProductionListComponent,
    ActualProductionFormComponent,
    ActualProductionFileComponent,
    ReasoninCreasingProductionFormComponent,
    
  ],
  imports: [
    CommonModule,
    ActualProductionAndDesignedCapacityRoutingModule,
    SharedModule
  ]
})
export class ActualProductionAndDesignedCapacityModule { }
