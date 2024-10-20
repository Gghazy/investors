import { Injector, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/components/login.component';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/interceptor/token.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GoogleMapsModule } from '@angular/google-maps';



export let InjectorInstance: Injector;


@NgModule({
  
  declarations: [
    AppComponent,
    LoginComponent,
    RecoverPasswordComponent,
    
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    GoogleMapsModule,

    //NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }) // optional global configuration

  ],
  providers: [  
    { provide: LocationStrategy, useClass: HashLocationStrategy },

  ],
  bootstrap: [AppComponent]
})


export class AppModule { 
  constructor(private injector: Injector) {
    InjectorInstance = this.injector;
  }

}
