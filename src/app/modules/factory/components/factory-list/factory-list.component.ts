import { Component, OnInit } from '@angular/core';
import { fade } from 'src/app/shared/animation/app.animation';
import { FactoryService } from '../../factory.service';
import { FactorySearch } from '../../models/factory-search';
import { FactoryModel } from '../../models/factory-model';
import { ResultResponse } from 'src/app/core/models/result-response';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FactoryLandingService } from 'src/app/modules/factory-landing/factory-landing.service';
import { Observable, forkJoin } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit(): void {
    
    this.getFactories();
    this.shared.setUserRole('Investor');
   
   /* setTimeout(() => {
      this.spinner.hide();
    }, 5000); // hides the spinner after 5 seconds*/
  
    
  }
  showSpinner() {
    this.spinner.show("list");
  }

  hideSpinner() {
    this.spinner.hide("list");
  }
  getFactories() {
    this.showSpinner();
    this.factoryLandingService
    .CheckFactoryUpdateStatus()
    .subscribe((res: any) => {
      this.dataFactory= res.Data;
      this.hideSpinner();
    });

  }
  
  pageChanged(data: any) {
    this.search.PageNumber = data;
    this.getFactories();

  }

}
