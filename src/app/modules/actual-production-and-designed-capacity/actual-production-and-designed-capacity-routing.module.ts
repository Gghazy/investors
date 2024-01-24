import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualProductionListComponent } from './components/actual-production-list/actual-production-list.component';

const routes: Routes = [
  { path: '', component: ActualProductionListComponent , data: { title: 'بيانات كمية الإنتاج الفعلي والطاقة التصميمية' }},

]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualProductionAndDesignedCapacityRoutingModule { }
