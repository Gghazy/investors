import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoryContactsRoutingModule } from './factory-contacts-routing.module';
import { FactoryContactFormComponent } from './components/factory-contact-form/factory-contact-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FactoryContactFormComponent
  ],
  imports: [
    CommonModule,
    FactoryContactsRoutingModule,
    SharedModule
  ]
})
export class FactoryContactsModule { }
