import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActualRawMaterialsRoutingModule } from './actual-raw-materials-routing.module';
import { ActualRawMaterialsFormComponent } from './components/actual-raw-materials-form/actual-raw-materials-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ActualRawMaterialsFormComponent
  ],
  imports: [
    CommonModule,
    ActualRawMaterialsRoutingModule,
    SharedModule
  ]
})
export class ActualRawMaterialsModule { }
