import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActualRawMaterialsRoutingModule } from './actual-raw-materials-routing.module';
import { ActualRawMaterialsFormComponent } from './components/actual-raw-materials-form/actual-raw-materials-form.component';


@NgModule({
  declarations: [
    ActualRawMaterialsFormComponent
  ],
  imports: [
    CommonModule,
    ActualRawMaterialsRoutingModule
  ]
})
export class ActualRawMaterialsModule { }
