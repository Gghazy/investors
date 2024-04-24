import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactoryRawMaterialsFormComponent } from './components/factory-raw-materials-form/factory-raw-materials-form.component';
import { FactoryRawMaterialsRoutingModule } from './factory-raw-materials-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FactoryRawMaterialFileComponent } from './components/factory-raw-material-file/factory-raw-material-file.component';



@NgModule({
  declarations: [
    FactoryRawMaterialsFormComponent,
    FactoryRawMaterialFileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FactoryRawMaterialsRoutingModule
  ]
})
export class FactoryRawMaterialsModule { }
