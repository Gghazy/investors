import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoverPasswordComponent,   
  ],
  imports: [
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    TooltipModule.forRoot(),
    SharedModule,
    BrowserModule, 

  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { 


}
