import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoryLocationRoutingModule } from './factory-location-routing.module';
import { FactoryLocationFormComponent } from './components/factory-location-form/factory-location-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FactoryLocationFormComponent
  ],
  imports: [
    CommonModule,
    FactoryLocationRoutingModule,
    SharedModule
  ]
})
export class FactoryLocationModule { }
