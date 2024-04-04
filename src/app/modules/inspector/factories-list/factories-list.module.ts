import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactoriesListFormComponent } from './components/factories-list-form/factories-list-form.component';
import { FactoriesListRoutingModule } from './factories-list-routing.module';



@NgModule({
  declarations: [
    FactoriesListFormComponent
  ],
  imports: [
    CommonModule,
    FactoriesListRoutingModule
  ]
})
export class FactoriesListModule { }
