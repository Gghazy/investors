import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactoryProductsFormComponent } from './components/factory-products-form/factory-products-form.component';
import { FactoryProductsRoutingModule } from './factory-products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FactoryProductsFileComponent } from './components/factory-products-file/factory-products-file.component';



@NgModule({
  declarations: [
    FactoryProductsFormComponent,
    FactoryProductsFileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FactoryProductsRoutingModule
  ]
})
export class FactoryProductsModule { }
