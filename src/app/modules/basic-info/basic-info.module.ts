import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicInfoRoutingModule } from './basic-info-routing.module';
import { BasicInfoFormComponent } from './components/basic-info-form/basic-info-form.component';


@NgModule({
  declarations: [
    BasicInfoFormComponent
  ],
  imports: [
    CommonModule,
    BasicInfoRoutingModule
  ]
})
export class BasicInfoModule { }
