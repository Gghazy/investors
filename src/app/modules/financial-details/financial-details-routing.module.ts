import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialDetailFormComponent } from './components/financial-detail-form/financial-detail-form.component';

const routes: Routes = [
  { path: '', component: FinancialDetailFormComponent , data: { title: 'البيانات المالية' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialDetailsRoutingModule { }
