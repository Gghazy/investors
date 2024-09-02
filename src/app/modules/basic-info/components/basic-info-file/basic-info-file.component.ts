import { Component, ElementRef, Input, Output, OnInit, ViewChild ,EventEmitter } from '@angular/core';
import { BasicFileModel } from '../../models/basic-file-model';
import { FileService } from 'src/app/core/service/file.service';
import { BasicInfoService } from '../../basic-info.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ParamService}from 'src/app/core/service/paramService'


@Component({
  selector: 'app-basic-info-file',
  templateUrl: './basic-info-file.component.html',
  styleUrls: ['./basic-info-file.component.scss']
})
export class BasicInfoFileComponent implements OnInit {
//  selectedValue: string = '0'; 
  selectedFirstItem: any = 0; 

  selectedFileForm!: FormGroup;
  basicInfiFileDeletedList:number[]=[]
  basicInfiFileAddedList:number[]=[]

  files:BasicFileModel[]=[];
  request=new BasicFileModel();
  src!:string;
  fileError: string | null = null;
  addFileButton:boolean= false
  approveStatus:boolean=false;
  @Input() factoryId!:string;
  @Input() periodId!:string;

  @ViewChild('fileInput') fileInput!: ElementRef;
  @Output() fileStatus = new EventEmitter<any>();
  @Output() DeletedfileIds = new EventEmitter<any>();
  @Output() AddedfileIds = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private fileService:FileService,
    private basicInfoService:BasicInfoService,
    private toastr: ToastrService,
    private paramService: ParamService

    ){
      this.approveStatus=paramService.getstatus()

    }

  ngOnInit(): void {
    if( this.factoryId==null||this.periodId==null)
      {
        return
      }
   this.getFiles();
   this.initValue();

  }
  initValue(){
    this.request.Type=this.selectedFirstItem;
    this.request.AttachmentId=0
    this.fileError = '';
   // this.approveStatus=this.approvedStatus!.toLocaleLowerCase()==="true"?true:false;
    //this.approveStatusText = this.route.snapshot.paramMap.get('isApproveStatus');
   /* if(this.approveStatusText=='3')
      this.approveStatus=true;
    else
    this.approveStatus=false;*/

   }
  selectFirstItem(): void {
    this.selectedFileForm = this.formBuilder.group({
      type: [0]
    });
    this.request.Type=  this.selectedFileForm.value.type;
  }
  getFiles() {
    this.basicInfoService
      .getAll(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.files = res.Data;
        this.deleteAll();
        this.fileStatus.emit(this.files.length);
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
  
    const input = file.target as HTMLInputElement;
   
    if (!input.files || input.files.length === 0) {
      this.fileError = 'لم تقم بإختيار ملف';
      console.error('لم تقم بإختيار ملف');
      return;
    }
    const fileImage = input.files[0];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
    if (fileImage.size > maxFileSize) {
      // If the file is larger than 5 MB
      this.fileError = ' الرجاء رفع مستند بحجم أقل من  5MB  ';
            console.error(' 5MB حجم الملف أكبر من');
    }
    else {
      const file1 = file.target.files[0];
      const fileType = file1.type;

      if (fileType === 'image/png' || fileType === 'image/jpeg' ||fileType === 'application/pdf') {
        this.fileError = null;

        this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.request.AttachmentId = res.Data.Id
          //
         

         // this.toastr.success("تم حفظ الملف ");

        });
        this.addFileButton =true
      } else {
        this.fileError = 'الرجاء رفع المستند بالصيغة الموضحة';
        
      }
    
    }
  }

  getFile(attachmentId:number){
    this.fileService.getImage(attachmentId).subscribe((res: any) => {
      this.src='data:image/jpeg;base64,'+res.Image
    });
  }

  save(){

    if(this.fileError!=null)
      {
        this.fileError = 'لم تقم بإختيار ملف';
        return
      }
      if (this.files.length > 10){
        this.fileError = 'الحد الاقصى للمرفقات 10';
        return
      }
      if(this.request.AttachmentId==0)
      {
       this.toastr.info ("الرجاء انتظار تحميل الملف");
        return
      }
    this.request.FactoryId=Number(this.factoryId);
    this.request.PeriodId=Number(this.periodId);
 
    if(this.files.length < 10){
      this.basicInfoService
      .create(this.request)
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
          this.toastr.success("تم ارفاق الملف");
          this.fileStatus.emit(this.files.length);
  
          this.request=new BasicFileModel();
          this.fileInput.nativeElement.value = '';
          this.initValue();

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
    this.fileStatus.emit(this.files.length);

   /* this.basicInfoService
    .delete(id)
    .subscribe((res: any) => {
      this.getFiles();
    });*/
  }

}
