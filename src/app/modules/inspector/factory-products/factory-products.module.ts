import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactoryProductsFormComponent } from './components/factory-products-form/factory-products-form.component';
import { FactoryProductsRoutingModule } from './factory-products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FactoryProductsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FactoryProductsRoutingModule
  ]
})
export class FactoryProductsModule { }
