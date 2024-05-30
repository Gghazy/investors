import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { ProductModel } from 'src/app/modules/customs-items-update/models/product-model';
import { FactoryProductService } from '../../factory-product.service';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { FileService } from 'src/app/core/service/file.service';
import { ToastrService } from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ProductsNotInFactorySearch } from '../../models/products-not-in-factory-search';
import { ResultResponse } from 'src/app/core/models/result-response';
import { PeriodService } from 'src/app/modules/period/period.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() productId!: number;
  @Input() factoryId!: number;
  @Input() periodId!: number;
  @Output() close = new EventEmitter<boolean>();
  request = new ProductModel();
  units!: LookUpModel[];
  isDisabled!: boolean;
  products= new ResultResponse< ProductModel>;
  dropdownSettings!: IDropdownSettings;
  search = new ProductsNotInFactorySearch();
  isLoading = false;
  selectProductId!: any;
  fileError: string | null = null;
  fileErrorPhoto: string | null = null;
  constructor(
    private factoryProductService: FactoryProductService,
    private lookUpService: LookUpService,
    private fileService: FileService,
    private toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    if (this.productId != 0) {
      this.getOne()

    }
    else {
      this.getAllProductsNotInFactory();
      this.getUnits()
    }

    this.dropdownSettings = {
      singleSelection: true,
      enableCheckAll: false,
      idField: 'Id',
      textField: 'ProductName',
      unSelectAllText: 'ازالة التحديد',
      searchPlaceholderText: 'بحث',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };

  }


  getOne() {

    this.factoryProductService
      .getOne(this.productId)
      .subscribe((res: any) => {
        this.request = res.Data;
        this.request.ProductName = this.request.Hs12NameAr + (this.request.Hs12Code)
        this.getUnits()
        console.log(this.request)
      });
  }

  getUnits() {
    this.lookUpService
      .getAllUnits()
      .subscribe((res: any) => {
        this.units = res.Data;
        this.unitChange();

      });
  }
  getAllProductsNotInFactory() {
    this.isLoading = true;
    this.search.FactoryId = this.factoryId;
    this.factoryProductService
      .getAllProductsNotInFactory(this.search)
      .subscribe((res: any) => {
        // this.products = res.Data
        // console.log(this.products)
        this.products.PageCount=res.Data.PageCount;
        this.products.TotalCount=res.Data.TotalCount;
        this.products.PageNumber=res.Data.PageNumber;
        this.products.PageSize=res.Data.PageSize;
        this.products.Items = [...this.products.Items, ...res.Data.Items];
        console.log(this.products)
         this.isLoading = false;
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
                this.request.PeperId = res.Data.Id
              });
        

      } else {
        this.fileError = 'الرجاء رفع المستند بالصيغة الموضحة';

      }}


   
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
          this.request.PhototId = res.Data.Id
        });
      } else {
        this.fileErrorPhoto = 'الرجاء رفع المستند بالصيغة الموضحة';
        
      }
    
    }
  }
  unitChange() {
    const selectedOption = this.units.find(option => option.Id === this.request.UnitId);
    if (selectedOption?.Name == 'kilograms') {
      this.request.Kilograms_Per_Unit = 1;
      this.isDisabled = true;
    }
    else if (selectedOption?.Name == 'طن بريطاني') {
      this.request.Kilograms_Per_Unit = 1000;
      this.isDisabled = true;
    }
    else {
      this.isDisabled = false;

    }
  }
  productChanage() {
    this.request.UnitId = this.products.Items.find(x => x.Id == this.selectProductId[0].Id)?.UnitId;
    this.unitChange();

  }
  save() {
    this.request.FactoryId = this.factoryId;
    this.request.PeriodId = this.periodId;
    if( this.fileErrorPhoto|| this.fileError){
      this.toastr.error("الرجاء التحقق من البيانات المدخلة")
      return
          }
          else{
    if (this.productId == 0) {

      this.request.ProductId = this.products.Items.find(x => x.Id == this.selectProductId[0].Id)?.ProductId;

    }
    if (this.productId == 0) {
      this.factoryProductService
        .create(this.request)
        .subscribe((res: any) => {
          this.close.emit(true);
          this.toastr.success("تم الحفظ");
        });
    }
    else {
      this.factoryProductService
        .update(this.request)
        .subscribe((res: any) => {
          this.close.emit(true);
          this.toastr.success("تم الحفظ");
        });
    }}
  }
  onSearch(event: Event) {
    //   this.search.TxtSearch= (event.target as HTMLInputElement).value;
    // //  this.search.PageNumber=1;
    //   this.products=[];
    //   this.isLoading = true;
    //   this.factoryProductService
    //     .getAllProductsNotInFactory(this.search)
    //     .subscribe((res: any) => {
    //      this.products=res.Data; 
    //       this.isLoading = false;
    //     });

  }
  onDropdownScroll(event: Event) {
    const target = event.target as HTMLElement;

    // Check if the user is near the bottom of the dropdown
    const isAtBottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    if (isAtBottom) {

      if (!this.isLoading) {
        this.search.PageNumber++;
        this.getAllProductsNotInFactory();
      }
    }

  }
}
