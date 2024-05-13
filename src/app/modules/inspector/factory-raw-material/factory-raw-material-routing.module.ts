import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactoryRawMaterialComponent } from './factory-raw-material.component';

const routes: Routes = [
  { path: '', component: FactoryRawMaterialComponent , data: { title: 'المواد الأولية ( المواد الخام)' }},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoryRawMaterialRoutingModule { }
