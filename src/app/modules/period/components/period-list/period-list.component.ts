import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  @ViewChild('closeModal') Modal!: ElementRef;
  @Output()close=new EventEmitter<boolean>();
  @Input() UserType!:string
  periods = new ResultResponse<PeriodModel>();
  search=new PeriodSearch(); 
  factoryId:any;
  userRole!: string;
  currentUrl: string;
  InspectorRole!:boolean;
  constructor(
    private periodService:PeriodService,
    private router: Router,
    private route: ActivatedRoute,
    private shared: SharedService,
    ){
      this.factoryId = this.route.snapshot.paramMap.get('id');
    
      this.currentUrl = this.router.url
    }
  ngOnInit(): void {
    this.userRole = this.shared.getUserRole();
    this.getPeriods()

this.InspectorRole =this.router.url.includes('Inspector')
  }

  closePopUp() {
    this.Modal.nativeElement.click()
    this.close.emit(true);
  }
  getPeriods() { 
    this.search.FactoryId = this.factoryId
    this.periodService
      .getAll(this.search)
      .subscribe((res: any) => {
        this.periods = res.Data;
        console.log(this.periods)
      });
  }
  pageChanged(data:any){
    this.search.PageNumber=data;
    this.getPeriods();

  }
  navigateToDetails(periodId: number,status: string) {
    let completeStatus=false;
    if(status=='3')
       completeStatus=true;

    if(this.router.url.includes('Inspector')){
      this.router.navigate(['/pages/Inspector/visit-landing', this.factoryId, periodId]);
    
    }
    if(this.router.url.includes('Investor')){
    
      this.router.navigate(['/pages/factory-landing', this.factoryId, periodId,completeStatus]);
    
    }
      
    }
  

}
