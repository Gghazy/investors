import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fade } from 'src/app/shared/animation/app.animation';
import { LocationModel } from '../../models/location-model';
import { FactoryLocationService } from '../../factory-location.service';
import { ToastrService } from 'ngx-toastr';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { PeriodService } from 'src/app/modules/period/period.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-factory-location-form',
  templateUrl: './factory-location-form.component.html',
  styleUrls: ['./factory-location-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryLocationFormComponent {
  factoryLocForm!: FormGroup;
  submitted: boolean | undefined;
  isDisabled!:boolean;
  factoryId: any;
  periodId: any;
  cityCode: any;
  statusFileLoc!:number;
  lockSaveItem=false;
  PeriodName!: string
  year!:number;
  approveStatus:boolean;
  approveStatusText:any;
  request = new LocationModel();
  cities: LookUpModel[] = [];
  industrialAreas: LookUpModel[] = [];
  factoryEntities: LookUpModel[] = [];
  requiredRecipients: boolean | undefined;

  constructor(
    private formBuilder: FormBuilder,

    private route: ActivatedRoute,
    private factoryLocationService: FactoryLocationService,
    private lookUpService: LookUpService,
    private toastr: ToastrService,
    private router: Router,
    private periodService: PeriodService,
    private sharedService:SharedService
  ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
    this.approveStatusText = this.route.snapshot.paramMap.get('isApproveStatus');
    if(this.approveStatusText=='3')
      this.approveStatus=true;
    else
    this.approveStatus=false;


  }
  ngOnInit(): void {
    this.ToggleDisable()
    this.getLocation();
    this.getCities();
    this.getIndustrialAreas();
    this.getFactoryEntities();
    this.getperiod()
    this.createfactoryLocationForm();
    

  }
  getperiod() {
    this.periodService
      .getOne(this.periodId)
      .subscribe((res: any) => {
        this.year = res.Data.Year -1;
        this.PeriodName = res.Data.PeriodName;
      });
  }
  ToggleDisable() {
    let userId=  this.sharedService.getUserId()

   //this.isDisabled= this.sharedService.toggleDisable(this.factoryId,this.periodId,userId)
  
  }
  getLocation() {
    this.factoryLocationService
      .getOne(this.factoryId, this.periodId)
      .subscribe((res: any) => {
        this.request = res.Data;
        debugger
        // if (this.request.Id == 0 || this.request.Id == undefined) {
        //   this.save();
        // }
      });
  }

  getCities() {
    this.lookUpService
      .getAllCities()
      .subscribe((res: any) => {
        this.cities = res.Data;
      });
  }

  getIndustrialAreas() {
    this.lookUpService
      .getAllIndustrialAreas()
      .subscribe((res: any) => {

        this.industrialAreas = res.Data;
      });
  }

  onEntitySelect(id: number) {
    this.lookUpService
      .getCityByEntity(id)
      .subscribe((res: any) => {

        this.cities = res.Data;
      });
  }
  getFactoryEntities() {
    this.lookUpService
      .getAllFactoryEntities()
      .subscribe((res: any) => {
        this.factoryEntities = res.Data;
      });
  }

  onCitySelect(id: number) {
    
    this.cityCode = this.cities.find(x => x.Id == id)?.CityCode;

    this.lookUpService
      .getAreaByCity(this.cityCode)
      .subscribe((res: any) => {
        this.industrialAreas = res.Data;
        console.log(this.industrialAreas)
      });
  }
  createfactoryLocationForm(): void {
   
    this.factoryLocForm = this.formBuilder.group({
      factoryEntityId: [{value:'',disabled: this.approveStatus}, [Validators.required]],
      cityId: [{value:'',disabled: this.approveStatus}, [Validators.required]],
      industrialAreaId: [{value:'',disabled: this.approveStatus}, [Validators.required]],
      webSiteUrl:  [{value:'https://www.google.com/maps',disabled: this.approveStatus}, Validators.compose([Validators.required,Validators.pattern("https://www.google.com/maps.+")])],

    });
  }
  /*get cityId() {
		let r= this.BasicInfoForm.get('cityId');
    if(r==null)
    alert(r);
    return r;
	}*/
  public getFilestatus(item: any):void {
    this.statusFileLoc=item;
}
  save() {
   
    this.submitted = true;
    if (this.factoryLocForm.invalid) {
      this.toastr.error( 'رجاءا تاكد من صحة جميع الحقول المرسلة');
      return;
    }
    if(this.statusFileLoc<=0)
      {  this.toastr.error( 'الرجاء إختيار صورة مدخل المصنع');
        return;
      }
      if(this.lockSaveItem)
        {
            this.toastr.error("عملية حفظ/تعديل موقع المصنع قيد التنفيذ")
            return
            
        }
    debugger
    this.request.FactoryId = this.factoryId;
    this.request.PeriodId = this.periodId;
    if (this.request.Id == 0) {
      this.lockSaveItem=true;
      this.factoryLocationService
        .create(this.request)
        .subscribe((res: any) => {
          this.toastr.success("تم حفظ موقع المصنع بنجاح");
          this.lockSaveItem=false;
          this.getLocation();
          this.router.navigate(['/pages/factory-landing/'+this.factoryId+'/'+this.periodId+'/'+this.approveStatusText]);

        
        });
    }
    else {
      this.lockSaveItem=true;
      this.factoryLocationService
        .update(this.request)
        .subscribe((res: any) => {
          this.toastr.success("تم تعديل موقع المصنع بنجاح");
          this.lockSaveItem=false;
          this.router.navigate(['/pages/factory-landing/'+this.factoryId+'/'+this.periodId+'/'+this.approveStatusText]);

        });
    }
   
  }
}
