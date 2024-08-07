import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileService } from 'src/app/core/service/file.service';
import { BasicInfoFileModel } from '../../models/basic-info-file-model.model';
import { InspectorBasicInfoService } from '../../basic-info.service';
import { BasicInfoService } from 'src/app/modules/basic-info/basic-info.service';
import { ToastrService } from 'ngx-toastr';
import {ParamService}from 'src/app/core/service/paramService'

@Component({
  selector: 'app-basic-info-file-form',
  templateUrl: './basic-info-file-form.component.html',
  styleUrls: ['./basic-info-file-form.component.scss']
})
export class BasicInfoFileFormComponent implements OnInit {
  src!:string;
  files:any;
  Inspectorsfiles:any;
  fileError: string | null = null;
  addFileButton:boolean= false
  @Input() factoryId!:string;
  @Input() periodId!:string;
  request =new BasicInfoFileModel()
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFirstItem: any = 0; 
  inspectorApproved=false;

constructor(  private fileService:FileService,
  private basicInfoService:InspectorBasicInfoService,
  private FactoryService:BasicInfoService,
  private toastr: ToastrService,
  private paramService: ParamService

  
){
  this.inspectorApproved=paramService.getInspectorStatus()

}
ngOnInit(): void {
  this.getFiles();
  this.getInspectorsFiles()
  this.initValue();


 }
 initValue(){
  this.request.Type=this.selectedFirstItem;
  this.fileError = '';
 

 }
getFiles() {
  this.FactoryService
    .getAll(this.factoryId,this.periodId)
    .subscribe((res: any) => {
      this.files = res.Data;
    console.log(this.files)
    });
}
getInspectorsFiles() {
  let factoryid= parseInt( this.factoryId)
  let periodId=parseInt( this.periodId)
  this.basicInfoService
    .getFiles(factoryid,periodId)
    .subscribe((res: any) => {
      this.Inspectorsfiles = res.Data;
    console.log(this.Inspectorsfiles)
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
  
  console.log(this.request.AttachmentId)
  this.request.FactoryId= Number( this.factoryId)
  this.request.PeriodId=Number( this.periodId)
  if(this.files.length < 10){
  this.request.Name =''
  this.basicInfoService
  .CreateFiles(this.request)
  .subscribe((res: any) => {
    this.getInspectorsFiles()
    this.toastr.success("تم ارفاق الملف");
   // this.fileStatus.emit(this.files.length);
    this.request=new BasicInfoFileModel();
    this.fileInput.nativeElement.value = '';
    this.initValue();
  });
}
  console.log(this.request)
  this.request= new BasicInfoFileModel()
  this.fileInput.nativeElement.value = '';
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
    else  {
      const file1 = file.target.files[0];
      const fileType = file1.type;

      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        this.fileError = null;
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.request.AttachmentId = res.Data.Id
        //  this.toastr.success("تم حفظ الملف ");

         console.log(this.request)
        });
        this.addFileButton =true

    }
    else {
      this.fileError = 'الرجاء رفع المستند بالصيغة الموضحة';
      
    }
  } 
 
  }
getFile(attachmentId:number){
  console.log(attachmentId)
    this.fileService.getImage(attachmentId).subscribe((res: any) => {
      this.src='data:image/jpeg;base64,'+res.Image
    });
  }


deleteFile(id:number){
    this.basicInfoService
    .delete(id)
    .subscribe((res: any) => {
      this.getInspectorsFiles();
      this.toastr.success("تم حذف الملف المرفق");

    });
  }
}
