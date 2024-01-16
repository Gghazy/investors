import { Component } from '@angular/core';
import { fade } from 'src/app/shared/animation/app.animation';

@Component({
  selector: 'app-financial-detail-form',
  templateUrl: './financial-detail-form.component.html',
  styleUrls: ['./financial-detail-form.component.scss'],
  animations: [
    fade
  ]
})
export class FinancialDetailFormComponent {

}
