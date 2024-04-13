import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactoryProductsFormComponent } from './components/factory-products-form/factory-products-form.component';

const routes: Routes = [
  { path: '', component: FactoryProductsFormComponent , data: { title: ' المنتجات ' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoryProductsRoutingModule { }
