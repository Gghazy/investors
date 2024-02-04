import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomsItemsUpdateService } from 'src/app/modules/customs-items-update/customs-items-update.service';
import { ProductModel } from 'src/app/modules/customs-items-update/models/product-model';
import { SaveCustomLevelModel } from 'src/app/modules/customs-items-update/models/save-custom-level-model';
import { CheckLevelModel } from '../../models/check-level-model';
import { CustomsItemsCheckService } from '../../customs-items-check.service';

@Component({
  selector: 'app-custom-check-form',
  templateUrl: './custom-check-form.component.html',
  styleUrls: ['./custom-check-form.component.scss']
})
export class CustomCheckFormComponent implements OnInit {
  @Input()factoryId!:number;
  @Input()parentName!:string;
  @Input()productId!:number;
  @Input()parentId!:number;
  @Output()saveChanage=new EventEmitter<boolean>();
  Level12Product !: ProductModel[];
  selectedItems : ProductModel[]=[];
  request=new CheckLevelModel();
  oldProductId!:number;
  constructor(
    private customsItemsUpdateService:CustomsItemsUpdateService,
    private customsItemsCheckService:CustomsItemsCheckService,
    private toastr: ToastrService
    ){
      this.oldProductId=this.productId
    }
  ngOnInit(): void {
    this.getLevel12Product();
    this.oldProductId=this.productId
  }
 
  getLevel12Product(){
    this.productId
    this.customsItemsUpdateService
    .getLevel12Product(this.factoryId,this.parentId)
    .subscribe((res: any) => {
      this.Level12Product = res.Data;
    });
  }
  save(){
    
     this.request.ParentId= this.parentId;
     this.request.OldProductId= this.oldProductId;
     this.request.NewProductId= this.productId;

    this.customsItemsCheckService.saveCheckLevel(this.request)
    .subscribe((res: any) => {
      this.saveChanage.emit(true);
      this.toastr.success("تم الحفظ");
    });
  }
}
