import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fade } from 'src/app/shared/animation/app.animation';
import { BasicInfoService } from '../../basic-info.service';
import { FactoryModel } from 'src/app/modules/factory/models/factory-model';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FactorySearch } from 'src/app/modules/factory/models/factory-search';
import { PeriodService } from 'src/app/modules/period/period.service';
import {ParamService}from 'src/app/core/service/paramService'

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
 statusFile!:number;
 fileDeletedList:number[]=[]
 fileAddedList:number[]=[]

  factoryId: any;
  periodId: any;
  approveStatusNumber:any;
  approveStatus=false;
  addedStatus=false;
  reviewStatus=false;

  approveStatusText:any;

  request = new FactoryModel();
  search = new FactorySearch();
  PeriodName!:string
  year!:number;
  isDisabled!:boolean;
  submitted: boolean | undefined;
  lockSaveItem=false;
  @Input() fileStatus!:string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
     private basicInfoService: BasicInfoService,
     private toastr: ToastrService,
     private router: Router,
     private sharedService: SharedService,
     private periodService : PeriodService,
     private paramService: ParamService

     ) {
    /*this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
    //this.approveStatusNumber = this.route.snapshot.paramMap.get('isApproveStatus');
    this.approveStatusText = this.route.snapshot.paramMap.get('isApproveStatus');
    if(this.approveStatusText=='3')
      this.approveStatus=true;*/
    this.factoryId = paramService.getfactoryId();
    this.periodId = paramService.getperiodId();
    this.approveStatus=paramService.getstatus()
    this.addedStatus=paramService.getAddedStatus()
    this.reviewStatus=paramService.getReviewerStatus()

   /* this.approveStatusText=completeStatus;
    let completeStatus = this.route.snapshot.paramMap.get('isApproveStatus');
    this.approveStatus=completeStatus!.toLocaleLowerCase()==="true"?true:false;
    this.approveStatusText=completeStatus;*/  }
  ngOnInit(): void {
    if( this.factoryId==null||this.periodId==null)
      {
        this.router.navigate(['error']);
        return
      }
    this.createBasicInfoForm();
    this.ToggleDisable();
    this.getBasicInfo();
    this.getperiod();

  }
  createBasicInfoForm(): void {
   let addedStatus=this.approveStatus||this.addedStatus||this.reviewStatus;
   let reviewStatus=this.approveStatus||this.reviewStatus;

    this.BasicInfoForm = this.formBuilder.group({
      dataEntryId: [{value:'',disabled: addedStatus}, Validators.compose([Validators.required, Validators.pattern("^[1-2][0-9]{9}$")])],
      dataReviewerId: [{value:'',disabled:reviewStatus}, Validators.compose([Validators.required, Validators.pattern("^[1-2][0-9]{9}$")])],
      dataApproverId: [{value:'',disabled: this.approveStatus}, Validators.compose([Validators.required, Validators.pattern("^[1-2][0-9]{9}$")])],

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

   //this.isDisabled= this.sharedService.toggleDisable(this.factoryId,this.periodId,userId)
  
  }
  getperiod(){
    this.periodService
    .getOne(this.periodId)
    .subscribe((res: any) => {
      this.year = res.Data.Year -1;
      this.PeriodName= res.Data.PeriodName;
    });
  }
  public getFilestatus(fileNo: any):void {
    this.statusFile=fileNo;
}
public DeleteFiles(fileIds: any):void {
  this.fileDeletedList=fileIds;
}
public AddFiles(fileIds: any):void {
  this.fileAddedList=fileIds;
}
deleteAddedFileList(){
  let length=this.fileAddedList.length
  let deletestat=true;
  this.fileAddedList.forEach(element => {
    this.basicInfoService
    .delete(element)
    .subscribe((res: any) => {
      length--;
      if(res.IsSuccess==false)
        {
         deletestat=false
        }
        if(length==0&&deletestat==false)
          this.toastr.error("خطأ في  حذف الملف");
      if(length==0)
        this.router.navigate(['/pages/factory-landing']);

    });
  });
 
}
deleteFileList(){
  let deletestat=true;
  let length=this.fileDeletedList.length
  this.fileDeletedList.forEach(element => {
    this.basicInfoService
    .delete(element)
    .subscribe((res: any) => {
      length--;
      if(res.IsSuccess==false)
        {
         deletestat=false
        }
        if(length==0&&deletestat==false)
          this.toastr.error("خطأ في  حذف الملف");

      
    });
  });
 
}/*
AddFileList(){
    
      if (this.fileAddedList.length > 10){
     //   this.fileError = 'الحد الاقصى للمرفقات 10';
      //  return
      }
    this.request.FactoryId=Number(this.factoryId);
    this.request.PeriodId=Number(this.periodId);
    this.fileAddedList.forEach(element => {
    this.basicInfoService
      .create(this.request)
      .subscribe((res: any) => {
     
  
      });
   });
     
    }*/
   

  
   cancel() {
   if(this.fileAddedList.length>0)
    {
      this.deleteAddedFileList();
    }
    else
      this.router.navigate(['/pages/factory-landing']);
  }
   save() {

    
    this.submitted = true;
   
    
    if (this.BasicInfoForm.invalid || this.statusFile<1) {
      if ((!this.BasicInfoForm.value.dataEntryId)||(!this.BasicInfoForm.value.dataReviewerId)||(!this.BasicInfoForm.value.dataApproverId))
        {
         this.toastr.error( 'الرجاء إكمال بيانات ارقام الهوية ');
         return;
        }
   
      this.toastr.error( 'رجاءا تاكد من صحة جميع الحقول المرسلة');
      return;
    }
    if(this.statusFile<=0)
      {  this.toastr.error( 'الرجاء إختيار صورة واجهة المصنع');
        return;
      }
      if(this.lockSaveItem)
        {
            this.toastr.error("عملية حفظ/تعديل البيانات الأساسية قيد التنفيذ")
            return
            
        }
    if (this.BasicInfoForm.value.dataEntryId)
    {
      this.request.DataEntry=this.BasicInfoForm.value.dataEntryId;
    }
   // else
   // this.request.DataEntry='';

    if (this.BasicInfoForm.value.dataReviewerId)
      {
        this.request.DataReviewer=this.BasicInfoForm.value.dataReviewerId;
      }
    //  else
   //   this.request.DataReviewer='';

      if (this.BasicInfoForm.value.dataApproverId)
        {
          this.request.DataApprover=this.BasicInfoForm.value.dataApproverId;
        }
        //else
       // this.request.DataApprover='';
      
       if(this.fileDeletedList.length>0)
       {
         this.deleteFileList();
   
       }
 
    this.lockSaveItem=true;
    this.request.FactoryId = this.factoryId;
    this.request.PeriodId = this.periodId;
     let res= this.basicInfoService
        .update(this.request)
        .subscribe((res: any) => {
          if(res.IsSuccess==false)
            {
                this.toastr.error("خطأ في عملية حفظ البيانات الأساسية")
            }
            else
            {
              this.toastr.success("تم حفظ البيانات الأساسية بنجاح");
              this.router.navigate(['/pages/factory-landing']);
            }
            this.lockSaveItem=false;
        });
  }
 
  changeStatus(){
    this.sharedService.factoryStatus=this.request.Status;
  }
}
