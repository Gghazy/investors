import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { FactoryContactModel } from 'src/app/modules/factory-contacts/models/factory-contact-model';
import { FactoryContactsModel } from '../../models/factory-contacts.model';
import { FactoryContactService } from 'src/app/modules/factory-contacts/factory-contact.service';


@Component({
  selector: 'app-factory-contacts-form',
  templateUrl: './factory-contacts-form.component.html',
  styleUrls: ['./factory-contacts-form.component.scss']
})
export class FactoryContactsFormComponent implements OnInit {
  factoryId: any;
  periodId: any;
  request=new FactoryContactsModel()
  requestContact=new FactoryContactModel()
  constructor(
    private route: ActivatedRoute,
    private factoryContactService: FactoryContactService,
     private toastr: ToastrService,
     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit() {
    this.getContact()
  }

  getContact() {

    this.factoryContactService
      .getOne(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        debugger
        this.requestContact = res.Data;
        console.log(this.requestContact)
         });
  }
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	phoneForm = new FormGroup({
		phone: new FormControl({ value: '123456789', disabled: true }, [Validators.required]),
		corectPhone: new FormControl(undefined, [Validators.required])
    
	});


  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const closestRow = target.closest('.row');

    const showInputElement = closestRow?.querySelector('.show-input');

    if (showInputElement) {
      if (target.value == '0') {
        showInputElement.classList.remove('d-none');
      } else {
        showInputElement.classList.add('d-none');
      }
    }
  }

  save(){
    this.request.FactoryId=this.factoryId;
    this.request.PeriodId=this.periodId;
    console.log(this.request)

     // this.FormService
    // .create(this.request)
    // .subscribe((res: any) => {
    //   this.toastr.success("تم الحفظ");
    // });

  }

}
