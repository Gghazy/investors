import { Component, EventEmitter,ElementRef,ViewChild, Input, OnInit, Output } from '@angular/core';
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
  products  !: ProductModel[];
  dropdownSettings!: IDropdownSettings;
  search = new ProductsNotInFactorySearch();
  isLoading = false;
  selectProductId!: any;
  fileError: string | null = null;
  fileErrorPhoto: string | null = null;
  @ViewChild('fileInputPaper') fileInputPaper!: ElementRef;
  @ViewChild('fileInputPhoto') fileInputPhoto!: ElementRef;
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
      this.getAllProducts();
      this.getUnits()
      this.selectProductId=[]
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
    this.fileErrorPhoto=''
    this.fileError=''
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
  getAllProducts() {
    this.isLoading = true;
    this.search.FactoryId = this.factoryId;
    this.factoryProductService
      .getAllProducts()
      .subscribe((res: any) => {
         this.products = res.Data
        // console.log(this.products)
        // this.products.PageCount = res.Data.PageCount;
        // this.products.TotalCount = res.Data.TotalCount;
        // this.products.PageNumber = res.Data.PageNumber;
        // this.products.PageSize = res.Data.PageSize;
        // this.products.Items = [...this.products.Items, ...res.Data.Items];
        // console.log(this.products)
        // this.isLoading = false;
      });
  }
  savePaper(file: any) {
    const input = file.target as HTMLInputElement;
   
    if (!input.files || input.files.length === 0) {
      this.fileError = 'لم تقم بإختيار ملف';
      console.error('لم تقم بإختيار ملف');
      return;
    }
    const fileImage = input.files[0];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
    if (fileImage.size > maxFileSize) {
      // If the file is larger than 5 MB
      this.fileError = ' 5MB حجم الملف أكبر من';
            console.error(' 5MB حجم الملف أكبر من');
    }
    else {
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

      }
    }



  }
  savePhoto(file: any) {
    const input = file.target as HTMLInputElement;
   
    if (!input.files || input.files.length === 0) {
      this.fileErrorPhoto = 'لم تقم بإختيار ملف';
      console.error('لم تقم بإختيار ملف');
      return;
    }
    const fileImage = input.files[0];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
    if (fileImage.size > maxFileSize) {
      // If the file is larger than 5 MB
      this.fileErrorPhoto = ' 5MB حجم الملف أكبر من';
            console.error(' 5MB حجم الملف أكبر من');
    }
    else {
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
  productChanage(item:any) {
    this.selectProductId.Id=item.Id; 
    this.request.ProductId= this.products.find(x => x.Id == item.Id)?.ProductId;
    
    this.productId=0
    
    this.request.UnitId = this.products.find(x => x.Id == item.Id)?.UnitId;
    this.request.Level12ItemName = this.products.find(x => x.Id == item.Id)?.ProductName;
    this.unitChange();

  }
  save() {
    if(!(this.fileError==null || this.fileError==''))
      {
        return
      }
      if(!(this.fileErrorPhoto==null || this.fileErrorPhoto==''))
        {
          return
        }

    this.request.FactoryId = this.factoryId;
    this.request.PeriodId = this.periodId;
    if (this.fileErrorPhoto || this.fileError) {
      this.toastr.error("الرجاء التحقق من البيانات المدخلة")
      return
    }
    else {
     
      if (this.productId == 0) {
        this.factoryProductService
          .create(this.request)
          .subscribe((res: any) => {
            this.close.emit(true);
            this.toastr.success("تم الحفظ");
            this.request = new ProductModel();
            this.fileErrorPhoto = null
            this.fileError = null
            this.fileInputPaper.nativeElement.value = '';
            this.fileInputPhoto.nativeElement.value = '';
          });
      }
      else {
        this.factoryProductService
          .update(this.request)
          .subscribe((res: any) => {
            this.close.emit(true);
            this.toastr.success("تم الحفظ");
              this.request = new ProductModel();
            this.fileErrorPhoto = null
            this.fileError = null
            this.fileInputPaper.nativeElement.value = '';
            this.fileInputPhoto.nativeElement.value = '';
          });
      }
    }
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
        this.getAllProducts();
      }
    }

  }
}
