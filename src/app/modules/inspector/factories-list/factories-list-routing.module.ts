import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactoriesListFormComponent } from './components/factories-list-form/factories-list-form.component';

const routes: Routes = [
  { path: '', component: FactoriesListFormComponent , data: { title: ' قائمة المصانع' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoriesListRoutingModule { }
