import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualRawMaterialsFormComponent } from './components/actual-raw-materials-form/actual-raw-materials-form.component';

const routes: Routes = [
  { path: '', component: ActualRawMaterialsFormComponent , data: { title: 'بيانات المواد الأولية ( المواد الخام) الفعلية' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualRawMaterialsRoutingModule { }
