import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomsItemsCheckFormComponent } from './components/customs-items-check-form/customs-items-check-form.component';

const routes: Routes = [
  { path: '', component: CustomsItemsCheckFormComponent , data: { title: 'التحقق من صحة البند الجمركي على مستوى 12' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomsItemsCheckRoutingModule { }
