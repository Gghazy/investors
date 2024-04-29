import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileService } from 'src/app/core/service/file.service';
import { InspectorActualProductionAndDesignedCapacityService } from '../../actual-production-and-designed-capacity.service';
import { ActualProductionAndDesignedCapacityService } from 'src/app/modules/actual-production-and-designed-capacity/actual-production-and-designed-capacity.service';
import { ActualProductionAndDesignedCapacityFileModel } from '../../models/actual-production-and-designed-capacity-file-model.model';

@Component({
  selector: 'app-actual-production-and-designed-capacity-file',
  templateUrl: './actual-production-and-designed-capacity-file.component.html',
  styleUrls: ['./actual-production-and-designed-capacity-file.component.scss']
})
export class ActualProductionAndDesignedCapacityFileComponent implements OnInit {
  src!:string;
  files:any;
  Inspectorsfiles:any;
  @Input() factoryId!:string;
  @Input() periodId!:string;
  request =new ActualProductionAndDesignedCapacityFileModel()
  @ViewChild('fileInput') fileInput!: ElementRef;
constructor(  private fileService:FileService,
  private ActualProductionService:InspectorActualProductionAndDesignedCapacityService,
  private FactoryService:ActualProductionAndDesignedCapacityService,
){

}ngOnInit(): void {
  this.getFiles();
  this.getInspectorsFiles()
 }
getFiles() {
  // this.FactoryService
  //   .getOne(this.factoryId,this.periodId)
  //   .subscribe((res: any) => {
  //     this.files = res.Data;
    
  //   });
}
getInspectorsFiles() {
  let factoryid= parseInt( this.factoryId)
  let periodId=parseInt( this.periodId)
  this.ActualProductionService
    .getFiles(factoryid,periodId)
    .subscribe((res: any) => {
      this.Inspectorsfiles = res.Data;
    console.log(res)
    });
}
save(){
  this.request.FactoryId= parseInt( this.factoryId)
  this.request.PeriodId=parseInt( this.periodId)
  this.ActualProductionService
  .CreateFiles(this.request)
  .subscribe((res: any) => {
    this.getInspectorsFiles()
  });
  console.log(this.request)
  //this.request= new BasicInfoFileModel()
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

