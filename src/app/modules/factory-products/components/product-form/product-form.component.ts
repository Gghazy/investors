import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { ProductModel } from 'src/app/modules/customs-items-update/models/product-model';
import { FactoryProductService } from '../../factory-product.service';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { FileService } from 'src/app/core/service/file.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
@Input() productId!:number;  
@Input() factoryId!:number;  
@Output()close=new EventEmitter<boolean>();
request=new ProductModel();
units!:LookUpModel[];

constructor(
  private factoryProductService:FactoryProductService,
  private lookUpService:LookUpService,
  private fileService:FileService,
  private toastr: ToastrService

  ){}
  ngOnInit(): void {
    if(this.productId!=0){
      this.getOne()

    }
    this.getUnits()
    
  }

  getOne(){
    this.factoryProductService
    .getOne(this.productId)
    .subscribe((res: any) => {
      this.request = res.Data;
    });
  }

  getUnits(){
    this.lookUpService
      .getAllUnits()
      .subscribe((res: any) => {
        
        this.units = res.Data;
      });
  }
savePaper(file:any){
  if (file.target.files.length > 0) {
    this.fileService
      .addFile(file.target.files[0])
      .subscribe((res: any) => {
        this.request.PaperId = res.Data.Id
      });
  }
}
savePhoto(file:any){
  if (file.target.files.length > 0) {
    this.fileService
      .addFile(file.target.files[0])
      .subscribe((res: any) => {
        this.request.PhotoId = res.Data.Id
      });
  }
}
save(){
  this.request.FactoryId=this.factoryId;
  if (this.productId==0){
    this.factoryProductService
    .create(this.request)
    .subscribe((res: any) => {
      this.close.emit(true);
      this.toastr.success("تم الحفظ");
    });
  }
  else{
    this.factoryProductService
    .update(this.request)
    .subscribe((res: any) => {
      this.close.emit(true);
      this.toastr.success("تم الحفظ");
    });
  }
}
}
