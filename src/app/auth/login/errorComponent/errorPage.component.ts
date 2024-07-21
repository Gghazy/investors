import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { fade } from 'src/app/shared/animation/app.animation';


@Component({
  selector: 'errorPage-login',
  templateUrl: './errorPage.component.html',
  styleUrls: ['./errorPage.component.scss'],
  animations: [
    fade
  ]
})
export class ErrorPageComponent implements OnInit {
  ErrorMsg="خطأ في بيانات  تسجيل الدخول ، الرجاء المحاولة مرة أخرى"
  redirectTologin=true;
  constructor(private router: Router,
     private route: ActivatedRoute
           
  ) {

  }
 
  ngOnInit(): void {
   
    this.route.queryParams.subscribe(params => {
      const errorM = params['errorM'];
      if (errorM==1) {
        this.ErrorMsg="خطأ في بيانات  تسجيل الدخول ، الرجاء المحاولة مرة أخرى"
        this.redirectTologin=true;
      }
      else
      {
        this.ErrorMsg=" عذرا ، لا تملك صلاحيات للدخول لمنصة المسح الصناعي"
        this.redirectTologin=false;
       

      }
    });
  }


  backTologin() {
   
      this.router.navigate(['/login']);
  }


}
