import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FactoryRawMaterialService } from '../../factory-raw-material.service';
import { ResultResponse } from 'src/app/core/models/result-response';
import { RawMaterial } from '../../models/raw-material.model';
import { FactoryProductService } from 'src/app/modules/factory-products/factory-product.service';
import { ProductModel } from 'src/app/modules/customs-items-update/models/product-model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/core/service/file.service';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { ProductSearch } from 'src/app/modules/customs-items-update/models/product-search';
import { SearchCriteria } from 'src/app/core/models/search-criteria';
import { RawMaterialSearch } from '../../models/raw-material-search.model';
import { PeriodService } from 'src/app/modules/period/period.service';

@Component({
  selector: 'app-factory-raw-materials-lists',
  templateUrl: './factory-raw-materials-lists.component.html',
  styleUrls: ['./factory-raw-materials-lists.component.scss']
})
export class FactoryRawMaterialsListsComponent implements OnInit {
  @ViewChild('closeModal') Modal!: ElementRef;
  factoryId: any;
  periodId: any;
  Id!: number;
  showKG: boolean = false
  materialCount!: number;
  materials = new ResultResponse<RawMaterial>();
  rawMaterials: any = [];
  request = new RawMaterial();
  search = new SearchCriteria();
  searchRawmaterial = new RawMaterialSearch();
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
  numRows: number = 0;
  PeriodName!: string;
  modalLabel!: string;
  constructor(private rawMaterialService: FactoryRawMaterialService,
    private productService: FactoryProductService,
    private lookUpService: LookUpService,
    private fileService: FileService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private periodService: PeriodService) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');

  }

  ngOnInit() {
    this.getRawMaterial()
    // this.getProducts()
    // this.getUnits();
    // this.getperiod()
  }


  getperiod() {
    this.periodService
      .getOne(this.periodId)
      .subscribe((res: any) => {

        this.PeriodName = res.Data.PeriodName;
      });
  }

  edit(id: number) {
    if (id == 0) {
      this.modalLabel = 'إضافة مادة أولية'
    }
    else {
      this.modalLabel = 'تعديل مادة أولية'
    }
    this.Id = id
  }


  delete(id: number) {

    this.rawMaterialService
      .delete(id)
      .subscribe((res: any) => {
        this.toastr.success("تم الحذف");
        this.getRawMaterial()
      });



  }


  getUnits() {
    this.lookUpService
      .getAllUnits()
      .subscribe((res: any) => {
        this.units = res.Data;
      });
  }



  getRawMaterial() {
    debugger
    this.searchRawmaterial.PeriodId = this.periodId;

    this.rawMaterialService
      .getRawMaterial(this.searchRawmaterial, this.factoryId)
      .subscribe((res: any) => {
        if (res) {
          //this.rawMaterials = res.Data.Items;
          this.data = res.Data.Items;
console.log(this.data)
          // this.getProducts()
          // this.rawMaterials.forEach((item: RawMaterial) => {
          //   let productId = parseInt(item.CustomItemName)
          //   let product12 = this.products.find(x => x.Id == productId)?.ProductName;
          //   // this.data.push({
            //   'Id': item.Id,
            //   'Product12': product12,
            //   'CustomItemName': item.CustomItemName,
            //   'Name': item.Name,
            //   'MaximumMonthlyConsumption': item.MaximumMonthlyConsumption,
            //   'AverageWeightKG': item.AverageWeightKG,
            //   'Description': item.Description,
            //   'FactoryId': this.factoryId,
            //   'PaperId': item.PaperId,
            //   'PhotoId': item.PhotoId,
            //   'UnitId': item.UnitId,
            //   'FactoryProductId': item.FactoryProductId
            // })
          // })

        }
        else {
          console.log('No content returned from server (204)');
        }
      }
       


      );


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
      });
    }

  }
  downloadattachment(data: any) {
    const blob = new Blob([data], { type: data.type });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }










  getProducts() {

    this.productService
      .getAllProducts()
      .subscribe((res: any) => {
        this.products = res.Data;
      });

  }






  closePopUp() {
    this.Modal.nativeElement.click()
    this.getRawMaterial()
  }
  pageChanged(data: any) {
    this.search.PageNumber = data;
    this.getRawMaterial();

  }



  save() {

    this.toastr.success("تم الحفظ");
  }

}
