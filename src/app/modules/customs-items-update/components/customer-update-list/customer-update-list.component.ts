import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { ResultResponse } from 'src/app/core/models/result-response';
import { ProductSearch } from '../../models/product-search';
import { CustomsItemsUpdateService } from '../../customs-items-update.service';
import { ActivatedRoute } from '@angular/router';
import { FactoryProductService } from 'src/app/modules/factory-products/factory-product.service';

@Component({
  selector: 'app-customer-update-list',
  templateUrl: './customer-update-list.component.html',
  styleUrls: ['./customer-update-list.component.scss']
})
export class CustomerUpdateListComponent implements OnInit {

  factoryId: any;
  periodId: any;
  search = new ProductSearch();
  products = new ResultResponse<ProductModel>();
  productName!: string;
  productId!: number;
  constructor(private route: ActivatedRoute, private factoryProductService: FactoryProductService,
  ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit() {
    this.getProducts()
  }

  handleCheckboxChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const closestTr = (event.target as HTMLInputElement).closest('tr');

    if (closestTr) {
      const showInputTd = closestTr.querySelector('.show-input');

      if (showInputTd) {
        showInputTd.classList.toggle('d-none', !isChecked);

        if (!isChecked) {
          closestTr.querySelector('.checked-item')?.classList.remove('checked-item');
        }
      }
    }
  }

  getProducts() {

    this.search.FactoryId = this.factoryId;
    this.factoryProductService
      .getAllPagination(this.search)
      .subscribe((res: any) => {
        this.products = res.Data;
      });
  }
  pageChanged(data: any) {
    this.search.PageNumber = data;
    this.getProducts();

  }
 
}
