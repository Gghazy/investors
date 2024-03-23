import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { InspectorListsComponent } from './components/inspector-lists.component';
import { InspectorListsRoutingModule } from './inspector-lists-routing.module';
import { InspectorFormComponent } from './components/inspector-form/inspector-form.component';



@NgModule({
  declarations: [
    InspectorListsComponent,
    InspectorFormComponent
  ],
  imports: [
    CommonModule,
    InspectorListsRoutingModule,
    SharedModule
  ]
})
export class InspectorListsModule { }
