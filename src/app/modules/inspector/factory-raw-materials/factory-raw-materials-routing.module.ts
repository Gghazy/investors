import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactoryRawMaterialsFormComponent } from './components/factory-raw-materials-form/factory-raw-materials-form.component';

const routes: Routes = [
  { path: '', component: FactoryRawMaterialsFormComponent , data: { title: 'المواد الأولية ( المواد الخام)' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoryRawMaterialsRoutingModule { }
