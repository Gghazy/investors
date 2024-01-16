import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomsItemsCheckRoutingModule } from './customs-items-check-routing.module';
import { CustomsItemsCheckFormComponent } from './components/customs-items-check-form/customs-items-check-form.component';


@NgModule({
  declarations: [
    CustomsItemsCheckFormComponent
  ],
  imports: [
    CommonModule,
    CustomsItemsCheckRoutingModule
  ]
})
export class CustomsItemsCheckModule { }
