import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoryProductsRoutingModule } from './factory-products-routing.module';
import { FactoryProductFormComponent } from './components/factory-product-form/factory-product-form.component';


@NgModule({
  declarations: [
    FactoryProductFormComponent
  ],
  imports: [
    CommonModule,
    FactoryProductsRoutingModule
  ]
})
export class FactoryProductsModule { }
