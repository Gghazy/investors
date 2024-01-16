import { Component } from '@angular/core';
import { fade } from 'src/app/shared/animation/app.animation';

@Component({
  selector: 'app-factory-product-form',
  templateUrl: './factory-product-form.component.html',
  styleUrls: ['./factory-product-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryProductFormComponent {

  handleUploadClick(event: Event) {
    const targetButton = event.target as HTMLButtonElement;
    const closestTd = targetButton.closest('td');

    if (closestTd) {
      const fileInput = closestTd.querySelectorAll('input')[0];

      if (fileInput) {
        fileInput.click();
      }
    } 
  }

  showInput = false;

  handleSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.showInput = selectedValue === 'yes';
  }
}
