import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileService } from 'src/app/core/service/file.service';
import { InspectorFactoryLocationService } from '../../factory-location.service';
import { FactoryLocationFileModel } from '../../models/factory-location-file-model.model';
import { FactoryLocationService } from 'src/app/modules/factory-location/factory-location.service';

@Component({
  selector: 'app-factory-location-file',
  templateUrl: './factory-location-file.component.html',
  styleUrls: ['./factory-location-file.component.scss']
})
export class FactoryLocationFileComponent implements OnInit {
  src!:string;
  files:any;
  InspectorsLocationfiles:any;
  @Input() factoryId!:string;
  @Input() periodId!:string;
  factoryLocationId!: number;
  Inspectorsfiles!:any
  request =new FactoryLocationFileModel()
  @ViewChild('fileInput') fileInput!: ElementRef;
constructor(  private fileService:FileService,
  private basicInfoService:InspectorFactoryLocationService,
  private factoryLocationService:FactoryLocationService,
){

}
ngOnInit(): void {
  this.getFiles();
  this.getInspectorsFiles()
 }
getFiles() {
  this.factoryLocationService
      .getAllFiles(this.factoryLocationId)
      .subscribe((res: any) => {
        this.files = res.Data;
      });
}
getInspectorsFiles() {
  let factoryid= parseInt( this.factoryId)
  let periodId=parseInt( this.periodId)
  this.basicInfoService
    .getFiles(factoryid,periodId)
    .subscribe((res: any) => {
      this.Inspectorsfiles = res.Data;
    
    });
}
save(){
  this.request.FactoryId= parseInt( this.factoryId)
  this.request.PeriodId=parseInt( this.periodId)
  this.basicInfoService
  .CreateFiles(this.request)
  .subscribe((res: any) => {
    this.getInspectorsFiles()
  });
  console.log(this.request)
  this.request= new FactoryLocationFileModel()
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