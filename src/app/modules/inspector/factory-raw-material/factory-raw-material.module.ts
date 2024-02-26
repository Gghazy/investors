import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoryRawMaterialComponent } from './factory-raw-material.component';
import { FactoryRawMaterialRoutingModule } from './factory-raw-material-routing.module';



@NgModule({
  declarations: [
    FactoryRawMaterialComponent
  ],
  imports: [
    CommonModule,
    FactoryRawMaterialRoutingModule,
  ]
})
export class FactoryRawMaterialModule { }
