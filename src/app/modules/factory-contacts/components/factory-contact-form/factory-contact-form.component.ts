import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { fade } from 'src/app/shared/animation/app.animation';

@Component({
  selector: 'app-factory-contact-form',
  templateUrl: './factory-contact-form.component.html',
  styleUrls: ['./factory-contact-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryContactFormComponent {
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});
}
