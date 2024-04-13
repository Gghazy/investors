import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitsRecordsFormComponent } from './components/visits-records-form/visits-records-form.component';

const routes: Routes = [
  { path: '', component: VisitsRecordsFormComponent , data: { title: 'سجل الزيارة ' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitsRecordsRoutingModule { }
