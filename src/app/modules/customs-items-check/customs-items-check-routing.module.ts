import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomCheckListComponent } from './components/custom-check-list/custom-check-list.component';

const routes: Routes = [
  { path: '', component: CustomCheckListComponent , data: { title: 'التحقق من صحة البند الجمركي على مستوى 12' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomsItemsCheckRoutingModule { }
