import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoryProductsRoutingModule } from './factory-products-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    FactoryProductsRoutingModule,
    SharedModule
  ]
})
export class FactoryProductsModule { }
