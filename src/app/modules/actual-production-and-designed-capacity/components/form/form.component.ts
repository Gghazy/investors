import { Component } from '@angular/core';
import { fade } from 'src/app/shared/animation/app.animation';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [
    fade
  ]
})
export class FormComponent {

}
