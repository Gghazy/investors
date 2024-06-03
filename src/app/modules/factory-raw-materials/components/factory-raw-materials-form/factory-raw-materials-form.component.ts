import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
import { SearchCriteria } from 'src/app/core/models/search-criteria';

@Component({
  selector: 'app-factory-raw-materials-form',
  templateUrl: './factory-raw-materials-form.component.html',
  styleUrls: ['./factory-raw-materials-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryRawMaterialsFormComponent implements OnInit {
  @ViewChild('closeModal') Modal!: ElementRef;
  @Input() factoryId!: number;
  @Input() Id!: number;
  @Output() close = new EventEmitter<boolean>();
  searchproduct = new ProductSearch();
  searchValue: boolean = false;
  searchTerm: string = '';
  filteredData: any[] = [];
  products  !: ProductModel[];
  products12  !: ProductModel[];
  showInput: boolean = false
  units!: LookUpModel[];
  request = new RawMaterial();
  search = new SearchCriteria();
  selectedProducts: any[] = [];
  items: any = [];
  periodId: any;
  saveSuccessful: boolean = false;
  productx: any;
  fileError: string | null = null;
  fileErrorPhoto: string | null = null;
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

  selectedItems1: any[] = [];
  selectedItems2 = [];

  dropdownSettings!: IDropdownSettings;

  ngOnChanges(changes: SimpleChanges) {

    this.request = new RawMaterial();
    if (changes['Id']) {
      this.selectedProducts = []
      this.selectedItems1 = []
      if (this.Id != 0) {
        this.getOneRawMaterial(this.Id)

      }
      else {

      }
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

  }
  ngOnInit() {

    this.request = new RawMaterial();
    this.selectedProducts = []
    this.fileErrorPhoto = null
    this.fileError = null
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

  getOneRawMaterial(id: number) {
    this.searchValue = true
    this.rawMaterialService
      .getOne(id)
      .subscribe((res: any) => {
        this.request = res.Data;
        console.log(this.request)
        this.productService
          .getAllProducts()
          .subscribe((res: any) => {
            this.products12 = res.Data;

            this.request.FactoryProductId.forEach(element => {
              debugger
              let ProductNamex = this.products12.find(x => x.ProductId == element)?.ProductName;

              this.selectedItems1.push({ 'ProductId': element, 'ProductName': ProductNamex })
              this.selectedProducts = this.selectedItems1
            });
            this.getProducts();

          })


      });
  }

  applyFilters() {
    //  this.getProducts();
  }
  onItemChange(value: any) {
  }


  onSelectionChange() {


    this.request.UnitId = this.products12.find(item => item.Id == this.products12[0].Id)?.UnitId;
    let selectedValue: any = this.units.find(option => option.Id == this.request.UnitId);
    if (selectedValue?.Name == 'kilograms') {
      this.request.AverageWeightKG = 1

      this.showInput = true
    }

  }
  closePopUp() {
    this.Modal.nativeElement.click()
    this.close.emit(true);
  }
  getProducts() {
    this.searchproduct.FactoryId = this.factoryId;
    this.searchproduct.PeriodId = parseInt(this.periodId);
    this.productService
      .getAllProducts()
      .subscribe((res: any) => {
        this.products12 = res.Data;
        // this.filteredData =res.Data;
      });

  }

  filterData(searchTerm: string): void {
    // this.searchValue=true
    // if (!searchTerm) {
    //   this.filteredData = this.products; 
    //   return;
    // }
    // this.filteredData = this.products.filter(item => {
    //   return item.Hs12NameAr.includes(searchTerm);
    // });
  }
  onItemSelect(item: any) {
    this.request.FactoryProductId.push(item.ProductId)
  }


  onItemDeSelect(item: any) {
    this.request.FactoryProductId.splice(item, 1)

    this.selectedItems1.splice(item, 1)
  }

  onSelectAll(items: any) {
  }

  onUnitSelect(event: Event) {

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
      const file1 = file.target.files[0];
      const fileType = file1.type;
      const validFileTypes = ['application/pdf'];
      if (validFileTypes.includes(fileType)) {
        this.fileError = null;

        this.fileService
          .addFile(file.target.files[0])
          .subscribe((res: any) => {
            this.request.PaperId = res.Data.Id
          });
      } else {
        this.fileError = 'الرجاء رفع المستند بالصيغة الموضحة';

      }
    }
  }
  savePhoto(file: any) {
    if (file.target.files.length > 0) {
      const file1 = file.target.files[0];
      const fileType = file1.type;

      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        this.fileErrorPhoto = null;

        this.fileService
          .addFile(file.target.files[0])
          .subscribe((res: any) => {
            this.request.PhotoId = res.Data.Id

          });
      } else {
        this.fileErrorPhoto = 'الرجاء رفع المستند بالصيغة الموضحة';

      }

    }
  }





  save() {

    this.request.FactoryId = this.factoryId;
    this.request.PeriodId = this.periodId;
    if (this.fileErrorPhoto || this.fileError) {
      this.toastr.error("الرجاء التحقق من البيانات المدخلة")
      return
    }
    else {


      if (this.request.Id == undefined) {
        this.rawMaterialService
          .create(this.request)
          .subscribe((res: any) => {
            // this.router.navigate(['/pages/factory-landing', this.factoryId, this.periodId]);
            this.saveSuccessful = true;
            this.close.emit(true);
            this.toastr.success("تم الحفظ");

          });


      }
      else {
        console.log(this.request)
        this.rawMaterialService
          .update(this.request)
          .subscribe((res: any) => {
            // this.router.navigate(['/pages/factory-landing', this.factoryId, this.periodId]);
            this.saveSuccessful = true;
            this.close.emit(true);
            this.toastr.success("تم الحفظ");
          });
      }

    }


    // this.toastr.success("تم الحفظ");
    if (this.saveSuccessful == true) {
      this.request = new RawMaterial();
      this.selectedProducts = []
      this.fileErrorPhoto = null
      this.fileError = null
    }
  }




}
