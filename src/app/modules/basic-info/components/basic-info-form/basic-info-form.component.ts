import { Component } from '@angular/core';
import { fade } from 'src/app/shared/animation/app.animation';

@Component({
  selector: 'app-basic-info-form',
  templateUrl: './basic-info-form.component.html',
  styleUrls: ['./basic-info-form.component.scss'],
  animations: [
    fade
  ]
})
export class BasicInfoFormComponent {

}
