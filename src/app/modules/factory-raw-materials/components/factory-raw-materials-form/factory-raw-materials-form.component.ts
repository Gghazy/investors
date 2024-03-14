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
import { LookUpService } from 'src/app/core/service/look-up.service';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSearch } from 'src/app/modules/customs-items-update/models/product-search';

@Component({
  selector: 'app-factory-raw-materials-form',
  templateUrl: './factory-raw-materials-form.component.html',
  styleUrls: ['./factory-raw-materials-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryRawMaterialsFormComponent implements OnInit {
  @Input() factoryId!: number;
  @Output() close = new EventEmitter<boolean>();

  products  !: ProductModel[];
  showInput: boolean = false
  units!: LookUpModel[];
  request = new RawMaterial();
  search = new ProductSearch();
  selectedProducts: any = [];
  items: any = [];
  periodId: any;
  saveSuccessful: boolean = false;
  productx: any;

  constructor(private rawMaterialService: FactoryRawMaterialService,
    private fileService: FileService,
    private router: Router,
    private lookUpService: LookUpService,
    private productService: FactoryProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {

    this.periodId = this.route.snapshot.paramMap.get('periodid');
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

    this.getProducts();
    this.getUnits();
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
  }

  onSelectionChange() {


    this.request.UnitId = this.products.find(item => item.Id == this.products[0].Id)?.UnitId;
    let selectedValue: any = this.units.find(option => option.Id == this.request.UnitId);
    console.log(selectedValue)
    if (selectedValue?.Name == 'kilograms') {
      this.request.AverageWeightKG =1
  
      this.showInput = true
    }
    
  }

  getProducts() {

    this.search.FactoryId = this.factoryId;
    this.productService
      .getAllPagination(this.search)
      .subscribe((res: any) => {
        this.products = res.Data.Items;
      });

  }
  onItemSelect(item: any) {
    this.request.ProductIds.push( item.ProductId)
  }
  onSelectAll(items: any) {
    //console.log(items);
  }

  onUnitSelect(event: Event) {


    // let selectedValue: any = (event.target as HTMLSelectElement).value;
    // if (selectedValue != "11" || selectedValue != "15") {
    //   this.showInput = true
    //   console.log(this.showInput)
    // }
    // if (selectedValue == "11") {
    //   this.showInput = false
    //   this.request.AverageWeightKG = this.request.MaximumMonthlyConsumption
    //   console.log(this.showInput)
    // }
    // if (selectedValue == "15") {
    //   this.showInput = true
    //   this.request.AverageWeightKG = 1000
    //   console.log(this.showInput)
    // }
  }
  getUnits() {
    this.lookUpService
      .getAllUnits()
      .subscribe((res: any) => {
        this.units = res.Data;
      });
  }

  savePaper(file: any) {
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.request.PaperId = res.Data.Id
        });
    }
  }
  savePhoto(file: any) {
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.request.PhotoId = res.Data.Id
        });
    }
  }





  save() {
    debugger
   this.request.FactoryId= this.factoryId;
    this.rawMaterialService
      .create(this.request)
      .subscribe((res: any) => {
        this.router.navigate(['/pages/factory-landing', this.factoryId, this.periodId]);
        this.saveSuccessful = true;
        this.close.emit(true);
        this.toastr.success("تم الحفظ");
      });

    if (this.saveSuccessful == true) {
      this.request = new RawMaterial();
      this.selectedProducts = []
    }
  }




}
