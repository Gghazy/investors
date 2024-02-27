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
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { LookUpService } from 'src/app/core/service/look-up.service';

@Component({
  selector: 'app-factory-raw-materials-lists',
  templateUrl: './factory-raw-materials-lists.component.html',
  styleUrls: ['./factory-raw-materials-lists.component.scss']
})
export class FactoryRawMaterialsListsComponent implements OnInit {
  @ViewChild('closeModal') Modal!: ElementRef;
  factoryId: any;
   periodId: any;
  showKG: boolean=true
  materialCount: any;
  materials = new ResultResponse<RawMaterial>();
  rawMaterials: any = [];
  request = new RawMaterial();
  search = new RawMaterialSearch();
  selectedProducts: any = [];
  ProductName: any;
  ss: any = [];
  ProductNameList: any = [];
  products  !: ProductModel[];
  dropdownSettings!: IDropdownSettings;
  units!: LookUpModel[];
  src!: string;

  constructor(private rawMaterialService: FactoryRawMaterialService,
    private productService: FactoryProductService,
    private lookUpService: LookUpService,
    private fileService: FileService,
    private toastr: ToastrService,
    private route: ActivatedRoute) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodId');
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

    this.getUnits();
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
  getUnits() {
    this.lookUpService
      .getAllUnits()
      .subscribe((res: any) => {
        this.units = res.Data;
        console.log(res)
      });
  }
  onItemSelect(item: any) {
    // this.request.ProductIds = item.Id;
    // this.selectedProducts.push(item.Id)
    this.request.ProductIds.push(item.Id)
    console.log(this.request.ProductIds);
    console.log(this.selectedProducts);
  }


  onUnitSelect(event: Event) {

  
    let selectedValue: any = (event.target as HTMLSelectElement).value;
    if (selectedValue!="11" || selectedValue!="15")     {      
      this.showKG= true
       console.log(this.showInput)
      }
     if (selectedValue=="11")     {      
     this.showKG= false
      this.request.AverageWeightKG =  this.request.MaximumMonthlyConsumption
      console.log(this.showInput)
     }
     if (selectedValue=="15")     {      
      this.showKG= true
       this.request.AverageWeightKG =  1000
       console.log(this.showInput)
      }
     
  }
  getRawMaterial() {

    this.rawMaterialService
      // .getCustomItemRawMaterial()
      // .subscribe((res: any) => {
      //   ;
      //   this.rawMaterials = res.Data.Items;
      //   this.materials = res.Data;
      //   this.ss = res.Data;
      //   this.rawMaterials = res.Data;
      // })
      .getRawMaterial(this.search,this.factoryId)
      .subscribe((res: any) => {
        debugger;
        this.rawMaterials = res.Data.Items;
        this.materials = res.Data;
        this.ss = res.Data;
        console.log(this.rawMaterials.length)
        console.log(this.rawMaterials)
        this.materialCount = this.rawMaterials.length;

        this.ss.forEach((element: any) => {
          this.ProductNameList.push(element)
          console.log(this.ProductNameList)
        });
      });







  }
  getProducts() {

    this.search.FactoryId = this.factoryId;
    this.productService
      .getAllPagination(this.search)
      .subscribe((res: any) => {
        this.products = res.Data.Items;
        console.log(this.products)
      });

  }

  getRawMaterialProducts(id: number) {


    this.productService
      .getOne(id)
      .subscribe((res: any) => {
        this.ProductName = res.Data.Items.ProductName;
        console.log(this.ProductName)
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

        this.src = 'data:image/jpeg;base64,' + res.Image;
        console.log(res.Image)
      });
    }

  }
  downloadattachment(data: any) {
    const blob = new Blob([data], { type: data.type });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
    console.log(data)
  }

  closePopUp() {
    this.Modal.nativeElement.click()
  }
  pageChanged(data: any) {
    this.search.PageNumber = data;
    this.getRawMaterial();

  }



  save() {

    console.log(this.request)

    console.log(this.rawMaterials)

    console.log(this.request)
    this.request.FactoryId = this.factoryId;


   

    this.rawMaterials.forEach((element: RawMaterial) => {
      
   
    this.rawMaterialService
      .create(element)
      .subscribe((res: any) => {
    //  this.router.navigate(['/pages/factory-raw-materials/'+this.factoryId]);


        this.toastr.success("تم الحفظ");
        console.log(this.request)
      });

    });
  }

  //   this.rawMaterials.forEach((element: any) => {


  //     this.rawMaterialService
  //       .update(element)
  //       .subscribe((res: any) => {

  //       });
  //   });

  //   this.toastr.success("تم الحفظ");
  // }


}
