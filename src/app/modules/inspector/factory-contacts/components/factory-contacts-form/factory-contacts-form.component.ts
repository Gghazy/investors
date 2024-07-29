import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FactoryContactModel } from 'src/app/modules/factory-contacts/models/factory-contact-model';
import { FactoryContactsModel } from '../../models/factory-contacts.model';
import { InspectorFactoryContactsService } from '../../factory-contacts.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { PeriodService } from 'src/app/modules/period/period.service';

@Component({
  selector: 'app-factory-contacts-form',
  templateUrl: './factory-contacts-form.component.html',
  styleUrls: ['./factory-contacts-form.component.scss']
})
export class FactoryContactsFormComponent implements OnInit {
  factoryId: any;
  periodId: any;
  request = new FactoryContactsModel()
  requestContact = new FactoryContactModel()
  userId!: string;
  PeriodName!:string
  separateDialCode = false;
  submitted=false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  phoneForm = new FormGroup({
    NewOfficerPhoneId: new FormControl(undefined, [Validators.required, this.saPhoneNumberValidator]),
    NewOfficerEmail: new FormControl(undefined, [Validators.required,this.isValidEmail])

  });
  constructor(
    private route: ActivatedRoute,
    private inspectorContactService: InspectorFactoryContactsService,
    private shared: SharedService,
    private toastr: ToastrService,
    private router: Router,
    private periodService : PeriodService,

  ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit() {
    this.userId = this.shared.getUserId();
    this.getContact()
this.getperiod()

  }

  getContact() {
    this.inspectorContactService
      .getOne(this.factoryId, this.periodId, this.userId)
      .subscribe((res: any) => {
        this.request = res.Data;
        console.log(this.request)
      });
  }
  getperiod(){
    this.periodService
    .getOne(this.periodId)
    .subscribe((res: any) => {
      
      this.PeriodName= res.Data.PeriodName;
    });
  }

  onInputChange(event: Event): void {

    if (this.request.IsOfficerMailCorrect == true) {
      this.request.NewOfficerEmail = ''
    }
    if (this.request.IsOfficerPhoneCorrect == true) {
      this.request.NewOfficerPhoneId = ''
    }

  }

  saPhoneNumberValidator(control: FormControl): ValidationErrors | null {
    const phoneNumber = control.value?.number;
    if (phoneNumber != null) {
      const saPhoneNumberPattern = /^(05\d{8})$/; // Saudi Arabian phone number pattern without country code
      const isValid = saPhoneNumberPattern.test(phoneNumber);
      return isValid ? null : { saPhoneNumber: true };

    }
    return null;
  }

  isValidEmail(control: FormControl): ValidationErrors | null {
    let email = control.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isvalid= emailPattern.test(email);

    return isvalid ? null : { isValidEmail: true };

  }

  save() {
    this.submitted=true
    if(this.request.IsOfficerMailCorrect)
      this.request.NewOfficerEmail=""
    else
    {

      if(this.request.NewOfficerEmail=="")
      {
        this.toastr.error("الرجاء إدخال البريد الإلكتروني ")

        return   
      }
    }
    if(this.request.IsOfficerPhoneCorrect)
      this.request.NewOfficerPhoneId=""
    else
    {

      if(this.request.NewOfficerPhoneId=="")
      {
        this.toastr.error("الرجاء إدخال رقم الجوال ")

        return
      }
           
    }
    
    this.request.FactoryId = this.factoryId;
    this.request.PeriodId = this.periodId;
    console.log(this.request)




    if (this.request.Id == 0) {
      this.inspectorContactService
        .create(this.request)
        .subscribe((res: any) => {
          this.router.navigate(['/pages/Inspector/visit-landing/' + this.factoryId + '/' + this.periodId]);

        });

    }
    else {
      this.inspectorContactService
        .update(this.request)
        .subscribe((res: any) => {
          this.router.navigate(['/pages/Inspector/visit-landing/' + this.factoryId + '/' + this.periodId]);


        });
      this.toastr.success("تم الحفظ");

    }
  }

}
