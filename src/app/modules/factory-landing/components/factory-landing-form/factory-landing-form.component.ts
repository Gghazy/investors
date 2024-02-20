import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasicInfoService } from 'src/app/modules/basic-info/basic-info.service';
import { FactoryService } from 'src/app/modules/factory/factory.service';
import { fade } from 'src/app/shared/animation/app.animation';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-factory-landing-form',
  templateUrl: './factory-landing-form.component.html',
  styleUrls: ['./factory-landing-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryLandingFormComponent implements OnInit {

  factoryId:any;

  constructor(
    private route: ActivatedRoute,
    private basicInfoService: BasicInfoService,
    public sharedService: SharedService){
    this.factoryId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getBasicInfo()
  }


  getBasicInfo() {
    this.basicInfoService
      .getOne(this.factoryId)
      .subscribe((res: any) => {
        debugger
        this.sharedService.factoryStatus = res.Data.Status;
      });
  }
}
