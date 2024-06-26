import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultResponse } from 'src/app/core/models/result-response';
import { ProductModel } from 'src/app/modules/customs-items-update/models/product-model';
import { ProductSearch } from 'src/app/modules/customs-items-update/models/product-search';
import { FactoryProductService } from '../../factory-product.service';
import { FileService } from 'src/app/core/service/file.service';
import { ToastrService } from 'ngx-toastr';
import { PeriodService } from 'src/app/modules/period/period.service';

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
  @ViewChild('closeModal') Modal!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private factoryProductService: FactoryProductService,
    private fileService: FileService,
    private toastr: ToastrService,
    private periodService: PeriodService,
  ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit(): void {
   // this.getProducts();

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

  getAddedProducts() {

    
    this.search.FactoryId = this.factoryId;
    this.search.PeriodId = this.periodId;
    this.search.IsActive = true;
    this.factoryProductService
      .getAddedProducts(this.search)
      .subscribe((res: any) => {
      
        this.productsAdded = res.Data;
       // alert(res.Data)
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
  save() {
    this.toastr.success("تم الحفظ");
    this.router.navigate(['/pages/factory-landing/'+this.factoryId+'/'+this.periodId]);

  }
}
