import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoryRawMaterialComponent } from './factory-raw-material.component';
import { FactoryRawMaterialRoutingModule } from './factory-raw-material-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FactoryRawMaterialComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FactoryRawMaterialRoutingModule,
  ]
})
export class FactoryRawMaterialModule { }
