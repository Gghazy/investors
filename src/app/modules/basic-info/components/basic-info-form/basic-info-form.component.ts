import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fade } from 'src/app/shared/animation/app.animation';
import { BasicInfoService } from '../../basic-info.service';
import { FactoryModel } from 'src/app/modules/factory/models/factory-model';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FactorySearch } from 'src/app/modules/factory/models/factory-search';

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
  constructor(
    private route: ActivatedRoute,
     private basicInfoService: BasicInfoService,
     private toastr: ToastrService,
     private router: Router,
     private sharedService: SharedService,
     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit(): void {
    this.getBasicInfo();
  }

  getBasicInfo() {
    this.basicInfoService
      .getOne(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.request = res.Data;
      });
  }


  save() {
    if(!this.request.DataEntry){
      this.request.DataEntry=this.search.OwnerIdentity
    }
    if(!this.request.DataReviewer){
      this.request.DataReviewer=this.search.OwnerIdentity
    }
    if(!this.request.DataApprover){
      this.request.DataApprover=this.search.OwnerIdentity
    }
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
