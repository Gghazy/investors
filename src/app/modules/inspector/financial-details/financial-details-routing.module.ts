import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialDetailsFormComponent } from './components/financial-details-form/financial-details-form.component';

const routes: Routes = [
  { path: '', component: FinancialDetailsFormComponent , data: { title: 'البيانات المالية' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialDetailsRoutingModule { }
