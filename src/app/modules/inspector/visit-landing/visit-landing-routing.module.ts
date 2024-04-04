import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitLandingFormComponent } from './components/visit-landing-form/visit-landing-form.component';

const routes: Routes = [
  { path: '', component: VisitLandingFormComponent , data: { title: 'بيانات الزيارة '}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitLandingRoutingModule { }
