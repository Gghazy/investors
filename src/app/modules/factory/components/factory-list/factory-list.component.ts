import { Component, OnInit } from '@angular/core';
import { fade } from 'src/app/shared/animation/app.animation';
import { FactoryService } from '../../factory.service';
import { FactorySearch } from '../../models/factory-search';
import { FactoryModel } from '../../models/factory-model';
import { ResultResponse } from 'src/app/core/models/result-response';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FactoryLandingService } from 'src/app/modules/factory-landing/factory-landing.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-factory-list',
  templateUrl: './factory-list.component.html',
  styleUrls: ['./factory-list.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryListComponent implements OnInit {

  search = new FactorySearch();
  factoryStatus: boolean = false
  factoryUpdateStatus: any[]=[]
  dataFactory:any[]=[]
  factories = new ResultResponse<FactoryModel>();

  constructor(private factoryService: FactoryService,
    private factoryLandingService: FactoryLandingService,
    private shared: SharedService,
  ) {

  }

  ngOnInit(): void {
    this.getFactories();
    this.shared.setUserRole('Investor');
  }

  getFactories() {
    this.factoryLandingService
    .CheckFactoryUpdateStatus()
    .subscribe((res: any) => {
      this.dataFactory= res.Data;
    });

  }
  
  pageChanged(data: any) {
    this.search.PageNumber = data;
    this.getFactories();

  }

}
