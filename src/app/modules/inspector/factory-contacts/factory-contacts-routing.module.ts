import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactoryContactsFormComponent } from './components/factory-contacts-form/factory-contacts-form.component';

const routes: Routes = [
  { path: '', component: FactoryContactsFormComponent , data: { title: 'بيانات جهة الإتصال' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoryContactsRoutingModule { }
