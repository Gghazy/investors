import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasicInfoService } from 'src/app/modules/basic-info/basic-info.service';
import { InspectorBasicInfoService } from '../../basic-info.service';
import { BasicInfoModel } from '../../models/basic-info.model';
import { FactoryModel } from 'src/app/modules/factory/models/factory-model';
import { FileService } from 'src/app/core/service/file.service';
import { BasicFileModel } from 'src/app/modules/basic-info/models/basic-file-model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PeriodService } from 'src/app/modules/period/period.service';
import {ParamService}from 'src/app/core/service/paramService'

@Component({
  selector: 'app-basic-info-form',
  templateUrl: './basic-info-form.component.html',
  styleUrls: ['./basic-info-form.component.scss']
})
export class BasicInfoFormComponent implements OnInit {
  files: BasicFileModel[] = [];
  requestFile = new BasicFileModel();
  request = new BasicInfoModel();
  src!: string;
  userId: any;
  factoryId: any;
  periodId: any;
  requestFactory = new BasicInfoModel();
  PeriodName!:string
  submitted=false;
  validbasicInfo=true;
  inspectorApproved=false;
  constructor(
    private route: ActivatedRoute,
    private shared: SharedService,
    private basicInfoService: BasicInfoService,
    private inspectorService: InspectorBasicInfoService,
    private fileService: FileService,
    private toastr: ToastrService,
    private router: Router,
    private periodService : PeriodService,
    private paramService: ParamService


  ) {
    this.factoryId = paramService.getfactoryId();
    this.periodId = paramService.getperiodId();
    this.inspectorApproved=paramService.getInspectorStatus()
  
   
  }
  ngOnInit() {
    this.userId = this.shared.getUserId();
    this.getBasicInfo();
    this.getFiles();
    this.getperiod()
    this.submitted=false;
    
  }
  onInputChange(event: Event): void {
   this.Valid();
    console.log('test')
    /*const target = event.target as HTMLInputElement;
    const closestRow = target.closest('.row');

    const showInputElement = closestRow?.querySelector('.show-input');

    if (showInputElement) {
      if (target.value == 'false') {
        showInputElement.classList.remove('d-none');
      } else {
        showInputElement.classList.add('d-none');
      }
    }*/
  }
  deleteFile(id: number) {
    this.basicInfoService
      .delete(id)
      .subscribe((res: any) => {
        this.getFiles();
      });
  }
  getFiles() {
    this.inspectorService
      .getOne(this.factoryId, this.periodId, this.userId)
      .subscribe((res: any) => {
        this.files = res.Data;
      });
  }

  saveFile(file: any) {
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.requestFile.AttachmentId = res.Data.Id
          console.log(this.requestFile)
        });
    }
  }
  NotValid()
  {
    this.validbasicInfo=false;
  }
  Valid()
  {
    this.validbasicInfo=true;
  }
  getperiod(){
    this.periodService
    .getOne(this.periodId)
    .subscribe((res: any) => {
      
      this.PeriodName= res.Data.PeriodName;
    });
  }
  getFile(attachmentId: number) {
    this.fileService.getImage(attachmentId).subscribe((res: any) => {
      this.src = 'data:image/jpeg;base64,' + res.Image
      const blob = new Blob([res], { type: res.type });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  getBasicInfo() {
    this.inspectorService
      .getOne(this.factoryId, this.periodId, this.userId)
      .subscribe((res: any) => {
        this.requestFactory = res.Data;
        console.log(this.requestFactory)
      });
  }

  save() {
    this.submitted=true;

   
    if(this.validbasicInfo)
    {
      if(this.requestFactory.IsFactNameCorrect)
        this.requestFactory.CorrectFactoryName=""
      if(this.requestFactory.IsFactStatusCorrect)
        this.requestFactory.CorrectFactoryStatus=-1
    }
    else
    {

      this.toastr.error("الرجاء التأكد من صحة البيانات المدخلة ")
      return
    }

/*
    if(!this.requestFactory.IsFactNameCorrect&&!this.requestFactory.IsFactStatusCorrect)
    {
      if(this.requestFactory.CorrectFactoryName==""&&this.requestFactory.CorrectFactoryStatus==-1)
      {
        this.toastr.error("الرجاء إدخال إسم المصنع والحالة الصحيحين")
      return   
      }

    }
    if(this.requestFactory.IsFactNameCorrect)
      this.requestFactory.CorrectFactoryName=""
    else
    {

      if(this.requestFactory.CorrectFactoryName=="")
      {
        this.toastr.error("الرجاء إدخال إسم المصنع ")
        return   

      }
    }
    if(this.requestFactory.IsFactStatusCorrect)
      this.requestFactory.CorrectFactoryStatus= -1
    else
    {

      if(this.requestFactory.CorrectFactoryStatus==-1)
      {
        this.toastr.error("الرجاء إختيار حالة المصنع ")
        return   
      }
    }
  */

    this.requestFactory.FactoryId = this.factoryId;
    this.requestFactory.PeriodId = this.periodId;
    console.log(this.request)
    if (this.requestFactory.Id == 0) {
      this.inspectorService
        .create(this.requestFactory)
        .subscribe((res: any) => {
          this.toastr.success(" تم حفظ البيانات الأساسية بنجاح");
          this.router.navigate(['/pages/Inspector/visit-landing']);

        });
    }
    else {
      this.inspectorService
        .update(this.requestFactory)
        .subscribe((res: any) => {
          this.toastr.success(" تم حفظ البيانات الأساسية بنجاح");
          this.router.navigate(['/pages/Inspector/visit-landing']);

        });
    }
   
  
  }
}
