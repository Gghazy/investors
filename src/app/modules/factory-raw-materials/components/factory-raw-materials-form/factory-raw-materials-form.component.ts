import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { fade } from 'src/app/shared/animation/app.animation';
import { FactoryRawMaterialService } from '../../factory-raw-material.service';
import { ToastrService } from 'ngx-toastr';
import { RawMaterial } from '../../models/raw-material.model';
import { FileService } from 'src/app/core/service/file.service';
import { RawMaterialSearch } from '../../models/raw-material-search.model';
import { FactoryProductService } from 'src/app/modules/factory-products/factory-product.service';
import { ProductModel } from 'src/app/modules/customs-items-update/models/product-model';

@Component({
  selector: 'app-factory-raw-materials-form',
  templateUrl: './factory-raw-materials-form.component.html',
  styleUrls: ['./factory-raw-materials-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryRawMaterialsFormComponent implements OnInit {
  @Input() factoryId!:number;  
  @Output()close=new EventEmitter<boolean>();
 
  products  !: ProductModel[];
 

  request = new RawMaterial();
  search=new RawMaterialSearch(); 
  selectedProducts:any=[];
  
  constructor(private rawMaterialService: FactoryRawMaterialService,
    private fileService: FileService,
    private productService: FactoryProductService,
    private toastr: ToastrService,
   ) {


  }
  handleUploadClick(event: Event) {
    const targetButton = event.target as HTMLButtonElement;
    const closestDiv = targetButton.closest('div');

    if (closestDiv) {
      const fileInput = closestDiv.querySelectorAll('input')[0];

      if (fileInput) {
        fileInput.click();
      }
    }
  }

 


  dropdownList: any[] = [];
 
  selectedItems1 = [];
  selectedItems2 = [];

  dropdownSettings!: IDropdownSettings;

  ngOnInit() {
   
    // this.dropdownList = [
    //   { item_id: 4990, item_text: ' المنتج 1 ' },
    //   { item_id: 2, item_text: ' المنتج 2 ' },
    //   { item_id: 3, item_text: ' المنتج 3 ' },

    // ];
this.getProducts();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'ProductName',
      selectAllText: 'تحديد الكل',
      unSelectAllText: 'ازالة التحديد',
      searchPlaceholderText: 'بحث',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
  }



  getProducts() { 
    
    this.search.FactoryId=this.factoryId;
    this.productService
      .getAllPagination(this.search)
      .subscribe((res: any) => {
        this.products = res.Data.Items;
        console.log(this.products)
      });

  }
  onItemSelect(item: any) {
    this.request.ProductId = item.Id;
    this.selectedProducts.push(item)
       console.log(this.request.ProductId);
       console.log(this.selectedProducts);
  }
  onSelectAll(items: any) {
    //console.log(items);
  }

  onUnitSelect(event: Event) {
    let selectedValue: any = (event.target as HTMLSelectElement).value;
    if (selectedValue == "1") {
      this.request.AverageWeightKG =  this.request.MaximumMonthlyConsumption *1000
    }
    if (selectedValue == "3") {
      this.request.AverageWeightKG =  this.request.MaximumMonthlyConsumption /1000
    }
  }
 

  savePaper(file: any) {
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.request.PaperId = res.Data.Id
          console.log( this.request.PaperId)
        });
    }
  }
  savePhoto(file: any) {
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.request.PhotoId = res.Data.Id
          console.log(this.request.PhotoId)
        });
    }
  }

 

 

  save() {
    this.request.FactoryId = this.factoryId;
    this.request.AttachmentId = 1;
    this.rawMaterialService
      .create(this.request)
      .subscribe((res: any) => {
    //  this.router.navigate(['/pages/factory-raw-materials/'+this.factoryId]);
        this.close.emit(true);
        this.toastr.success("تم الحفظ");
        console.log(this.request)
      });
      
      this.request=new RawMaterial();

  }

 

  
}
