import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitLandingFormComponent } from './components/visit-landing-form/visit-landing-form.component';
import { VisitLandingRoutingModule } from '../visit-landing/visit-landing-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    VisitLandingFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VisitLandingRoutingModule
  ]
})
export class VisitLandingModule { }
