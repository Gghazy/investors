import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicInfoFormComponent } from './components/basic-info-form/basic-info-form.component';
import { BasicInforRoutingModule } from './basic-info-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    BasicInfoFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BasicInforRoutingModule
  ]
})
export class BasicInfoModule { }
