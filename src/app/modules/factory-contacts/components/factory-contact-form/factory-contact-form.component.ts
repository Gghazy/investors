import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { fade } from 'src/app/shared/animation/app.animation';
import { FactoryContactModel } from '../../models/factory-contact-model';
import { FactoryContactService } from '../../factory-contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-factory-contact-form',
  templateUrl: './factory-contact-form.component.html',
  styleUrls: ['./factory-contact-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryContactFormComponent implements OnInit {

  factoryId: any;
  request : any;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  phoneForm = new FormGroup({
    OfficerPhone: new FormControl(undefined, [Validators.required]),
    OfficerEmail: new FormControl(undefined, [Validators.required]),
    ProductionManagerPhone: new FormControl(undefined, [Validators.required]),
    ProductionManagerEmail: new FormControl(undefined, [Validators.required]),
    FinanceManagerPhone: new FormControl(undefined, [Validators.required]),
    FinanceManagerEmail: new FormControl(undefined, [Validators.required]),
    Id: new FormControl(0, [Validators.required]),
    FactoryId: new FormControl(undefined, [Validators.required]),

  });

  constructor(
    private route: ActivatedRoute,
    private factoryContactService: FactoryContactService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');

  }
  ngOnInit(): void {
    this.getContact();
  }

  getContact() {
    this.factoryContactService
      .getOne(this.factoryId)
      .subscribe((res: any) => {
        this.request = res.Data;
        this.phoneForm.setValue(res.Data);
        this.phoneForm.controls.OfficerPhone.setValue(res.Data.OfficerPhone.InternationalNumber);
        this.phoneForm.controls.FinanceManagerPhone.setValue(res.Data.FinanceManagerPhone.InternationalNumber);
        this.phoneForm.controls.ProductionManagerPhone.setValue(res.Data.ProductionManagerPhone.InternationalNumber);
      });
  }

  save() {
    this.request= this.phoneForm.value 
    this.request.FactoryId = this.factoryId;
    if (this.request.Id == 0) {
      this.factoryContactService
        .create(this.request)
        .subscribe((res: any) => {
          this.request = res.Data;
          this.router.navigate(['/pages/factory-landing/' + this.factoryId]);
          this.toastr.success("تم الحفظ");
        });
    }
    else {
      this.factoryContactService
        .update(this.request)
        .subscribe((res: any) => {
          this.router.navigate(['/pages/factory-landing/' + this.factoryId]);
          this.toastr.success("تم الحفظ");
        });
    }

  }
}
