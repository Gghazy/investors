import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactoryProductsFormComponent } from './components/factory-products-form/factory-products-form.component';
import { FactoryProductsRoutingModule } from './factory-products-routing.module';



@NgModule({
  declarations: [
    FactoryProductsFormComponent
  ],
  imports: [
    CommonModule,
    FactoryProductsRoutingModule
  ]
})
export class FactoryProductsModule { }
