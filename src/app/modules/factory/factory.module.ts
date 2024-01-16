import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoryRoutingModule } from './factory-routing.module';
import { FactoryListComponent } from './components/factory-list/factory-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FactoryListComponent
  ],
  imports: [
    CommonModule,
    FactoryRoutingModule,
    SharedModule
  ]
})
export class FactoryModule { }
