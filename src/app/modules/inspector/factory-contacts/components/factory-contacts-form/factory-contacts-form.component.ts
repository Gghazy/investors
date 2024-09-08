import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FactoryContactModel, phoneModel } from 'src/app/modules/factory-contacts/models/factory-contact-model';
import { FactoryContactsModel } from '../../models/factory-contacts.model';
import { InspectorFactoryContactsService } from '../../factory-contacts.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { PeriodService } from 'src/app/modules/period/period.service';
import {ParamService}from 'src/app/core/service/paramService'

@Component({
  selector: 'app-factory-contacts-form',
  templateUrl: './factory-contacts-form.component.html',
  styleUrls: ['./factory-contacts-form.component.scss']
})
export class FactoryContactsFormComponent implements OnInit {
  factoryId: any;
  periodId: any;
  factoryStatus:any;
  phoneForm!: FormGroup;
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
newphone!:phoneModel
inspectorApproved=false
  
  constructor(
    private route: ActivatedRoute,
    private inspectorContactService: InspectorFactoryContactsService,
    private shared: SharedService,
    private toastr: ToastrService,
    private router: Router,
    private periodService : PeriodService,
    private paramService: ParamService


  ) {
    this.factoryId = paramService.getfactoryId();
    this.periodId = paramService.getperiodId();
    this.inspectorApproved=paramService.getInspectorStatus()
    this.factoryStatus=this.paramService.getInspectorfactoryStatus()
  
  }
  ngOnInit() {
    if( this.factoryId==null||this.periodId==null)
      {
        this.router.navigate(['error']);
        return
      }
    this.createContactForm()
    this.userId = this.shared.getUserId();
    this.getContact()
    this.getperiod()

  }

  getContact() {
    this.request.IsOfficerPhoneCorrect=true;
    this.request.IsOfficerMailCorrect=true;
    this.inspectorContactService
      .getOne(this.factoryId, this.periodId, this.userId)
      .subscribe((res: any) => {
        this.request = res.Data;
        console.log(this.request)
        this.phoneForm.get('NewOfficerPhoneId')?.setValue(this.request.NewOfficerPhoneId);

        if(this.request.IsOfficerMailCorrect)
        {
          
          this.phoneForm.get('NewOfficerEmail')?.setErrors(null);
          
        }
        if(this.request.IsOfficerPhoneCorrect)
        {
          
        this.phoneForm.get('NewOfficerPhoneId')?.setErrors(null);
       
        }


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
      this.phoneForm.get('NewOfficerEmail')?.setErrors(null);
      

    }
    if (this.request.IsOfficerPhoneCorrect == true) {
      this.phoneForm.get('NewOfficerPhoneId')?.setValue('');
      this.phoneForm.get('NewOfficerPhoneId')?.setErrors(null);
      this.request.NewOfficerPhoneId = ''
    }

  }
  onValidNewOfficerEmail()
  {
    this.phoneForm.get('NewOfficerEmail')?.setErrors(null);

  }
  onValidNewOfficerPhoneId()
  {
    this.phoneForm.get('NewOfficerPhoneId')?.setErrors(null);
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
  createContactForm(): void {
   
     this.phoneForm = new FormGroup({       
      OldOfficerEmail:  new FormControl({ value: '', disabled: true }), 
      OldOfficerPhoneId:  new FormControl({ value: '', disabled: true }),   
      IsOfficerMailCorrect:  new FormControl({ value: '', disabled: this.inspectorApproved }),   
      IsOfficerPhoneCorrect:  new FormControl({ value: '', disabled: this.inspectorApproved }), 
      Comments:  new FormControl({ value: '', disabled: this.inspectorApproved }),                                                        
      NewOfficerPhoneId: new FormControl({ value: '', disabled: this.inspectorApproved },
         [Validators.required, this.saPhoneNumberValidator]), 
      NewOfficerEmail: new FormControl({ value: '', disabled: this.inspectorApproved }, 
        [ Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
         
      ]),
     
  
    });
      
    }
  save() {

    this.submitted=true

  
    if (this.phoneForm.invalid) {
      
        
      this.toastr.error( 'رجاءا تاكد من صحة جميع الحقول المدخلة');
     
      return;
    }
    if(this.factoryStatus!=4)
    {
    this.newphone=this.phoneForm.get('NewOfficerPhoneId')?.value;
    if(this.newphone.number==undefined)
      this.request.NewOfficerPhoneId=''
    else
    this.request.NewOfficerPhoneId=this.newphone.number
    }else
    {
      this.request.OldOfficerEmail=''
      this.request.OldOfficerPhoneId=''
      this.request.NewOfficerEmail=''
      this.request.NewOfficerPhoneId=''
      this.request.IsOfficerMailCorrect=true
      this.request.IsOfficerPhoneCorrect=true


    }

    this.request.FactoryId = this.factoryId;
    this.request.PeriodId = this.periodId;
    console.log(this.request)



    if (this.request.Id == 0) {
      this.inspectorContactService
        .create(this.request)
        .subscribe((res: any) => {
          this.toastr.success(" تم حفظ بيانات جهة الإتصال بنجاح");

          this.router.navigate(['/pages/Inspector/visit-landing']);

        });

    }
    else {
      this.inspectorContactService
        .update(this.request)
        .subscribe((res: any) => {
          this.toastr.success(" تم حفظ بيانات جهة الإتصال بنجاح");
          this.router.navigate(['/pages/Inspector/visit-landing']);


        });

    }
  }

}
