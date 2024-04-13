import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualProductionAndDesignedCapacityFormComponent } from './components/actual-production-and-designed-capacity-form/actual-production-and-designed-capacity-form.component';

const routes: Routes = [
  { path: '', component: ActualProductionAndDesignedCapacityFormComponent , data: { title: 'الطاقة المرخصة (التصميمية)' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualProductionAndDesignedCapacityRoutingModule { }
