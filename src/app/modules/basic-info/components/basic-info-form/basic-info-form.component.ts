import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fade } from 'src/app/shared/animation/app.animation';
import { BasicInfoService } from '../../basic-info.service';
import { FactoryModel } from 'src/app/modules/factory/models/factory-model';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FactorySearch } from 'src/app/modules/factory/models/factory-search';
import { PeriodService } from 'src/app/modules/period/period.service';

@Component({
  selector: 'app-basic-info-form',
  templateUrl: './basic-info-form.component.html',
  styleUrls: ['./basic-info-form.component.scss'],
  animations: [
    fade
  ]
})
export class BasicInfoFormComponent implements OnInit {
  BasicInfoForm!: FormGroup;

  factoryId: any;
  periodId: any;
  request = new FactoryModel();
  search = new FactorySearch();
  PeriodName!:string
  isDisabled!:boolean;
  submitted: boolean | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
     private basicInfoService: BasicInfoService,
     private toastr: ToastrService,
     private router: Router,
     private sharedService: SharedService,
     private periodService : PeriodService,
     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit(): void {
    this.createBasicInfoForm();
    this.ToggleDisable();
    this.getBasicInfo();
    this.getperiod();

  }
  createBasicInfoForm(): void {
   
    this.BasicInfoForm = this.formBuilder.group({
      dataEntryId: ['', [Validators.pattern("^[1-2][0-9]{9}$")]],
      dataReviewerId: ['', [Validators.pattern("^[1-2][0-9]{9}$")]],
      dataApproverId: ['', [Validators.pattern("^[1-2][0-9]{9}$")]],

    });
  }
  getBasicInfo() {
    this.basicInfoService
      .getOne(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.request = res.Data;
        console.log(this.request)
      });
  }
  ToggleDisable() {
    let userId=  this.sharedService.getUserId()

   this.isDisabled= this.sharedService.toggleDisable(this.factoryId,this.periodId,userId)
  
  }
  getperiod(){
    this.periodService
    .getOne(this.periodId)
    .subscribe((res: any) => {
      
      this.PeriodName= res.Data.PeriodName;
    });
  }
  
   save() {

    
    this.submitted = true;
  /*  if ((!this.BasicInfoForm.value.dataEntryId)&&(!this.BasicInfoForm.value.dataReviewerId)&&(!this.BasicInfoForm.value.dataApproverId))
     {
      this.toastr.error( 'رجاءا أدخل رقم هوية واحد على الأقل ');
      return;
     }*/
    

    if (this.BasicInfoForm.invalid) {
      this.toastr.error( 'رجاءا تاكد من صحة جميع الحقول المرسلة');
      return;
    }
    if (this.BasicInfoForm.value.dataEntryId)
    {
      this.request.DataEntry=this.BasicInfoForm.value.dataEntryId;
    }
    if (this.BasicInfoForm.value.dataReviewerId)
      {
        this.request.DataReviewer=this.BasicInfoForm.value.dataReviewerId;
      }
      if (this.BasicInfoForm.value.dataApproverId)
        {
          this.request.DataApprover=this.BasicInfoForm.value.dataApproverId;
        }


    this.request.FactoryId = this.factoryId;
    this.request.PeriodId = this.periodId;
     let res= this.basicInfoService
        .update(this.request)
        .subscribe((res: any) => {
        
          this.toastr.success("تم الحفظ");
          this.router.navigate(['/pages/factory-landing/'+this.factoryId+'/'+this.periodId]);
        });
  }
 
  changeStatus(){
    this.sharedService.factoryStatus=this.request.Status;
  }
}
