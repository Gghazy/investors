import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactoryContactFormComponent } from './components/factory-contact-form/factory-contact-form.component';

const routes: Routes = [
  { path: '', component: FactoryContactFormComponent , data: { title: 'بيانات جهة الإتصال' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoryContactsRoutingModule { }
