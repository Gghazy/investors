import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerUpdateListComponent } from './components/customer-update-list/customer-update-list.component';

const routes: Routes = [
  { path: '', component: CustomerUpdateListComponent , data: { title: 'بيانات تحديث البند الجمركي  ' }},

];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomsItemsUpdateRoutingModule { }
