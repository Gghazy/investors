import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactoryProductFormComponent } from './components/factory-product-form/factory-product-form.component';

const routes: Routes = [
  { path: '', component: FactoryProductFormComponent , data: { title: 'بيانات المنتجات' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoryProductsRoutingModule { }
