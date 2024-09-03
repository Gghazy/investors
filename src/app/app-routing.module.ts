import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/components/login.component';
import { ErrorPageComponent } from './auth/login/errorComponent/errorPage.component';


const routes: Routes = [
  
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {
    path: 'pages',
    loadChildren: () =>
      import('./modules/modules.module').then((m) => m.ModulesModule),
  },
  {
     path: 'login', component: LoginComponent 
  },
  {
    path: 'error', component: ErrorPageComponent 
 },
 {
  path: '**', redirectTo: 'error', pathMatch: 'full'
},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
