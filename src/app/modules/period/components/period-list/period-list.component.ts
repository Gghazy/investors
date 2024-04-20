import { Component, OnInit } from '@angular/core';
import { ResultResponse } from 'src/app/core/models/result-response';
import { PeriodModel } from '../../models/period-model';
import { PeriodService } from '../../period.service';
import { PeriodSearch } from '../../models/period-search';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FactoryLandingService } from 'src/app/modules/factory-landing/factory-landing.service';

@Component({
  selector: 'app-period-list',
  templateUrl: './period-list.component.html',
  styleUrls: ['./period-list.component.scss']
})
export class PeriodListComponent implements OnInit {
  periods = new ResultResponse<PeriodModel>();
  search=new PeriodSearch(); 
  factoryId:any;
  userRole!: string;
  constructor(
    private periodService:PeriodService,
    private router: Router,
    private route: ActivatedRoute,
    private shared: SharedService,
    ){
      this.factoryId = this.route.snapshot.paramMap.get('id');
      this.userRole = this.shared.getUserRole();
    }
  ngOnInit(): void {
    this.getPeriods()
    }

  getPeriods() { 
    
    this.periodService
      .getAll(this.search)
      .subscribe((res: any) => {
        this.periods = res.Data;
      });
  }
  pageChanged(data:any){
    this.search.PageNumber=data;
    this.getPeriods();

  }
  navigateToDetails(periodId: number) {
      this.router.navigate(['/pages/factory-landing', this.factoryId, periodId]);
    
    }


}
