import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultResponse } from 'src/app/core/models/result-response';
import { ProductModel } from 'src/app/modules/customs-items-update/models/product-model';
import { ProductSearch } from 'src/app/modules/customs-items-update/models/product-search';
import { FactoryProductService } from '../../factory-product.service';
import { FileService } from 'src/app/core/service/file.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  factoryId: any;
  periodId: any;
  search = new ProductSearch();
  products = new ResultResponse<ProductModel>();
  productId!: number |undefined;
  @ViewChild('closeModal') Modal!: ElementRef;

  constructor(
    private route: ActivatedRoute,
     private factoryProductService: FactoryProductService,
     private fileService: FileService,
     private toastr: ToastrService
     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit(): void {
    this.getProducts();
  }

  showInput = false;

  handleSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.showInput = selectedValue === 'yes';
  }

  getProducts() {
    
    this.search.FactoryId = this.factoryId;
    this.factoryProductService
      .getAllPagination(this.search)
      .subscribe((res: any) => {
        debugger
        this.products = res.Data;
      });
  }
  pageChanged(data: any) {
    this.search.PageNumber = data;
    this.getProducts();

  }
  edit(id: number) {
    this.productId = id;
  }
  closePopUp(){
    this.productId=undefined
    this.Modal.nativeElement.click()
    this.getProducts();
  }

  getFile(attachmentId:number){
    if(attachmentId==null){
      this.toastr.error("لا يوجد ملف");    }
    else{
      this.fileService.downloadTempelete(attachmentId).subscribe((res: any) => {
        this.downloadattachment(res)    
      });
    }
    
  }
  downloadattachment(data: any) {
    const blob = new Blob([data], { type: data.type });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }

}
