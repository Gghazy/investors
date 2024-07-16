import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fade } from 'src/app/shared/animation/app.animation';
import { LoginModel } from '../models/login.model';
import { LoginService } from '../login-service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Toast } from 'ngx-toastr';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    fade
  ]
})
export class LoginComponent {
request = new LoginModel()
locklogin=false;
  constructor(private router: Router,
              private sharedService:SharedService,
              private toastr: ToastrService,

              private loginService: LoginService,
  ) {

  }




  login() {
   if(this.locklogin)
   {
    this.toastr.info( 'عملية تسجيل الدخول قيد التنفيذ');
   } 
else
{
  this.locklogin=true
  this.loginService
    .Externallogin()
    .subscribe((res: any) => {
      this.locklogin=false
      this.request = res.Data;

      let externallogin='https://mim.gov.sa/sso/'+this.request.uuid+'/login?token='+this.request.token+'&signature='+this.request.signature;
      window.location.href=externallogin;
      

    });
}
    

    /*console.log(this.request)
    this.sharedService.setUserId(this.request.userId);
    if(this.request.userId=='admin'){
      this.router.navigate(['/pages/Admin/inspectors-list']);
    }
    else{
      this.router.navigate(['/pages/factories-list']);
    }*/

    

  }


}
