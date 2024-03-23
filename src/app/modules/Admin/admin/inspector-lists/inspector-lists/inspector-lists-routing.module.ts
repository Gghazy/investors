import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectorListsComponent } from './components/inspector-lists.component';

const routes: Routes = [
  { path: '', component: InspectorListsComponent , data: { title: 'قائمة المدققين' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectorListsRoutingModule { }
