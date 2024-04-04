import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactoryRawMaterialsFormComponent } from './components/factory-raw-materials-form/factory-raw-materials-form.component';
import { FactoryRawMaterialsRoutingModule } from './factory-raw-materials-routing.module';



@NgModule({
  declarations: [
    FactoryRawMaterialsFormComponent
  ],
  imports: [
    CommonModule,
    FactoryRawMaterialsRoutingModule
  ]
})
export class FactoryRawMaterialsModule { }
