import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild ,AfterViewInit} from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { fade } from 'src/app/shared/animation/app.animation';
import { FactoryRawMaterialService } from '../../factory-raw-material.service';
import { ToastrService } from 'ngx-toastr';
import { RawMaterial } from '../../models/raw-material.model';
import { ProductSearchModel } from '../../models/raw-material.model';
import { FactoryProductInRaw } from '../../models/raw-material.model';

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
import {ParamService}from 'src/app/core/service/paramService'
import { SelectItem, PrimeNGConfig } from "primeng/api"; 


@Component({
  selector: 'app-factory-raw-materials-form',
  templateUrl: './factory-raw-materials-form.component.html',
  styleUrls: ['./factory-raw-materials-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryRawMaterialsFormComponent implements OnInit ,AfterViewInit{
  @ViewChild('closeModal') Modal!: ElementRef;
  @Input() factoryId!: number;
  @Input() Id!: number;
  @Input() closed!: boolean;
  @Output() close = new EventEmitter<boolean>();
  searchproduct = new ProductSearch();
  searchValue: boolean = false;
  searchTerm: string = '';
  filteredData: any[] = [];
  products  !: ProductModel[];
  products12  !: ProductModel[];
  products12All  !: ProductModel[];
  selectProductId!: any;
  geeks!: SelectItem[]; 
  
  showInput: boolean = false
  units!: LookUpModel[];
  request = new RawMaterial();
  requestToSearch = new ProductSearchModel();
  requestProductToSearch = new ProductSearchModel();
  factoryProductinRaw=new FactoryProductInRaw();
  searchPlaceholderT='أكتب هنا إسم المادة الأولية'
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
  isDisabled!: boolean;
  searchName = '';
  currentPage = 0;
  pageSize = 100;
  currentPageProduct = 0;
  pageSizeProduct = 100;
  @ViewChild('fileInputPaper') fileInputPaper!: ElementRef;
  @ViewChild('fileInputPhoto',{static:false}) fileInputPhoto!: ElementRef;
 // @ViewChild('dropdownListRaw', { static: true }) dropdownScroll!: ElementRef;
  @ViewChild('dropdownListRaw', { read: ElementRef }) dropdownListRaw!: ElementRef;
  @ViewChild('rawNameDropdown', { read: ElementRef,static: false }) dropdown!: ElementRef;
  @ViewChild('productNameDropdown', { read: ElementRef,static: false }) dropdownProduct!: ElementRef;



  constructor(private rawMaterialService: FactoryRawMaterialService,
    private fileService: FileService,
    private router: Router,
    private lookUpService: LookUpService,
    private productService: FactoryProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute,   
     private paramService: ParamService,

    private spinner: NgxSpinnerService
  ) {

    this.factoryId = paramService.getfactoryId();
    this.periodId = paramService.getperiodId();
  //  this.approveStatus=paramService.getstatus()
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



  dropdownSettingsNew = {};
  dropdownList: any[] = [];

  selectedItems1: any[] = [];
  selectedItems2 = [];

  dropdownSettings!: IDropdownSettings;
  dropdownSettings2!: IDropdownSettings;
  dropdownSettingsRaw: IDropdownSettings = {};

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
    this.selectProductId=[]
this.getProducts();
      }
      


      this.getUnits();
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'ProductId',
        textField: 'ProductName',
        selectAllText: 'تحديد الكل',
        unSelectAllText: 'ازالة التحديد',
        searchPlaceholderText: ' أكتب هنا إسم المنتج',
        noDataAvailablePlaceholderText: 'لا يوجد بيانات مطابقة ',
        clearSearchFilter: true,
        noFilteredDataAvailablePlaceholderText:'لا يوجد بيانات مطابقة للبحث',
        itemsShowLimit: 6,
        allowSearchFilter: true,
        
      };

      this.dropdownSettings2 = {
        singleSelection: true,
        idField: 'ProductId',
        textField: 'ProductName',
        selectAllText: 'تحديد الكل',
        unSelectAllText: 'ازالة التحديد',
        searchPlaceholderText: 'بحث',
        itemsShowLimit: 2,
        allowSearchFilter: true,
      };
      this.dropdownSettingsRaw = {
        singleSelection: true,
        enableCheckAll: false,
        idField: 'Id',
        textField: 'ProductName',
        unSelectAllText: 'ازالة التحديد',
        searchPlaceholderText: ' أكتب هنا إسم البند الجمركي',
        noDataAvailablePlaceholderText: 'لا يوجد بيانات مطابقة ',
        clearSearchFilter: true,
        noFilteredDataAvailablePlaceholderText:'لا يوجد بيانات مطابقة للبحث',

      //  enableCheckAll: false,
     // noDataAvailablePlaceholderText: 'No data available',
    //  searchPlaceholderText: 'Search',
    //  scrollToEnd: true // Enable scroll to end
        itemsShowLimit: 6,
        allowSearchFilter: true,
      };
    
    }

  }
  
  productChanage(item:any) {
  
    this.selectProductId.Id=item.Id; 
    this.request.ProductId= this.products12.find(x => x.Id == item.Id)?.ProductId;
    this.request.CustomItemName=item.Id+"";

    this.request.UnitId = this.products12.find(x => x.Id == item.Id)?.UnitId;
    
    let ProductNamex = this.products12.find(x => x.Id == item.Id)?.ProductName;
    this.productNameSelected=ProductNamex;
    this.request.RawMaterialName=this.productNameSelected;

    this.unitChange();

  }
  unitChange() {
    const selectedOption = this.units.find(option => option.Id === this.request.UnitId);
    if (selectedOption?.Name == 'kilograms') {
      this.request.AverageWeightKG = 1;
      this.isDisabled = true;
    }
    else if (selectedOption?.Name == 'طن بريطاني') {
      this.request.AverageWeightKG = 1000;
      this.isDisabled = true;
    }
    else {
      this.isDisabled = false;

    }
  }
  
  loadInitialProduct() {
   
    this.requestProductToSearch.PeriodId=this.periodId;
    this.requestProductToSearch.FactoryId=this.factoryId;
    this.requestProductToSearch.CurrentPage=0;
    this.requestProductToSearch.PageSize=this.pageSizeProduct;
    this.requestProductToSearch.SearchText='';
   
    this.productService
      .getItemsAllProduct(this.requestProductToSearch)
      .subscribe((res: any) => {
        this.products12All = res.Data;
       
       
    });
  
  }
  loadInitialRawMaterial() {
   
    this.requestToSearch.PeriodId=this.periodId;
    this.requestToSearch.FactoryId=this.factoryId;
    this.requestToSearch.CurrentPage=0;
    this.requestToSearch.PageSize=this.pageSize;
    this.requestToSearch.SearchText='';
    this.productService
      .getItemsProduct(this.requestToSearch)
      .subscribe((res: any) => {
        this.products12 = res.Data;
     
       
    });
  
  }
 


  onScroll(event: any) {
   
    const element = event.target;
    if (element.scrollTop === 0) {
    //  this.onScrollTo(true);
     // this.setCursorToStart(element);
    }
    if (element.scrollHeight - element.scrollTop - element.clientHeight <= 30) {
      this.onScrollTo();
    }
  }
  onScrollProduct(event: any) {
  
    const element = event.target;
    if (element.scrollTop === 0) {
    //  this.onScrollTo(true);
     // this.setCursorToStart(element);
    }
    if (element.scrollHeight - element.scrollTop - element.clientHeight <= 30) {
      this.onScrollToProduct();
    }
  }
  setCursorToStart(inputElement: HTMLInputElement) {
    setTimeout(() => {
      inputElement.focus();
      inputElement.setSelectionRange(0, 0); // تعيين المؤشر في بداية النص
    }, 0);
  }
  onScrollToProduct(): void  {
  
    this.requestProductToSearch.PeriodId=this.periodId;
    this.requestProductToSearch.FactoryId=this.factoryId;
    this.currentPageProduct++;
    this.requestProductToSearch.CurrentPage=this.currentPageProduct;
    this.requestProductToSearch.PageSize=this.pageSizeProduct;
  //  this.requestProductToSearch.SearchText='';
   
    this.productService
      .getItemsAllProduct(this.requestProductToSearch)
      .subscribe((res: any) => {
        this.products12All  =[...this.products12All, ...res.Data];
       
       
    });
  
  }
  onScrollTo(): void  {
  
    this.requestToSearch.PeriodId=this.periodId;
    this.requestToSearch.FactoryId=this.factoryId;
    this.requestToSearch.PageSize=this.pageSize;
    this.currentPage++;
    this.requestToSearch.CurrentPage=this.currentPage;

    this.productService
      .getItemsProduct(this.requestToSearch)
      .subscribe((res: any) => {
        this.products12 =[...this.products12, ...res.Data];
    });
  }
  onSearch(event: any) {

    const searchTerm = event.toLowerCase();

    //const searchTerm = event.target.value;
  
    if (searchTerm) 
      {
        this.requestToSearch.PeriodId=this.periodId;
        this.requestToSearch.FactoryId=this.factoryId;
        this.requestToSearch.CurrentPage=this.currentPage;
        this.requestToSearch.PageSize=this.pageSize;
        this.requestToSearch.SearchText=searchTerm;
        this.productService
          .getItemsProduct(this.requestToSearch)
          .subscribe((res: any) => {
          
            if(res.Data!=null && res.Data.length>0)
            {
               this.products12=res.Data;
               this.currentPage=0
            }
            else
            {
        
             // this.toastr.error("الرجاء تعديل نص البحث ، لا يوجد بيانات مطابقة"+searchTerm)
              //const searchInput = event.target as HTMLInputElement;
             // searchInput.value=''
              this.currentPage=0
              //const event2 = new Event('input', { bubbles: true });
              //searchInput.dispatchEvent(event2); 
              this.loadInitialRawMaterial();
             
            }

        });
    } 
    else 
    {
     
      this.loadInitialRawMaterial();
    }
  }
  onSearchProduct(event: any) {
   
   
    const searchTerm = event.toLowerCase();

    if (searchTerm) 
      {
        this.requestProductToSearch.PeriodId=this.periodId;
        this.requestProductToSearch.FactoryId=this.factoryId;
        this.requestProductToSearch.CurrentPage=this.currentPageProduct;
        this.requestProductToSearch.PageSize=this.pageSizeProduct;
        this.requestProductToSearch.SearchText=searchTerm;
        this.productService
          .getItemsAllProduct(this.requestProductToSearch)
          .subscribe((res: any) => {
          
            if(res.Data!=null && res.Data.length>0)
            {
               this.products12All=res.Data;
               this.currentPage=0
            }
            else
            {
             
             // const searchInput = event.target as HTMLInputElement;
             // searchInput.value=''
             this.currentPageProduct=0
             // const event2 = new Event('input', { bubbles: true });
             //  searchInput.dispatchEvent(event2); 
              this.loadInitialProduct();
             
            }

        });
    } 
    else 
    {
     
      this.loadInitialProduct();
    }
  }
  
  ngOnInit() {
   
    if( this.factoryId==null||this.periodId==null)
      {
        return
      }
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
    
    this.currentPage=0
    this.currentPageProduct=0
    this.searchName=''
    this.requestToSearch = new ProductSearchModel();
    this.requestProductToSearch = new ProductSearchModel();
    if(this.dropdown!=null)
    {
       const dropdownRef = this.dropdown.nativeElement;
      const scrollingContainerRef =  dropdownRef.querySelector('.item2') as HTMLElement;
      scrollingContainerRef.addEventListener('scroll', this.onScroll.bind(this));
    }
   
   
    if(this.dropdownProduct!=null)
      {
        const dropdownRef2 = this.dropdownProduct.nativeElement;
  
 
        const scrollingContainerRef2 =  dropdownRef2.querySelector('.item2') as HTMLElement;
        scrollingContainerRef2.addEventListener('scroll', this.onScrollProduct.bind(this));
       

      }
   
    /*const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        const scrollingContainerRef =  dropdownRef.querySelector('.item2') as HTMLElement;
       
        if (scrollingContainerRef) {
          scrollingContainerRef.addEventListener('scroll', this.onScroll.bind(this));
          observer.disconnect(); // Stop observing once the element is found
        }
      });
    });

    observer.observe(dropdownRef, { childList: true, subtree: true });*/
  }
  onScroll2(event: any) {
    const scrollTop = event.target.scrollTop;
    const scrollHeight = event.target.scrollHeight;
    const offsetHeight = event.target.offsetHeight;

    console.log('Scroll Top:', scrollTop);
    console.log('Scroll Height:', scrollHeight);
  

    if (scrollTop + offsetHeight >= scrollHeight) {
      console.log('Reached the end of the dropdown');
      this.loadMoreItems();
    }
  }

  loadMoreItems() {
    // Logic to load more items
    console.log('Load more items');
  }
  changeName()
  {
    this.isOpen=true;
  }
  getOneRawMaterial(id: number) {
  
   
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

        this.requestProductToSearch.PeriodId=this.periodId;
        this.requestProductToSearch.FactoryId=this.factoryId;
        this.requestProductToSearch.CurrentPage=0;
        this.requestProductToSearch.PageSize=this.pageSizeProduct;
        this.requestProductToSearch.SearchText='';
        this.isLoadingProgress=true;
        this.spinner.show("rawMat");
        this.productService
        .getItemsAllProduct(this.requestProductToSearch)
        .subscribe((res: any) => {
          
          //  this.products12 = res.Data;
            this.products12All = res.Data;
            
            this.request.FactoryProductId.forEach(element => {
              debugger
            //  let ProductNamex = this.products12All.find(x => x.ProductId == element)?.ProductName;
           

              this.selectedItems1.push({ 'ProductId': element.ProductId, 'ProductName': element.ProductNameInRaw })
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
  clearFilter()
  {
    this.searchName=''
    this.currentPage=0;
    this.loadInitialRawMaterial();
  }
  clearProductFilter()
  {
    this.searchName=''
    this.currentPageProduct=0;
    this.loadInitialProduct();
  }
  closePopUp() {
    this.Modal.nativeElement.click()
    this.close.emit(true);
  }
  getProducts() {
  //  this.isLoadingProgress=true;
  //  this.spinner.show("rawMat");
    this.searchproduct.FactoryId = this.factoryId;
    this.searchproduct.PeriodId = parseInt(this.periodId);
    this.loadInitialRawMaterial();
  /*  this.productService
      .AllProductsListToRaw(this.searchproduct)
      .subscribe((res: any) => {
        this.products12 = res.Data;
        this.spinner.hide("rawMat");
        this.isLoadingProgress=false;
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
       

      })*/
        this.isLoadingProgress=true;
        this.requestProductToSearch.PeriodId=this.periodId;
        this.requestProductToSearch.FactoryId=this.factoryId;
        this.requestProductToSearch.CurrentPage=0;
        this.requestProductToSearch.PageSize=this.pageSizeProduct;
        this.requestProductToSearch.SearchText='';
        this.spinner.show("rawMat");
        this.productService
        .getItemsAllProduct(this.requestProductToSearch)
        .subscribe((res: any) => {
          
          //  this.products12 = res.Data;
            this.products12All = res.Data;
            
            this.request.FactoryProductId.forEach(element => {
              debugger
            //  let ProductNamex = this.products12All.find(x => x.ProductId == element)?.ProductName;
           

              this.selectedItems1.push({ 'ProductId': element.ProductId, 'ProductName': element.ProductNameInRaw })
              this.selectedProducts = this.selectedItems1
            });
            
            this.spinner.hide("rawMat");
            this.isLoadingProgress=false; 



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
    let factoryProinRaw=new FactoryProductInRaw();
    factoryProinRaw.ProductId=item.ProductId,
    factoryProinRaw.ProductNameInRaw=item.ProductName

    this.request.FactoryProductId.push(factoryProinRaw)
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
        this.unitChange();
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
            if(res.IsSuccess==false)
              {
                  this.toastr.error("خطأ في عملية حفظ بيانات المواد الخام الأولية")
              }
              else
              {
                this.toastr.success("تمت إضافة مادة أولية بنجاح");

              }
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
            if(res.IsSuccess==false)
              {
                  this.toastr.error("خطأ في عملية تعديل بيانات المواد الخام الأولية")
              }
              else
              {
                this.toastr.success("تم تعديل مادة الأولية بنجاح");

              }
          
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
