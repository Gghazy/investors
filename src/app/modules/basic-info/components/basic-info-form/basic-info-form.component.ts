import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fade } from 'src/app/shared/animation/app.animation';
import { BasicInfoService } from '../../basic-info.service';
import { FactoryModel } from 'src/app/modules/factory/models/factory-model';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/services/shared.service';

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
      .getOne(this.factoryId)
      .subscribe((res: any) => {
        this.request = res.Data;
      });
  }

  save(){
    this.basicInfoService
        .update(this.request)
        .subscribe((res: any) => {
          this.router.navigate(['/pages/factory-landing/'+this.factoryId]);
          this.toastr.success("تم الحفظ");
        });
  }

  changeStatus(){
    this.sharedService.factoryStatus=this.request.Status;
  }
}
