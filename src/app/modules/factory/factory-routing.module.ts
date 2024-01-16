import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactoryListComponent } from './components/factory-list/factory-list.component';

const routes: Routes = [
  { path: '', component: FactoryListComponent , data: { title: ' رخصى الصناعية' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoryRoutingModule { }
 