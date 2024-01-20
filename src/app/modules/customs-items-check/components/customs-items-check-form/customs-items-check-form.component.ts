import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fade } from 'src/app/shared/animation/app.animation';

@Component({
  selector: 'app-customs-items-check-form',
  templateUrl: './customs-items-check-form.component.html',
  styleUrls: ['./customs-items-check-form.component.scss'],
  animations: [
    fade
  ]
})
export class CustomsItemsCheckFormComponent {
  factoryId:any;

  constructor(private route: ActivatedRoute){
    this.factoryId = this.route.snapshot.paramMap.get('id');
  }
}
