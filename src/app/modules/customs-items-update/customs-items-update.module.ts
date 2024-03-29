import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomsItemsUpdateRoutingModule } from './customs-items-update-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerUpdateListComponent } from './components/customer-update-list/customer-update-list.component';


@NgModule({
  declarations: [
    CustomerUpdateListComponent,
  ],
  imports: [
    CommonModule,
    CustomsItemsUpdateRoutingModule,
    SharedModule
  ]
})
export class CustomsItemsUpdateModule { }
