import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  factoryId:any;

  constructor(private route: ActivatedRoute){
    this.factoryId = this.route.snapshot.paramMap.get('id');
  }
}
