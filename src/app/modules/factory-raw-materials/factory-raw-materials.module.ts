import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoryRawMaterialsRoutingModule } from './factory-raw-materials-routing.module';
import { FactoryRawMaterialsFormComponent } from './components/factory-raw-materials-form/factory-raw-materials-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FactoryRawMaterialsListsComponent } from './components/factory-raw-materials-lists/factory-raw-materials-lists.component';


@NgModule({
  declarations: [
    FactoryRawMaterialsFormComponent,
    FactoryRawMaterialsListsComponent
  ],
  imports: [
    CommonModule,
    FactoryRawMaterialsRoutingModule,
    SharedModule
  ]
})
export class FactoryRawMaterialsModule { }
