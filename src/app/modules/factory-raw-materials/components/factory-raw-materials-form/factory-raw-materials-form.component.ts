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
import { NgxSpinnerService } from 'ngx-spinner';

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
  products12All  !: ProductModel[];

  
  showInput: boolean = false
  units!: LookUpModel[];
  request = new RawMaterial();
  search = new SearchCriteria();
  selectedProducts: any[] = [];
  items: any = [];
  periodId: any;
  productNameSelected: any;

  test: any;
  lockUploadfile=false;
  lockSaveItem=false;
  saveSuccessful: boolean = false;
  productx: any;
  fileError: string | null = null;
  fileErrorPhoto: string | null = null;
  isLoadingProgress=false;
  isOpen=false
  @ViewChild('fileInputPaper') fileInputPaper!: ElementRef;
  @ViewChild('fileInputPhoto',{static:false}) fileInputPhoto!: ElementRef;

  constructor(private rawMaterialService: FactoryRawMaterialService,
    private fileService: FileService,
    private router: Router,
    private lookUpService: LookUpService,
    private productService: FactoryProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
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
  dropdownSettings2!: IDropdownSettings;
  ngOnChanges(changes: SimpleChanges) {
    this.isOpen=false
    this.request = new RawMaterial();
    if (changes['Id']) {
      this.selectedProducts = []
      this.selectedItems1 = []
     
      if (this.Id != 0) {
        this.request.Name="";
        this.request.MaximumMonthlyConsumption=0;
        this.request.AverageWeightKG=0;
        this.showInput=false;
        this.getOneRawMaterial(this.Id)

      }
      else {
        const inputElement = document.getElementById('productName')  as HTMLInputElement;
       //inputElement.value=""
        this.request.Name="";
    this.request.MaximumMonthlyConsumption=0;
    this.request.AverageWeightKG=0;
    this.showInput = false
    this.selectedProducts = []
this.getProducts();
      }
      


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

      this.dropdownSettings2 = {
        singleSelection: true,
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
  /*
    this.request = new RawMaterial();
    this.request.Name="";
    this.request.MaximumMonthlyConsumption=0;
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
  */
    this.fileErrorPhoto=''
    this.fileError=''
   
    
    //this.fileInputPaper.nativeElement.value = this.request.PhotoId;
    //this.fileInputPhoto.nativeElement.value = this.request.PaperId;
  }
  ngAfterViewInit() {
   
    //   this.fileInputPhoto.nativeElement.innerText  = "a.txt";

  }
  changeName()
  {
    this.isOpen=true;
  }
  getOneRawMaterial(id: number) {
    this.isLoadingProgress=true;
    this.spinner.show("rawMat");
   
    this.searchValue = true
    this.rawMaterialService
      .getOne(id)
      .subscribe((res: any) => {
        this.request = res.Data;
          let CurrentselectedValue: any = this.units.find(option => option.Id == res.Data.UnitId);
          if (CurrentselectedValue?.Name == 'kilograms') {
            this.request.AverageWeightKG = 1
            this.showInput = true
          }
        console.log(this.request)
        this.productService
          .getAllProducts()
          .subscribe((res: any) => {
            this.products12 = res.Data;
            this.products12All = res.Data;
           
            this.request.FactoryProductId.forEach(element => {
              debugger
              let ProductNamex = this.products12All.find(x => x.ProductId == element)?.ProductName;
           

              this.selectedItems1.push({ 'ProductId': element, 'ProductName': ProductNamex })
              this.selectedProducts = this.selectedItems1
            });
            
            this.spinner.hide("rawMat");
            this.isLoadingProgress=false; 

          })


      });
  }

  applyFilters() {
    //  this.getProducts();
  }
  onItemChange(value: any) {
  }


  onSelectionChange() {
 
    let ProductNamex = this.products12.find(x => x.ProductId+"" == this.request.CustomItemName)?.ProductName;
    this.productNameSelected=ProductNamex;
    
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
    this.isLoadingProgress=true;
    this.spinner.show("rawMat");
    this.searchproduct.FactoryId = this.factoryId;
    this.searchproduct.PeriodId = parseInt(this.periodId);
    this.productService
      .AllProductsListToRaw(this.searchproduct)
      .subscribe((res: any) => {
        this.products12 = res.Data;
        // this.filteredData =res.Data;
      });
      this.productService
      .getAllProducts()
      .subscribe((res: any) => {
      
        this.products12All = res.Data;
       
        this.request.FactoryProductId.forEach(element => {
          debugger
          let ProductNamex = this.products12All.find(x => x.ProductId == element)?.ProductName;
          this.selectedItems1.push({ 'ProductId': element, 'ProductName': ProductNamex })
          this.selectedProducts = this.selectedItems1
        });
        this.spinner.hide("rawMat");
        this.isLoadingProgress=false;

      })


 

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

        this.lockUploadfile=true;

        this.fileService
          .addFile(file.target.files[0])
          .subscribe((res: any) => {
            this.request.PaperId = res.Data.Id
            this.toastr.success("تم حفظ ورقة البيانات  ");

            this.lockUploadfile=false;
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
        this.lockUploadfile=true;

        this.fileService
          .addFile(file.target.files[0])
          .subscribe((res: any) => {
            this.request.PhotoId = res.Data.Id
            this.toastr.success("تم حفظ صورة المادة الخام  ");

            this.lockUploadfile=false;
          });
      } else {
        this.fileErrorPhoto = 'الرجاء رفع المستند بالصيغة الموضحة';

      }

    }
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
        if(this.lockUploadfile)
        {
            this.toastr.error("الرجاء الإنتظار قليلا لأكنمال تحميل الملف المرفق")
            return
            
        }
        if(this.lockSaveItem)
          {
              this.toastr.error("عملية حفظ/تعديل المادة الخام قيد التنفيذ")
              return
              
          }
          var nameProdct=this.request.Name;
          nameProdct = nameProdct.trim().replace(/\\s+/g, "\\n");
          if(nameProdct=="")
            {
                this.toastr.error(" الرجاء إدخال إسم المادة الأولية")
                return
                
            }
    this.request.FactoryId = this.factoryId;
    this.request.PeriodId = this.periodId;
    if (this.fileErrorPhoto || this.fileError) {
      this.toastr.error("الرجاء التحقق من البيانات المدخلة")
      return
    }
    else {


      if (this.request.Id == undefined|| this.request.Id==0) {
        console.log(this.request)
        this.lockSaveItem=true;
        this.request.RawMaterialName=this.productNameSelected
        

        this.rawMaterialService
          .create(this.request)
          .subscribe((res: any) => {
            // this.router.navigate(['/pages/factory-landing', this.factoryId, this.periodId]);
            this.saveSuccessful = true;
            this.lockSaveItem=false;

            this.toastr.success("تمت إضافة مادة أولية بنجاح");
           // this.request = new RawMaterial();
          
            this.fileErrorPhoto = null
            this.fileError = null
            this.fileInputPaper.nativeElement.value = '';
            this.fileInputPhoto.nativeElement.value = '';
            this.close.emit(true);


          });


      }
      else {
        console.log(this.request)
        this.lockSaveItem=true;
        this.rawMaterialService
          .update(this.request)
          .subscribe((res: any) => {
            // this.router.navigate(['/pages/factory-landing', this.factoryId, this.periodId]);
            this.saveSuccessful = true;
            this.lockSaveItem=false;
         
            this.toastr.success("تم تعديل مادة الأولية بنجاح");
          
            this.fileErrorPhoto = null
            this.fileError = null
            this.fileInputPaper.nativeElement.value = '';
            this.fileInputPhoto.nativeElement.value = '';
            this.close.emit(true);
          });
      }

    }


    // this.toastr.success("تم الحفظ");
    if (this.saveSuccessful == true) {
     
    }
  }




}
