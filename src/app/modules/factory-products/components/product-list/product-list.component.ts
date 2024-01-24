import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultResponse } from 'src/app/core/models/result-response';
import { ProductModel } from 'src/app/modules/customs-items-update/models/product-model';
import { ProductSearch } from 'src/app/modules/customs-items-update/models/product-search';
import { FactoryProductService } from '../../factory-product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  factoryId:any;
  search=new ProductSearch(); 
  products = new ResultResponse<ProductModel>();

  constructor(private route: ActivatedRoute,private factoryProductService:FactoryProductService){
    this.factoryId = this.route.snapshot.paramMap.get('id');
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
    
    this.search.FactoryId=this.factoryId;
    this.factoryProductService
      .getAllPagination(this.search)
      .subscribe((res: any) => {
        this.products = res.Data;
      });
  }
  pageChanged(data:any){
    this.search.PageNumber=data;
    this.getProducts();

  }

}
