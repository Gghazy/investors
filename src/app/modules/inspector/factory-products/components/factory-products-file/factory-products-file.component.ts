import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FactoryProductsFileModel } from '../../models/factory-products-file-model.model';
import { FileService } from 'src/app/core/service/file.service';
import { FactoryProductsService } from '../../factory-products.service';
import { FactoryProductService } from 'src/app/modules/factory-products/factory-product.service';

@Component({
  selector: 'app-factory-products-file',
  templateUrl: './factory-products-file.component.html',
  styleUrls: ['./factory-products-file.component.scss']
})
export class FactoryProductsFileComponent implements OnInit {
  src!:string;
  files:any;
  products:any;
  Inspectorsfiles:any;
  @Input() factoryId!:string;
  @Input() periodId!:string;
  request =new FactoryProductsFileModel()
  @ViewChild('fileInput') fileInput!: ElementRef;
constructor(  private fileService:FileService,
  private Service:FactoryProductsService,
  private FactoryService:FactoryProductService,
){

}ngOnInit(): void {
  this.getFiles();
  this.getInspectorsFiles()
  this.getProducts()
 }
getFiles() {
  // this.FactoryService
  //   .getAll(this.factoryId)
  //   .subscribe((res: any) => {
  //     this.files = res.Data;
    
  //   });
}
getInspectorsFiles() {
  let factoryid= parseInt( this.factoryId)
  this.Service
    .getFiles(factoryid)
    .subscribe((res: any) => {
      this.Inspectorsfiles = res.Data;
    
    });
}
save(){
  this.request.FactoryId= parseInt( this.factoryId)
  this.request.PeriodId=parseInt( this.periodId)
  console.log(this.request)
  this.Service
  .CreateFiles(this.request)
  .subscribe((res: any) => {
    this.getInspectorsFiles()
  });
 
  this.request= new FactoryProductsFileModel()
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
  getProducts() {
    this.request.FactoryId= parseInt( this.factoryId)
    this.request.PeriodId=parseInt( this.periodId)
   
    this.Service
      .getProducts(this.request.FactoryId,this.request.PeriodId) 
      .subscribe((res: any) => {
        this.products = res.Data;
        console.log(res)
      });
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
