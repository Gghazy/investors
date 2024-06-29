import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import { SharedModule } from '../shared/shared.module';
import { DisableDirective } from './disable.directive';


@NgModule({
  declarations: [
    ModulesComponent,
    DisableDirective

  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    SharedModule
  ],
  exports:
  [DisableDirective]
})
export class ModulesModule { }
