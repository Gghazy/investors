import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactoryContactsFormComponent } from './components/factory-contacts-form/factory-contacts-form.component';
import { FactoryContactsRoutingModule } from './factory-contacts-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FactoryContactsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FactoryContactsRoutingModule
  ]
})
export class FactoryContactsModule { }
