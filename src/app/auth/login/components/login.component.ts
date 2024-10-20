import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fade } from 'src/app/shared/animation/app.animation';
import { LoginModel } from '../models/login.model';
import { LoginService } from '../login-service';
//import { AuthService } from '../authService';

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
             // private authService: AuthService,
              private http: HttpClient,
              private loginService: LoginService,
  ) {

  }
  ngOnInit(): void {
  //  this.authService.loginExternal();

    //window.location.href="https://localhost:44372/api/Account";

  }
  handleAuthCallback() {
    this.http.get(`account`).subscribe((response: any) => {
      alert(response.token)
      localStorage.setItem('token', response.token);
      this.router.navigate(['/pages/factories-list']);
    });
  }
  loginTest()
  {
    this.http.get(`Account/login`).subscribe({
      next: (response: any) => {
        alert("Login next");
     /*   const redirectUrl = response?.RedirectUrl;
        //alert("redirect");
        if (redirectUrl) {
          // Perform the redirect
          window.location.href = redirectUrl;

          // Optionally, make a request to the redirected URL
          this.http.get(redirectUrl).subscribe({
            next: (redirectResponse: any) => {
              alert('Response from redirected URL:'+ redirectResponse)
              console.log('Response from redirected URL:', redirectResponse);
            },
            error: (error) => {
              alert('Error occurred while fetching redirected URL')
              console.error('Error occurred while fetching redirected URL:', error);
            }
          });
        }*/
      },
      error: (error) => {
        alert("Login failed");
        console.error('Login failed', error);
      },
      complete: () => {
        alert("Login completed");
        console.log('Login request completed');
      }
    });
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
