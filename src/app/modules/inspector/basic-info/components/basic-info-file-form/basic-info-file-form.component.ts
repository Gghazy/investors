import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileService } from 'src/app/core/service/file.service';
import { BasicInfoFileModel } from '../../models/basic-info-file-model.model';
import { InspectorBasicInfoService } from '../../basic-info.service';
import { BasicInfoService } from 'src/app/modules/basic-info/basic-info.service';

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
constructor(  private fileService:FileService,
  private basicInfoService:InspectorBasicInfoService,
  private FactoryService:BasicInfoService,
){

}ngOnInit(): void {
  this.getFiles();
  this.getInspectorsFiles()
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
  console.log(this.request.AttachmentId)
  this.request.FactoryId= parseInt( this.factoryId)
  this.request.PeriodId=parseInt( this.periodId)
  this.request.Name =''
  this.basicInfoService
  .CreateFiles(this.request)
  .subscribe((res: any) => {
    this.getInspectorsFiles()
  });
  console.log(this.request)
 // this.request= new BasicInfoFileModel()
  this.fileInput.nativeElement.value = '';
}
  saveFile(file: any) {
    if (file.target.files.length > 0) {
      const file1 = file.target.files[0];
      const fileType = file1.type;

      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        this.fileError = null;
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.request.AttachmentId = res.Data.Id
         console.log(this.request)
        });
    }
    this.addFileButton =true
  } else {
    this.fileError = 'الرجاء رفع المستند بالصيغة الموضحة';
    
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
    });
  }
}
