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
  Id!: number |undefined;
  showKG: boolean = false
  materialCount!: number;
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
  numRows: number = 0;


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
    this.getRawMaterial()
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'ProductId',
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
  edit(id: number) {
    this.Id=id
    console.log(id)
   
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
    console.log(item)
    console.log(this.request)
    this.request.FactoryProductId.push(item.ProductId)
    console.log(this.request.FactoryProductId)
  }
  onItemDeSelect(item: any) {
    this.request.FactoryProductId.splice(item.ProductId)
  }



  getRawMaterial() {
    
    this.rawMaterialService
        .getRawMaterial(this.search, this.factoryId)
        .subscribe((res: any) => {
        if ( res) {
          this.rawMaterials = res.Data.Items;
          console.log(res.Data)
          this.materials = res.Data;
       //  this.materialCount = this.materials.Items.length;

          console.log(this.materialCount)


          this.rawMaterials.forEach((item: RawMaterial) => {
           
            console.log(item)
            this.data.push({
              'Id': item.Id,
              'CustomItemName': item.CustomItemName,
              'Name': item.Name,
              'MaximumMonthlyConsumption': item.MaximumMonthlyConsumption,
              'AverageWeightKG': item.AverageWeightKG,

              'Description': item.Description,
              'FactoryId': this.factoryId,
              //  'AttachmentId': item.AttachmentId,
              'PaperId': item.PaperId,
              'PhotoId': item.PhotoId,

              'UnitId': item.UnitId,
              'FactoryProductId': item.FactoryProductId 
            })
          })
        }
        else {
         
      }

    });


      
    this.search.FactoryId = this.factoryId;
    console.log(this.data)
    this.productService
      .getAll(this.factoryId)
      .subscribe((res: any) => {
       // this.materialCount = this.materials.Items.length;

        console.log(this.materialCount)
        this.rawMaterials = res.Data;
        this.materials = res.Data;
        console.log(this.rawMaterials)
        console.log(this.materials)
        this.ss = res.Data;

        // console.log(this.rawMaterials)
        this.rawMaterials.forEach((item: any) => {
          this.data.push({
            'Id': 0,
            'CustomItemName': '',
            'Name': '',
            'MaximumMonthlyConsumption': 0,
            'AverageWeightKG': 0,
            'Description': '',
            'FactoryId': this.factoryId,
            'AttachmentId': 0,
            'PaperId': 0,
            'PhotoId': 0,
            'UnitId': 0,
            'FactoryProductId': item.ProductIds,

          })
        })
      })

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

        this.src='data:image/jpeg;base64,'+res.Image;
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

  deleteFile(id: number) {
    // this.fileService
    //   .delete(id)
    //   .subscribe((res: any) => {
    //     this.getFiles();
    //   });
  }


 


  onSelectionChange(item: any, i: number) {
    item.UnitId = this.products.find(item => item.Id == this.products[0].Id)?.UnitId;
    let selectedValue: any = this.units.find(option => option.Id == item.UnitId);
    console.log(selectedValue)
    if (selectedValue?.Name == 'kilograms') {
      item.AverageWeightKG = 1

      this.showKG = true
    }
  }



  savePaper(file: any, i: number) {
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.data[i].PaperId = res.Data.Id
          console.log(this.data)
        });
    }
  }
  savePhoto(file: any, i: number) {
    if (file.target.files.length > 0) {
      console.log(i)
      console.log(file)
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

    console.log(this.data)
    console.log(this.request)
    debugger
    this.data.FactoryId = this.factoryId;
    this.data.forEach((element: RawMaterial) => {
      element.FactoryProductId = this.request.FactoryProductId;
      console.log(element)
      if (element.Id == 0) {
        console.log('new')
        this.rawMaterialService
          .create(element)
          .subscribe((res: any) => {
            this.router.navigate(['/pages/factory-landing', this.factoryId, this.periodId]);


          });


      }
      else {
        console.log('update')
        this.rawMaterialService
          .update(element)
          .subscribe((res: any) => {
            this.router.navigate(['/pages/factory-landing', this.factoryId, this.periodId]);

            //  this.toastr.success("تم الحفظ");
          });
      }

      if (this.saveSuccessful == true) {
        this.data = new RawMaterial();
        this.selectedProducts = []
      }

    });
    this.toastr.success("تم الحفظ");
  }

}
