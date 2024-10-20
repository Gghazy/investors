import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import { SharedModule } from '../shared/shared.module';
import { DisableDirective } from './disable.directive';
import { GoogleMapsModule } from '@angular/google-maps';
//import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
 // schemas: [CUSTOM_ELEMENTS_SCHEMA],   

  declarations: [
    ModulesComponent,
    DisableDirective

  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    SharedModule,
    GoogleMapsModule

  ],
  exports:
  [DisableDirective]
})
export class ModulesModule { }
