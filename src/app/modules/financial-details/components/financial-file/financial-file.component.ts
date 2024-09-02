import { Component, ElementRef, Input, OnInit,Output,EventEmitter, ViewChild } from '@angular/core';
import { FinancialFileModel } from '../../Models/financial-file-model';
import { FileService } from 'src/app/core/service/file.service';
import { FinancialDetailService } from '../../financial-detail.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FactoryLandingService } from 'src/app/modules/factory-landing/factory-landing.service';
import {ParamService}from 'src/app/core/service/paramService'


@Component({
  selector: 'app-financial-file',
  templateUrl: './financial-file.component.html',
  styleUrls: ['./financial-file.component.scss']
})
export class FinancialFileComponent implements OnInit {
  files:FinancialFileModel[]=[];
  factoryId: any;
  periodId:any
  request=new FinancialFileModel();
  src!:string;
  isDisabled:boolean=false;
  approveStatus!:boolean;
  basicInfiFileDeletedList:number[]=[]
  basicInfiFileAddedList:number[]=[]
  @Output() DeletedfileIds = new EventEmitter<any>();
  @Output() AddedfileIds = new EventEmitter<any>();
  @Input() financialId!:number;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Output() fileStatusFin = new EventEmitter<any>();
  @Output() fileStatusType = new EventEmitter<any>();

  

  fileError: string | null = null;
  addFileButton: boolean = false
  constructor(
    private route: ActivatedRoute,
    private fileService:FileService,
    private financialDetailService:FinancialDetailService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    public factoryLandingService: FactoryLandingService,
    private paramService: ParamService,

    ){
      this.factoryId = paramService.getfactoryId();
      this.periodId = paramService.getperiodId();
      this.approveStatus=paramService.getstatus()
      
    }

  ngOnInit(): void {
    if( this.factoryId==null||this.periodId==null)
      {
        return
      }
   this.getFiles();
   

  // this.ToggleDisable()
   
  }
  
  ToggleDisable() {
    let userId=  this.sharedService.getUserId()
    this.factoryLandingService
      .checkSataus(this.factoryId, this.periodId,userId)
      .subscribe((res: any) => {

        this.isDisabled=res.Data.isDisable
        console.log(this.isDisabled)
      });
  }
  getFiles() { 
    this.financialDetailService
      .getAllFiles(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.files = res.Data;
        this.deleteAll();
        this.fileStatusFin.emit(this.files.length);
        let type1=false;
        let type2=false;

        this.files.forEach(element => {
        if(element.Type=='zakat')
          {
           type1=true
          }
        if(element.Type=='FinancialStatement')
          {
            type2=true

          }


       });
       if(type1&&type2)
        this.fileStatusType.emit(true);
      else
      this.fileStatusType.emit(false);


      });
  }
  deleteAll()
  {
  
    this.basicInfiFileDeletedList.forEach((element:any) => {
    let index= this.files.findIndex(x=>x.Id== element)
    if (index !== -1) {
      this.files.splice(index, 1);
    }
  });
  }
  saveFile(file: any) {
    if (file.target.files.length > 0) {
    
    const file1 = file.target.files[0];
    const fileType = file1.type;
    const validFileTypes = ['application/pdf'];
    if (validFileTypes.includes(fileType)) {
      this.fileError = null;
    
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.request.AttachmentId = res.Data.Id
          this.toastr.success("تم تحميل الملف");

          console.log(this.request)
        });
        this.addFileButton = true
      } else {
        this.fileError = 'الرجاء رفع المستند بالصيغة الموضحة';

      }
    }
  }

  getFile(attachmentId:number){
    this.fileService.downloadTempelete(attachmentId).subscribe((res: any) => {
      this.downloadattachment(res)    });
  }
  downloadattachment(data: any) {
    const blob = new Blob([data], { type: data.type });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }
  save(){
   
    if (this.files.length > 10){
      this.fileError = 'الحد الاقصى للمرفقات 10';
      return
    }
    this.request.FactoryFinancialId=0;
    this.request.FactoryId=this.factoryId;
    this.request.PeriodId=this.periodId;
    this.request.Name='';
    console.log(this.request)
    if(this.files.length < 10){
    this.financialDetailService
    .createFile(this.request)
    .subscribe((res: any) => {
      if(res.IsSuccess==false)
        {
          this.toastr.error("خطأ في  ارفاق الملف");
        }
        else
        {
          this.basicInfiFileAddedList.push(res.Data.Id)
          this.AddedfileIds.emit( this.basicInfiFileAddedList);
      this.getFiles();
      this.fileStatusFin.emit(this.files.length);
      this.toastr.success("تم ارفاق الملف للبيانات المالية");
      this.request=new FinancialFileModel();
      this.fileInput.nativeElement.value = '';
        }
    });
 }
  }

  deleteFile(id:number){
    this.basicInfiFileDeletedList.push(id);
    this.DeletedfileIds.emit( this.basicInfiFileDeletedList);

    let index= this.files.findIndex(x=>x.Id== id)
    if (index !== -1) {
      this.files.splice(index, 1);
    }
    let type1=false;
    let type2=false;
    this.files.forEach(element => {
      if(element.Type=='zakat')
        {
         type1=true
        }
      if(element.Type=='FinancialStatement')
        {
          type2=true

        }


     });
     if(type1&&type2)
      this.fileStatusType.emit(true);
    else
    this.fileStatusType.emit(false);

  /*  this.financialDetailService
    .deleteFile(id)
    .subscribe((res: any) => {
      this.getFiles();
    });*/
  }
}
