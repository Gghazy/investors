import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomsItemsUpdateFormComponent } from './components/customs-items-update-form/customs-items-update-form.component';

const routes: Routes = [
  { path: '', component: CustomsItemsUpdateFormComponent , data: { title: 'بيانات تحديث البند الجمركي  ' }},

];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomsItemsUpdateRoutingModule { }
