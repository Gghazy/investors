import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactoryLocationFormComponent } from './components/factory-location-form/factory-location-form.component';
import { FactoryLocationRoutingModule } from './factory-location-routing.module';



@NgModule({
  declarations: [
    FactoryLocationFormComponent
  ],
  imports: [
    CommonModule,
    FactoryLocationRoutingModule
  ]
})
export class FactoryLocationModule { }
