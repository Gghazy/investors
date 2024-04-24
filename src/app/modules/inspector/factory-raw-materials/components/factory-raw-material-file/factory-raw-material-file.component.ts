import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileService } from 'src/app/core/service/file.service';
import { FactoryRawMaterialsFileModel } from '../../models/factory-raw-materials-file-model.model';
import { FactoryRawMaterialService } from 'src/app/modules/factory-raw-materials/factory-raw-material.service';
import { FactoryRawMaterialsService } from '../../factory-raw-materials.service';
@Component({
  selector: 'app-factory-raw-material-file',
  templateUrl: './factory-raw-material-file.component.html',
  styleUrls: ['./factory-raw-material-file.component.scss']
})
export class FactoryRawMaterialFileComponent implements OnInit {
  src!:string;
  files:any;
  Inspectorsfiles:any;
  @Input() factoryId!:string;
  @Input() periodId!:string;
  request =new FactoryRawMaterialsFileModel()
  @ViewChild('fileInput') fileInput!: ElementRef;
constructor(  private fileService:FileService,
  private rawMaterialService: FactoryRawMaterialService,
  private service:FactoryRawMaterialsService,
 // private FactoryService:BasicInfoService,
){

}ngOnInit(): void {
  this.getFiles();
  this.getInspectorsFiles()
 }
getFiles() {
  let factoryId= parseInt(this.factoryId)
  let periodId= parseInt(this.periodId)
  this.service
    .getFiles(factoryId,periodId)
    .subscribe((res: any) => {
      this.files = res.Data;
    
    });
}
getInspectorsFiles() {
  let factoryid= parseInt( this.factoryId)
  let periodId=parseInt( this.periodId)
  this.service
    .getFiles(factoryid,periodId)
    .subscribe((res: any) => {
      this.Inspectorsfiles = res.Data;
    
    });
}
save(){
  this.request.FactoryId= parseInt( this.factoryId)
  this.request.PeriodId=parseInt( this.periodId)
  this.service
  .CreateFiles(this.request)
  .subscribe((res: any) => {
    this.getInspectorsFiles
  });
  console.log(this.request)
  this.request= new FactoryRawMaterialsFileModel()
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
   
  }
}
