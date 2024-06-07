import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fade } from 'src/app/shared/animation/app.animation';
import { BasicInfoService } from '../../basic-info.service';
import { FactoryModel } from 'src/app/modules/factory/models/factory-model';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FactorySearch } from 'src/app/modules/factory/models/factory-search';
import { PeriodService } from 'src/app/modules/period/period.service';

@Component({
  selector: 'app-basic-info-form',
  templateUrl: './basic-info-form.component.html',
  styleUrls: ['./basic-info-form.component.scss'],
  animations: [
    fade
  ]
})
export class BasicInfoFormComponent implements OnInit {
  factoryId: any;
  periodId: any;
  request = new FactoryModel();
  search = new FactorySearch();
  PeriodName!:string
  isDisabled!:boolean;
  constructor(
    private route: ActivatedRoute,
     private basicInfoService: BasicInfoService,
     private toastr: ToastrService,
     private router: Router,
     private sharedService: SharedService,
     private periodService : PeriodService,
     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit(): void {
    this.ToggleDisable()
    this.getBasicInfo();
    this.getperiod()
  }

  getBasicInfo() {
    this.basicInfoService
      .getOne(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.request = res.Data;
        console.log(this.request)
      });
  }
  ToggleDisable() {
    let userId=  this.sharedService.getUserId()

   this.isDisabled= this.sharedService.toggleDisable(this.factoryId,this.periodId,userId)
  
  }
  getperiod(){
    this.periodService
    .getOne(this.periodId)
    .subscribe((res: any) => {
      
      this.PeriodName= res.Data.PeriodName;
    });
  }

  save() {
   
    this.request.FactoryId = this.factoryId;
    this.request.PeriodId = this.periodId;

      this.basicInfoService
        .update(this.request)
        .subscribe((res: any) => {
          this.toastr.success("تم الحفظ");
        });
  }

  changeStatus(){
    this.sharedService.factoryStatus=this.request.Status;
  }
}
