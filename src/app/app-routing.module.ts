import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/components/login.component';
import { ErrorPageComponent } from './auth/login/errorComponent/errorPage.component';


const routes: Routes = [
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'pages',
    loadChildren: () =>
      import('./modules/modules.module').then((m) => m.ModulesModule),
  },
  {
     path: 'login', component: LoginComponent 
  },
  {
    path: 'errorPage', component: ErrorPageComponent 
 },
 { path: '**', redirectTo: 'errorPage', pathMatch: 'full' } // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
