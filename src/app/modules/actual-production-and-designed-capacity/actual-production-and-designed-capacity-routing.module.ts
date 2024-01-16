import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  { path: '', component: FormComponent , data: { title: 'بيانات كمية الإنتاج الفعلي والطاقة التصميمية' }},

]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualProductionAndDesignedCapacityRoutingModule { }
