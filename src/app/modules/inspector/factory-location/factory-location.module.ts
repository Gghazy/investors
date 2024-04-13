import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactoryLocationFormComponent } from './components/factory-location-form/factory-location-form.component';
import { FactoryLocationRoutingModule } from './factory-location-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FactoryLocationFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FactoryLocationRoutingModule
  ]
})
export class FactoryLocationModule { }
