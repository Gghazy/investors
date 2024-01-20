import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicInfoRoutingModule } from './basic-info-routing.module';
import { BasicInfoFormComponent } from './components/basic-info-form/basic-info-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BasicInfoFileComponent } from './components/basic-info-file/basic-info-file.component';


@NgModule({
  declarations: [
    BasicInfoFormComponent,
    BasicInfoFileComponent
  ],
  imports: [
    CommonModule,
    BasicInfoRoutingModule,
    SharedModule
  ]
})
export class BasicInfoModule { }
