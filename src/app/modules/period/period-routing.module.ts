import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodListComponent } from './components/period-list/period-list.component';

const routes: Routes = [
  { path: '', component: PeriodListComponent , data: { title: 'الفترات' }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodRoutingModule { }
