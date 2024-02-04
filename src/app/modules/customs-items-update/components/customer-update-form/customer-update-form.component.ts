import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomsItemsUpdateService } from '../../customs-items-update.service';
import { ProductModel } from '../../models/product-model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SaveCustomLevelModel } from '../../models/save-custom-level-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-update-form',
  templateUrl: './customer-update-form.component.html',
  styleUrls: ['./customer-update-form.component.scss']
})
export class CustomerUpdateFormComponent implements OnInit {
@Input()factoryId!:number;
@Input()productName!:string;
@Input()productId!:number;
@Output()saveChanage=new EventEmitter<boolean>();
Level12Product !: ProductModel[];
selectedItems : ProductModel[]=[];
request=new SaveCustomLevelModel();


dropdownSettings!: IDropdownSettings;



  constructor(
    private customsItemsUpdateService:CustomsItemsUpdateService,
    private toastr: ToastrService
    ){}
  ngOnInit(): void {
    this.getLevel12Product();
    this.getCustomProductLevel();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'ProductName',
      selectAllText: 'تحديد الكل',
      unSelectAllText: 'ازالة التحديد',
      searchPlaceholderText:'بحث',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
  }
 
  getCustomProductLevel(){
    this.customsItemsUpdateService
    .getCustomProductLevel(this.productId)
    .subscribe((res: any) => {
      this.selectedItems = res.Data;
    });
  }

  getLevel12Product(){
    this.customsItemsUpdateService
    .getLevel12Product(this.factoryId,this.productId)
    .subscribe((res: any) => {
      this.Level12Product = res.Data;
    });
  }
  save(){
    
     this.request.CustomLevelProductIds= this.selectedItems.map(x=>x.Id);
     this.request.ProductId= this.productId;

    this.customsItemsUpdateService.SaveCustomLevel(this.request)
    .subscribe((res: any) => {
      this.saveChanage.emit(true);
      this.toastr.success("تم الحفظ");
    });
  }
}
