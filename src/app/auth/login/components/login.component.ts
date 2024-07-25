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

  Investor()
  {
    this.router.navigate(['/pages/factories-list']);

  }
  Inspector()
  {
    this.router.navigate(['/pages/Inspector/factories-list']);

  }
  Admin()
  {
    this.router.navigate(['/pages/Admin/inspectors-list']);

  }


}
