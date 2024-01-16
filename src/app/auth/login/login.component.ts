import { Component } from '@angular/core';
import { fade } from 'src/app/shared/animation/app.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    fade
  ]
})
export class LoginComponent {

}
