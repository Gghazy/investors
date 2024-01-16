import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicInfoFormComponent } from './components/basic-info-form/basic-info-form.component';

const routes: Routes = [
  { path: '', component: BasicInfoFormComponent , data: { title: 'البيانات الاساسية' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicInfoRoutingModule { }
