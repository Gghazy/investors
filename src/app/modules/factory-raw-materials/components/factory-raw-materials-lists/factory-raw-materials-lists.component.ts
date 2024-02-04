import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactoryRawMaterialService } from '../../factory-raw-material.service';
import { ResultResponse } from 'src/app/core/models/result-response';
import { RawMaterial } from '../../models/raw-material.model';
import { RawMaterialSearch } from '../../models/raw-material-search.model';
import { FactoryProductService } from 'src/app/modules/factory-products/factory-product.service';
import { ProductModel } from 'src/app/modules/customs-items-update/models/product-model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/core/service/file.service';

@Component({
  selector: 'app-factory-raw-materials-lists',
  templateUrl: './factory-raw-materials-lists.component.html',
  styleUrls: ['./factory-raw-materials-lists.component.scss']
})
export class FactoryRawMaterialsListsComponent implements  OnInit{
  @ViewChild('closeModal') Modal!: ElementRef;
  factoryId: any;
  materialCount: any;
  materials = new ResultResponse<RawMaterial>();
  rawMaterials:any=[];
  request = new RawMaterial();
  search=new RawMaterialSearch(); 
  selectedProducts:any=[];
  products  !: ProductModel[];
  dropdownSettings!: IDropdownSettings;
 selectedItems:any=[];
  // selectedItems = [
  //   { Id: 4990, ProductName: ' المنتج 1 ' },
  //  { Id: 2, ProductName: ' المنتج 2 ' },
  // ];
  constructor( private rawMaterialService: FactoryRawMaterialService,
    private productService: FactoryProductService,
    private fileService: FileService,
    private toastr: ToastrService,
    private route: ActivatedRoute) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
  }
 
  ngOnInit() {
this.getRawMaterial()
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


this.getProducts()
  } 
  showInput = false;

  handleSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.showInput = selectedValue === 'yes';
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

  onSelectAll(items: any) {
    //console.log(items);
  }

  onItemSelect(item: any) {
    this.request.ProductId = item.Id;
  //  this.selectedProducts.push(item)
       console.log(this.request.ProductId);
       console.log(this.selectedProducts);
  }

  getRawMaterial() {

    this.rawMaterialService
      .getRawMaterial(this.search,this.factoryId)
      .subscribe((res: any) => {

        this.rawMaterials = res.Data.Items;
        this.materials = res.Data;
      //  this.rawMaterials.forEach((element: any) => {
      //   this.selectedItems.push({ Id:element.ProductId})
      //  });

        console.log(this.rawMaterials.length)
        console.log(this.rawMaterials)
        this.materialCount = this.rawMaterials.length;
        
      });
    

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

  getRawMaterialProducts(id:number) { 
    
    this.search.FactoryId=this.factoryId;
    this.productService
      .getOne(id)
      .subscribe((res: any) => {
        // this.selectedItems = res.Data.Items;
        // console.log(this.selectedItems)
      });

  }

  getFile(attachmentId: number) {
    if (attachmentId == null) {
      this.toastr.error("لا يوجد ملف");
    }
    else {
      this.fileService.downloadTempelete(attachmentId).subscribe((res: any) => {
        this.downloadattachment(res)
      });
    }

  }

 

  getImage(attachmentId: number) {
    if (attachmentId == null) {
      this.toastr.error("لا يوجد ملف");
    }
    else {
      this.fileService.getImage(attachmentId).subscribe((res: any) => {
        this.downloadattachment(res)
      });
    }

  }
  downloadattachment(data: any) {
    const blob = new Blob([data], { type: data.type });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  closePopUp(){
    this.Modal.nativeElement.click()
  }
  pageChanged(data:any){
    this.search.PageNumber=data;
    this.getRawMaterial();

  }
}
