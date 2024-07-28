import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { fade } from 'src/app/shared/animation/app.animation';
import { FactoryContactModel } from '../../models/factory-contact-model';
import { FactoryContactService } from '../../factory-contact.service';
import { ToastrService } from 'ngx-toastr';
import { PeriodService } from 'src/app/modules/period/period.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-factory-contact-form',
  templateUrl: './factory-contact-form.component.html',
  styleUrls: ['./factory-contact-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryContactFormComponent implements OnInit {
  submitted: boolean | undefined;
  phoneForm!: FormGroup;
  officerPhoneValue:any;
  financeManagerPhoneValue:any;
  productionManagerPhoneValue:any;


contactDetails=new FactoryContactModel();
  contactId=0;
  isDisabled!:boolean;
  factoryId: any;
  periodId: any;
  request: any;
  defaultPhone:any;
  PeriodName!:string
  year!:number;
  approveStatus=false;
  approveStatusText:any;
  separateDialCode = false;
  lockSaveItem=false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  

  constructor(
    private route: ActivatedRoute,
    private factoryContactService: FactoryContactService,
    private toastr: ToastrService,
    private router: Router,
    private periodService : PeriodService,
    private sharedService:SharedService
  ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
    this.approveStatusText = this.route.snapshot.paramMap.get('isApproveStatus');
    if(this.approveStatusText=='3')
      this.approveStatus=true;


  }
  ngOnInit(): void {
    this.createContactForm();

    this.ToggleDisable()
    this.getContact();
    this.getperiod()
    this.defaultPhone="0xxxxxxxxx";
   


  }
  updateContactForm(): void {
   
    this.phoneForm = new FormGroup({
      OfficerPhone: new FormControl({value:this.officerPhoneValue,disabled: 
        this.approveStatus}, 
        [Validators.required, this.saPhoneNumberValidator]),
      ProductionManagerPhone: new FormControl({value:this.productionManagerPhoneValue,
        disabled: this.approveStatus},
         [Validators.required, this.saPhoneNumberValidator]),                                                                                                       
      FinanceManagerPhone: new FormControl({value:this.financeManagerPhoneValue,
        disabled: this.approveStatus}, [Validators.required,
           this.saPhoneNumberValidator]),

    });
  }
createContactForm(): void {
  this.financeManagerPhoneValue=this.financeManagerPhoneValue!=null?this.financeManagerPhoneValue:null
   this.phoneForm = new FormGroup({
    OfficerPhone: new FormControl({value:this.officerPhoneValue,disabled: this.approveStatus}, [Validators.required, this.saPhoneNumberValidator]),
    OfficerEmail: new FormControl({value:null,disabled: this.approveStatus}, [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
    ProductionManagerPhone: new FormControl({value:this.productionManagerPhoneValue,disabled: this.approveStatus}, [Validators.required, this.saPhoneNumberValidator]),
    ProductionManagerEmail: new FormControl({value:null,disabled: this.approveStatus}, [Validators.required,    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ]),                                                                                                           
    FinanceManagerPhone: new FormControl({value:this.financeManagerPhoneValue,disabled: this.approveStatus}, [Validators.required, this.saPhoneNumberValidator]),
    FinanceManagerEmail: new FormControl({value:null,disabled: this.approveStatus}, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ]),
    FactoryId: new FormControl(undefined)

  });
    
  }
  
  getContact() {

    this.factoryContactService
      .getOne(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        debugger
        // this.request = res.Data;
        // this.phoneForm.setValue(res.Data);
        this.contactId=res.Data.Id;
        this.contactDetails=res.Data
        this.officerPhoneValue=res.Data.OfficerPhone.Number;
        this.financeManagerPhoneValue=res.Data.FinanceManagerPhone.Number;
        this.productionManagerPhoneValue=res.Data.ProductionManagerPhone.Number;
        this.updateContactForm();


       // this.phoneForm.controls.OfficerPhone.value=res.Data.OfficerPhone.Number;
        //this.phoneForm.controls.FinanceManagerPhone.setValue(res.Data.FinanceManagerPhone.Number);
        //this.phoneForm.controls.ProductionManagerPhone.setValue(res.Data.ProductionManagerPhone.Number);
        
       // this.phoneForm.controls.OfficerEmail.setValue(res.Data.OfficerEmail);
       // this.phoneForm.controls.FinanceManagerEmail.setValue(res.Data.FinanceManagerEmail);
     //   this.phoneForm.controls.ProductionManagerEmail.setValue(res.Data.ProductionManagerEmail);
      });
  }
  ToggleDisable() {
    let userId=  this.sharedService.getUserId()

   //this.isDisabled= this.sharedService.toggleDisable(this.factoryId,this.periodId,userId)
  
  }
  save() {
    this.submitted = true;
    
    if (this.phoneForm.invalid) {
      this.toastr.error( 'رجاءا تاكد من صحة جميع الحقول المرسلة');
    
      return;
    }
    if(this.lockSaveItem)
      {
          this.toastr.error("عملية حفظ/تعديل بيانات جهة الاتصال قيد التنفيذ")
          return
          
      }
    this.request = this.phoneForm.value
    this.request.FactoryId = this.factoryId;
    this.request.periodId = this.periodId;
    this.request.Id=this.contactId
    if (this.request.Id == 0) {
      this.lockSaveItem=true;
      this.factoryContactService
        .create(this.request)
        .subscribe((res: any) => {
          this.request = res.Data;
          this.lockSaveItem=false;
          this.toastr.success("تم حفظ بيانات جهة الإتصال بنجاح");
          this.router.navigate(['/pages/factory-landing/'+this.factoryId+'/'+this.periodId+'/'+this.approveStatusText]);

        });
    }
    else {
      this.lockSaveItem=true
      this.factoryContactService
        .update(this.request)
        .subscribe((res: any) => {
          this.toastr.success("تم تعديل بيانات جهة الإتصال بنجاح");
          this.lockSaveItem=false
          this.router.navigate(['/pages/factory-landing/'+this.factoryId+'/'+this.periodId+'/'+this.approveStatusText]);

        });
    }

  }
  getperiod(){
    this.periodService
    .getOne(this.periodId)
    .subscribe((res: any) => {
      this.year = res.Data.Year -1;
      this.PeriodName= res.Data.PeriodName;
    });
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
}
