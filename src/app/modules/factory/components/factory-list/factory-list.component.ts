import { Component, OnInit } from '@angular/core';
import { fade } from 'src/app/shared/animation/app.animation';
import { FactoryService } from '../../factory.service';
import { FactorySearch } from '../../models/factory-search';
import { FactoryModel } from '../../models/factory-model';
import { ResultResponse } from 'src/app/core/models/result-response';

@Component({
  selector: 'app-factory-list',
  templateUrl: './factory-list.component.html',
  styleUrls: ['./factory-list.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryListComponent implements OnInit {

  search=new FactorySearch();

  factories = new ResultResponse<FactoryModel>();

  constructor(private factoryService :FactoryService){

  }

  ngOnInit(): void {
   this.getServiceTypes();
  }

  getServiceTypes() { 
    this.search.PageSize=5
    this.factoryService
      .getAllPagination(this.search)
      .subscribe((res: any) => {
        this.factories = res.Data;
      });
  }

  pageChanged(data:any){
    debugger
    this.search.PageNumber=data;
    this.getServiceTypes();

  }

}
