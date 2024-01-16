import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomsItemsUpdateRoutingModule } from './customs-items-update-routing.module';
import { CustomsItemsUpdateFormComponent } from './components/customs-items-update-form/customs-items-update-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CustomsItemsUpdateFormComponent
  ],
  imports: [
    CommonModule,
    CustomsItemsUpdateRoutingModule,
    SharedModule
  ]
})
export class CustomsItemsUpdateModule { }
