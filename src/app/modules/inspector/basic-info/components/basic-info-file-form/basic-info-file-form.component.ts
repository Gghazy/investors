import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FileService } from 'src/app/core/service/file.service';
import { BasicInfoFileModel } from '../../models/basic-info-file-model.model';
import { BasicInfoService } from '../../basic-info.service';

@Component({
  selector: 'app-basic-info-file-form',
  templateUrl: './basic-info-file-form.component.html',
  styleUrls: ['./basic-info-file-form.component.scss']
})
export class BasicInfoFileFormComponent {
  src!:string;
  files:any;
  @Input() factoryId!:number;
  @Input() periodId!:number;
  request =new BasicInfoFileModel()
  @ViewChild('fileInput') fileInput!: ElementRef;
constructor(  private fileService:FileService,
  private basicInfoService:BasicInfoService,
){

}

getFiles() {
  this.basicInfoService
    .getFiles(this.factoryId,this.periodId)
    .subscribe((res: any) => {
      this.files = res.Data;
    });
}

save(){
  this.request.FactoryId= this.factoryId
  this.request.PeriodId= this.periodId
  console.log(this.request)
  this.request= new BasicInfoFileModel()
  this.fileInput.nativeElement.value = '';
}
  saveFile(file: any) {
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.request.AttachmentId = res.Data.Id
         
        });
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
      this.getFiles();
    });
  }
}
