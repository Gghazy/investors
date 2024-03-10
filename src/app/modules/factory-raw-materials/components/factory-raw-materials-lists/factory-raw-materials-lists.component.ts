import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ProductSearch } from 'src/app/modules/customs-items-update/models/product-search';

@Component({
  selector: 'app-factory-raw-materials-lists',
  templateUrl: './factory-raw-materials-lists.component.html',
  styleUrls: ['./factory-raw-materials-lists.component.scss']
})
export class FactoryRawMaterialsListsComponent implements OnInit {
  @ViewChild('closeModal') Modal!: ElementRef;
  factoryId: any;
  periodId: any;
  showKG: boolean = true
  materialCount!:number;
  materials = new ResultResponse<RawMaterial>();
  rawMaterials: any = [];
  request = new RawMaterial();
  search = new ProductSearch();
  selectedProducts: any = [];
  selectedItem!: any;
  ProductName: any;
  ss: any = [];
  data: any = [];
  ProductNameList: any = [];
  products  !: ProductModel[];
  dropdownSettings!: IDropdownSettings;
  units!: LookUpModel[];
  src!: string;
  saveSuccessful: boolean = false;

  constructor(private rawMaterialService: FactoryRawMaterialService,
    private productService: FactoryProductService,
    private lookUpService: LookUpService,
    private fileService: FileService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');

  }

  ngOnInit() {
   // this.getRawMaterial()
    this.getCustomRawMaterial()
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
    //    console.log(res)
      });
  }
  onItemSelect(item: any) {
    this.request.ProductIds.push(item.Id)
    //console.log(this.request.ProductIds)
  }
  onItemDeSelect(item: any) {
    this.request.ProductIds.splice(item.id)
  }



  getRawMaterial() {
    this.rawMaterialService
      .getRawMaterial(this.search, this.factoryId)
      .subscribe((res: any) => {
        this.rawMaterials = res.Data.Items;
        this.materials = res.Data;




        this.rawMaterials.forEach((item: RawMaterial) => {
          console.log(item)
          this.data.push({
            'Id':item.Id,
            'CustomItemRawMaterialId': item.CustomItemRawMaterialId,
            'CustomItemName': item.CustomItemName,
            'Name': item.Name,
            'MaximumMonthlyConsumption': item.MaximumMonthlyConsumption,
            'AverageWeightKG': item.AverageWeightKG,

            'Description': item.Description,
            'FactoryId': this.factoryId,
            'AttachmentId': item.AttachmentId,
            'PaperId': item.PaperId,
            'PhotoId': item.PhotoId,

            'UnitId': item.UnitId,
            'ProductIds': [1882,886]
            // item.ProductIds,

          })
        })
      });


  }

  deleteFile(id: number) {
    // this.fileService
    //   .delete(id)
    //   .subscribe((res: any) => {
    //     this.getFiles();
    //   });
  }

  onUnitSelect(data: RawMaterial) {


  //   let selectedValue: any = data.UnitId

  //   console.log(data.MaximumMonthlyConsumption)
  //   if (selectedValue != "11" || selectedValue != "15") {
  //     this.showKG = true
  //   //  console.log(this.showInput)
  //   }
  //   if (selectedValue == "11") {
  //     this.showKG = false
  //     data.AverageWeightKG = data.MaximumMonthlyConsumption
  //  //   console.log(this.request)
  //   }
  //   if (selectedValue == "15") {
  //     this.showKG = true
  //     data.AverageWeightKG = 1000
  //    // console.log(this.showInput)
  //   }

  }




  getCustomRawMaterial() {
    this.search.FactoryId = this.factoryId;
    console.log(this.data)
    this.productService
      .getAll(this.factoryId)
      .subscribe((res: any) => {

        this.rawMaterials = res.Data;
        this.materials = res.Data;
        console.log(this.rawMaterials)
        console.log(this.materials)
        this.ss = res.Data;
       
       // console.log(this.rawMaterials)
        this.rawMaterials.forEach((item: any) => {
          this.data.push({
            'Id':0,
            'CustomItemRawMaterialId': item.Id,
            'CustomItemName':  item.Hs12NameAr+"("+item.Hs12Code+")",
            'Name': '',
            'MaximumMonthlyConsumption': 0,
            'AverageWeightKG': 0,

            'Description': '',
            'FactoryId': this.factoryId,
            'AttachmentId': 0,
            'PaperId': 0,
            'PhotoId': 0,
            'UnitId':0,
            'ProductIds':'',

          })
        })
      })

  }

  onSelectionChange(item:any,i: number) {
    console.log(item)
   
     this.selectedItem = this.products.find(item => item.Id == this.data[i].CustomItemRawMaterialId);
    // if (selectedItem) {
      item.UnitId= this.selectedItem.UnitId ;
      
    // } 
    console.log(this.selectedItem)
  }


  savePaper(file: any, i: number) {
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.data[i].PaperId = res.Data.Id
        });
    }
  }
  savePhoto(file: any, i: number) {
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.data[i].PhotoId = res.Data.Id
        });
    }
  }




  getProducts() {

    this.search.FactoryId = this.factoryId;
    this.productService
      .getAll(this.factoryId)
      .subscribe((res: any) => {
        this.products = res.Data;
      });

  }

  getRawMaterialProducts(id: number) {


    this.productService
      .getOne(id)
      .subscribe((res: any) => {
        this.ProductName = res.Data.Items.ProductName;
      });

  }






  closePopUp() {
    this.Modal.nativeElement.click()
  }
  pageChanged(data: any) {
    this.search.PageNumber = data;
    this.getRawMaterial();

  }



  save() {

   this.data.forEach((element: RawMaterial) => {
     console.log(element)
     //  if (element.Id == 0) {

        this.rawMaterialService
          .create(element)
          .subscribe((res: any) => {
            this.router.navigate(['/pages/factory-landing', this.factoryId, this.periodId]);

         
          });


    //    }
    //   else {
    //     this.rawMaterialService
    //       .update(this.request)
    //       .subscribe((res: any) => {
    //         this.router.navigate(['/pages/factory-landing', this.factoryId, this.periodId]);

    //         this.toastr.success("تم الحفظ");
    //       });
    //  }

      if (this.saveSuccessful == true) {
        this.data = new RawMaterial();
        this.selectedProducts = []
      }

    });
    this.toastr.success("تم الحفظ");
  }

}
