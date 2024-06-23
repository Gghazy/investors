import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicInfoService } from 'src/app/modules/basic-info/basic-info.service';
import { PeriodService } from 'src/app/modules/period/period.service';
import { fade } from 'src/app/shared/animation/app.animation';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FactoryLandingService } from '../../factory-landing.service';
import { ScreenStatusModel } from '../../models/screen-status-model';
import { FactoryStatus } from '../../models/factory-status.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-factory-landing-form',
  templateUrl: './factory-landing-form.component.html',
  styleUrls: ['./factory-landing-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryLandingFormComponent implements OnInit {
  @ViewChild('closeModal') Modal!: ElementRef;
  @Output() close = new EventEmitter<boolean>();
  isChecked: boolean = false;
  factoryId: any;
  periodId: any;
  factoryName!: string;
  periodStartDate!: string;
  periodMonth!: number;
  periodEndDate!: string;
  screenStatuse = new ScreenStatusModel();
  allScreenStatus: Boolean = false;
  FactoryStatus: string = 'Default Label';
  FactoryStatusId!: number
  request = new FactoryStatus();
  Year!: number
  periodName!: string
  DataStatus!: number
  constructor(
    private route: ActivatedRoute,
    private basicInfoService: BasicInfoService,
    private periodService: PeriodService,
    public sharedService: SharedService,
    public factoryLandingService: FactoryLandingService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');

  }

  ngOnInit(): void {
    this.getBasicInfo()
    this.getPeriod()
    this.getScreenStatus()
    this.getFactUpdateStatus()
    this.checkStatus()
  }

  getScreenStatus() {
    
    this.factoryLandingService
      .getScreenStatus(this.factoryId, this.periodId)
      .subscribe((res: any) => {

        this.screenStatuse = res.Data
      
        this.checkAllScreenStatus();
      });
  }


  checkStatus() {
    let userId=  this.sharedService.getUserId()
    this.factoryLandingService
      .checkSataus(this.factoryId, this.periodId,userId)
      .subscribe((res: any) => {

        this.FactoryStatus=res.Data.StatusButton
        this.DataStatus=res.Data.DataStatus
      });
  }


  getBasicInfo() {
    debugger

  let userId=  this.sharedService.getUserId()
  console.log(userId)
    this.basicInfoService
      .getOne(this.factoryId, this.periodId)
      .subscribe((res: any) => {
        this.sharedService.factoryStatus = res.Data.Status;
        console.log(this.sharedService.factoryStatus)
        this.factoryName = res.Data.NameAr

        
      });
  }
  getPeriod() {
    this.periodService
      .getOne(this.periodId)
      .subscribe((res: any) => {
        this.periodStartDate = res.Data.PeriodStartDate
        this.periodEndDate = res.Data.PeriodEndDate
        this.Year = res.Data.Year - 1
        this.periodMonth = res.Data.Month
        this.periodName = res.Data.PeriodName
      });
  }

  getFactUpdateStatus() {
   
    this.factoryLandingService
      .getOne(this.factoryId, this.periodId)
      .subscribe((res: any) => {
        this.request = res.Data;
        this.sharedService.CurrentfactoryStatus=res.Data.DataStatus
        console.log(this.request)
        this.isChecked = res.Data.UpdateStatus;
   

      });
  }
  closePopUp() {
    this.Modal.nativeElement.click()
    this.close.emit(true);
  }
  save() {
    console.log(this.DataStatus)
    this.request.DataStatus=this.DataStatus
    this.request.FactoryId = this.factoryId
    this.request.PeriodId = this.periodId
    this.request.UpdateStatus = true

    if (this.request.Id == 0) {
      this.factoryLandingService
        .create(this.request)
        .subscribe((res: any) => {
          console.log(this.request)
          this.close.emit(true);
          this.Modal.nativeElement.click()
          this.router.navigate(['/pages/period/' + this.factoryId + '/Investor']);
        });
    }
    else {
      this.factoryLandingService
        .update(this.request)
        .subscribe((res: any) => {
          console.log(this.request)
          this.close.emit(true);
          this.Modal.nativeElement.click()
          this.router.navigate(['/pages/period/' + this.factoryId + '/Investor']);
        });
    }
  }


  checkAllScreenStatus() {
    debugger
    if (this.periodName == 'يناير') {
      if (this.sharedService.factoryStatus == 1) {
        this.allScreenStatus =
          this.screenStatuse.BasicFactoryInfo &&
          this.screenStatuse.FinancialData &&
          this.screenStatuse.FactoryLocation &&
          this.screenStatuse.FactoryContact
      }
      if (this.sharedService.factoryStatus == 0 || this.sharedService.factoryStatus == 2) {
        this.allScreenStatus =
          this.screenStatuse.ProductData &&
          this.screenStatuse.BasicFactoryInfo &&
          this.screenStatuse.FinancialData &&
          this.screenStatuse.FactoryLocation &&
          this.screenStatuse.FactoryContact &&
          this.screenStatuse.CustomItemsUpdated &&
          //this.screenStatuse.CustomItemValidity&&
          this.screenStatuse.ActualProduction
        this.screenStatuse.RawMaterial &&
          this.screenStatuse.ActualRawMaterila
      }
      if (this.sharedService.factoryStatus == 4) {
        this.allScreenStatus =
          this.screenStatuse.FinancialData
      }

    }
    else {
      if (this.sharedService.factoryStatus == 1) {
        this.allScreenStatus =
          this.screenStatuse.BasicFactoryInfo &&
          this.screenStatuse.MonthlyFinancialData &&
          this.screenStatuse.FactoryLocation &&
          this.screenStatuse.FactoryContact
      }
      if (this.sharedService.factoryStatus == 0 || this.sharedService.factoryStatus == 2) {
        this.allScreenStatus =
          this.screenStatuse.ProductData &&
          this.screenStatuse.BasicFactoryInfo &&
          this.screenStatuse.MonthlyFinancialData &&
          this.screenStatuse.FactoryLocation &&
          this.screenStatuse.FactoryContact &&
          this.screenStatuse.CustomItemsUpdated &&
          //this.screenStatuse.CustomItemValidity&&
          this.screenStatuse.ActualProduction
        this.screenStatuse.RawMaterial &&
          this.screenStatuse.ActualRawMaterila
      }
      if (this.sharedService.factoryStatus == 4) {
        this.allScreenStatus =
          this.screenStatuse.MonthlyFinancialData
      }
    }
    console.log(this.allScreenStatus)
  }



}
