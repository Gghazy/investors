import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FactoryLocationModel } from '../../models/factory-location.model';
import { FactoryLocationService } from '../../../../factory-location/factory-location.service';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { InspectorFactoryLocationService } from '../../factory-location.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PeriodService } from 'src/app/modules/period/period.service';

@Component({
  selector: 'app-factory-location-form',
  templateUrl: './factory-location-form.component.html',
  styleUrls: ['./factory-location-form.component.scss']
})
export class FactoryLocationFormComponent implements OnInit {
  factoryId: any;
  periodId: any;
  cityCode: any;
  userId: any;
  request = new FactoryLocationModel()
  requestFactory = new FactoryLocationModel()
  cities: LookUpModel[] = [];
  Newcities: LookUpModel[] = [];
  industrialAreas: LookUpModel[] = [];
  NewindustrialAreas: LookUpModel[] = [];
  factoryEntities: LookUpModel[] = [];
  NewfactoryEntities: LookUpModel[] = [];
  cityName:any;
  FactoryEntityName:any;
  IndusterialName:any;
PeriodName!:string
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private shared: SharedService,
    private factoryLocationService: FactoryLocationService,
    private inspectorService: InspectorFactoryLocationService,
    private router: Router,
    private lookUpService: LookUpService,
    private periodService : PeriodService,

  ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit() {
    this.userId = this.shared.getUserId();
    this.getLocation();
    this.getFactoryEntities();
    this.getCities();
    this.getIndustrialAreas();
   this.getperiod()
   

  }
  getLocation() {
    this.inspectorService
      .getAll(this.factoryId, this.periodId, this.userId)
      .subscribe((res: any) => {
        this.requestFactory = res.Data;
        console.log(this.requestFactory)
      });
  }

  getCities() {
    this.lookUpService
      .getAllCities()
      .subscribe((res: any) => {
        this.cities = res.Data;
      //  this.cityName = this.cities.find(x => x.Id == this.requestFactory.CityId)?.NameAr;

      });
  }

  getIndustrialAreas() {
    this.lookUpService
      .getAllIndustrialAreas()
      .subscribe((res: any) => {

        this.industrialAreas = res.Data;
      //  this.IndusterialName = this.industrialAreas.find(x => x.Id == this.requestFactory.IndustrialAreaId)?.NameAr;

      });
  }
  getperiod(){
    this.periodService
    .getOne(this.periodId)
    .subscribe((res: any) => {
      
      this.PeriodName= res.Data.PeriodName;
    });
  }
  onEntitySelect(id: number) {
    this.Newcities=[]
    this.NewindustrialAreas=[]
    this.lookUpService
      .getCityByEntity(id)
      .subscribe((res: any) => {

        this.Newcities = res.Data;
       
      });
  }
  getFactoryEntities() {
    this.lookUpService
      .getAllFactoryEntities()
      .subscribe((res: any) => {
        this.factoryEntities = res.Data;
        this.FactoryEntityName = this.factoryEntities.find(x => x.Id == this.requestFactory.FactoryEntityId)?.NameAr;
     
      });
  }

  onCitySelect(id: number) {
    this.NewindustrialAreas=[]
    this.cityCode = this.cities.find(x => x.Id == id)?.CityCode;

    this.lookUpService
      .getAreaByCity(this.cityCode)
      .subscribe((res: any) => {
        this.NewindustrialAreas = res.Data;
        this.requestFactory.NewIndustrialAreaId =-1
      });
  }
  onInputChange(event: Event): void {

    console.log(this.requestFactory)

    if (this.requestFactory.IsFactoryEntityCorrect == false) {
      this.requestFactory.IsCityCorrect = false
      this.requestFactory.IsIndustrialAreaCorrect = false
    } 
    if (this.requestFactory.IsFactoryEntityCorrect == true) {
      this.requestFactory.NewCityId = -1
      this.requestFactory.NewIndustrialAreaId =-1
      this.requestFactory.NewFactoryEntityId =-1
    } 
    if (this.requestFactory.IsCityCorrect == false) {
      this.onEntitySelect(this.requestFactory.FactoryEntityId)
      this.requestFactory.IsIndustrialAreaCorrect = false
    } 
    if (this.requestFactory.IsCityCorrect == true) {
      this.requestFactory.NewCityId = -1
      this.requestFactory.NewIndustrialAreaId =-1
      this.requestFactory.NewFactoryEntityId =-1
    }
    if (this.requestFactory.IsIndustrialAreaCorrect == false) {
      this.onCitySelect(this.requestFactory.CityId)
      this.requestFactory.IsIndustrialAreaCorrect = false
    } 
    if (this.requestFactory.IsIndustrialAreaCorrect == true) {
      this.requestFactory.NewCityId = -1
      this.requestFactory.NewIndustrialAreaId =-1
      this.requestFactory.NewFactoryEntityId =-1
    } 
  }

  save() {
    this.requestFactory.FactoryId = this.factoryId;
    this.requestFactory.PeriodId = this.periodId;
    this.requestFactory.WebSite = this.requestFactory.WebSite;
    this.requestFactory.FactoryEntityId = this.requestFactory.FactoryEntityId;
    this.requestFactory.CityId = this.requestFactory.CityId;
    this.requestFactory.IndustrialAreaId = this.requestFactory.IndustrialAreaId;
    console.log(this.requestFactory)
    if (this.requestFactory.Id == 0) {
      this.inspectorService
        .create(this.requestFactory)
        .subscribe((res: any) => {

        });
    }
    else {
      this.inspectorService
        .update(this.requestFactory)
        .subscribe((res: any) => {

        });
    }
    this.router.navigate(['/pages/Inspector/visit-landing/' + this.factoryId + '/' + this.periodId]);

    this.toastr.success("تم الحفظ");


  }
}
