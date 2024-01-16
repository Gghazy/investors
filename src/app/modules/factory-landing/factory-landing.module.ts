import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoryLandingRoutingModule } from './factory-landing-routing.module';
import { FactoryLandingFormComponent } from './components/factory-landing-form/factory-landing-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FactoryLandingFormComponent
  ],
  imports: [
    CommonModule,
    FactoryLandingRoutingModule,
    SharedModule
  ]
})
export class FactoryLandingModule { }
