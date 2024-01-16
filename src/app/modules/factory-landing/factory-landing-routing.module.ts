import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactoryLandingFormComponent } from './components/factory-landing-form/factory-landing-form.component';

const routes: Routes = [
  { path: '', component: FactoryLandingFormComponent , data: { title: 'بيانات المصنع' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoryLandingRoutingModule { }
