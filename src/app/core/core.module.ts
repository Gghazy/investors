import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHttpInterceptorProviders } from './interceptors/interceptors';
import { DateFormat } from './Pipe/dateFormat';



@NgModule({
  declarations: [
    DateFormat
  ],
  imports: [
    CommonModule,  
  ],
  exports:[
    DateFormat
  ],
  providers: [AppHttpInterceptorProviders],

  schemas: [],
})
export class CoreModule { }
