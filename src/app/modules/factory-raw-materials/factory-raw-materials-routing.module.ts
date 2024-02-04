import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { FactoryRawMaterialsListsComponent } from './components/factory-raw-materials-lists/factory-raw-materials-lists.component';

const routes: Routes = [
  { path: '', component: FactoryRawMaterialsListsComponent , data: { title: 'بيانات المواد الأولية' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoryRawMaterialsRoutingModule {
 


  
}
