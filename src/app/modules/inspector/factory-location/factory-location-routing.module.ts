import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactoryLocationFormComponent } from './components/factory-location-form/factory-location-form.component';

const routes: Routes = [
  { path: '', component: FactoryLocationFormComponent , data: { title: 'موقع المصنع ' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoryLocationRoutingModule { }
