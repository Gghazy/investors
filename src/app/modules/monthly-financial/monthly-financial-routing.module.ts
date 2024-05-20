import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyFinancialFormComponent } from './components/monthly-financial-form/monthly-financial-form.component';

const routes: Routes = [
  { path: '', component: MonthlyFinancialFormComponent , data: { title: ' البيانات المالية الشهرية' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlyFinancialRoutingModule { }
