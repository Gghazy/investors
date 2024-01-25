import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActualProductModel } from '../models/actual-product-model';
import { ResultResponse } from 'src/app/core/models/result-response';

@Component({
  selector: 'app-actual-production-list',
  templateUrl: './actual-production-list.component.html',
  styleUrls: ['./actual-production-list.component.scss']
})
export class ActualProductionListComponent {
  factoryId:any;
  products = new ResultResponse<ActualProductModel>();


  constructor(private route: ActivatedRoute){
    this.factoryId = this.route.snapshot.paramMap.get('id');
  }
}
