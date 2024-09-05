import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultResponse } from 'src/app/core/models/result-response';
import { ProductModel } from 'src/app/modules/customs-items-update/models/product-model';
import { ProductSearch } from 'src/app/modules/customs-items-update/models/product-search';
import { FactoryProductService } from '../../factory-product.service';
import { FileService } from 'src/app/core/service/file.service';
import { ToastrService } from 'ngx-toastr';
import { PeriodService } from 'src/app/modules/period/period.service';
import {ParamService}from 'src/app/core/service/paramService'
import { ProductDeletesIds } from '../../models/productDeletesIds';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  factoryId: any;
  periodId: any;
  productsAdded:  ProductModel[]=[];
  search = new ProductSearch();
  products = new ResultResponse<ProductModel>();
  productId!: number | undefined;
  pId!: number | undefined;

  PeriodName!: string;
  year!:number;
  modalLable!: string;
  approveStatus:boolean;
  approveStatusText:any;
  productlDeletedList:any[]=[]
  @ViewChild('closeModal') Modal!: ElementRef;
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private factoryProductService: FactoryProductService,
    private fileService: FileService,
    private spinner: NgxSpinnerService,

    private toastr: ToastrService,
    private periodService: PeriodService,
    private paramService: ParamService,

  ) {
    this.factoryId = paramService.getfactoryId();
    this.periodId = paramService.getperiodId();
    this.approveStatus=paramService.getstatus()
  }
  ngOnInit(): void {
   // this.getProducts();
   
   if( this.factoryId==null||this.periodId==null)
    {
      this.router.navigate(['error']);
      return
    }
    
    this.getAddedProducts();
    this.getperiod()
  }

  showInput = false;

  handleSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.showInput = selectedValue === 'yes';
  }
  getperiod() {
    this.periodService
      .getOne(this.periodId)
      .subscribe((res: any) => {
        this.year = res.Data.Year -1;
        this.PeriodName = res.Data.PeriodName;
      });
  }
  getProducts() {

    this.search.FactoryId = this.factoryId;
    this.search.PeriodId = this.periodId;
    this.search.IsActive = true;
    this.factoryProductService
      .GetFactoryProduct(this.search)
      .subscribe((res: any) => {
        this.products = res.Data;
        console.log(this.products)
      });
  }
  delete(id: number) {

    this.productlDeletedList.push(id);
    let index= this.productsAdded.findIndex(x=>x.Id== id)
    if (index !== -1) {
      this.productsAdded.splice(index, 1);
    }
  }
  getAddedProducts() {

    
    this.search.FactoryId = this.factoryId;
    this.search.PeriodId = this.periodId;
    this.search.IsActive = true;
    this.factoryProductService
      .getAddedProducts(this.search)
      .subscribe((res: any) => {
      
        this.productsAdded = res.Data;
        this.DeleteAll();
        console.log(this.productsAdded)
      });
  }
  pageChanged(data: any) {
    this.search.PageNumber = data;
    this.getProducts();

  }
  edit(id: number,pid:number|undefined) {

    
    this.pId = pid;
    if (id == 0) {
      this.modalLable = 'إضافة منتج'
    }
    else {
      this.modalLable = 'تعديل منتج'
    }
    this.productId = id;
   

  }
  closePopUp() {
    this.productId = undefined
    this.pId = undefined;
    this.Modal.nativeElement.click()
    this.getAddedProducts();
   
    
  }
  DeleteAll()
  {
    this.productlDeletedList.forEach((element:any) => {
    let index= this.productsAdded.findIndex(x=>x.Id== element)
    if (index !== -1) {
    
      this.productsAdded.splice(index, 1);
    }
  });
  }
  

  getFile(attachmentId: number) {
    if (attachmentId == null || attachmentId == 0) {
      this.toastr.error("لا يوجد ملف مرفق");
    }
    else {
      this.fileService.downloadTempelete(attachmentId).subscribe((res: any) => {
        this.downloadattachment(res)
      });
    }

  }
  downloadattachment(data: any) {
    const blob = new Blob([data], { type: data.type });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  showSpinner() {
    this.spinner.show("productsDelete");
  }

  hideSpinner() {
    this.spinner.hide("productsDelete");
  }
  save() {
    let length=this.productlDeletedList.length;
    let count=0;

    if(length>0)
    {
        let IdsList=new ProductDeletesIds();
        IdsList.ids=this.productlDeletedList
        this.showSpinner()
        this.factoryProductService
        .delete(IdsList)
        .subscribe((res: any) => {
          this.hideSpinner()  
          if(res.IsSuccess==false)
            {
                this.toastr.error("خطأ في عملية حذف بيانات المنتجات ")
            }
            else
            {
            this.toastr.success("تم حفظ المنتجات بنجاح");
            this.router.navigate(['/pages/factory-landing']);
            }
        
                   
        });
  
     
    }
    else
    {
    this.toastr.success("تم حفظ المنتجات بنجاح");
    this.router.navigate(['/pages/factory-landing']);
    }

  }
}
