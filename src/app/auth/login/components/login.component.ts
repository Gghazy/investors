import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fade } from 'src/app/shared/animation/app.animation';
import { LoginModel } from '../models/login.model';
import { SharedService } from 'src/app/shared/services/shared.service';

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

  constructor(private router: Router,
              private sharedService:SharedService
  ) {

  }




  login() {
    console.log(this.request)
    this.sharedService.setUserId(this.request.userId);
    if(this.request.userId=='admin'){
      this.router.navigate(['/pages/Admin/inspectors-list']);
    }
    else{
      this.router.navigate(['/pages/factories-list']);
    }

    

  }


}
