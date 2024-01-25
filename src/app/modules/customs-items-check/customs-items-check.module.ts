import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomsItemsCheckRoutingModule } from './customs-items-check-routing.module';
import { CustomCheckListComponent } from './components/custom-check-list/custom-check-list.component';
import { CustomCheckFormComponent } from './components/custom-check-form/custom-check-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CustomCheckListComponent,
    CustomCheckFormComponent
  ],
  imports: [
    CommonModule,
    CustomsItemsCheckRoutingModule,
    SharedModule
  ]
})
export class CustomsItemsCheckModule { }
