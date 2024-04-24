import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FactoryLocationModel } from '../../models/factory-location.model';
import { FactoryLocationService } from '../../../../factory-location/factory-location.service';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { InspectorFactoryLocationService } from '../../factory-location.service';

@Component({
  selector: 'app-factory-location-form',
  templateUrl: './factory-location-form.component.html',
  styleUrls: ['./factory-location-form.component.scss']
})
export class FactoryLocationFormComponent implements OnInit {
  factoryId: any;
  periodId: any;
  cityCode: any;
  request=new FactoryLocationModel()
  requestFactory=new FactoryLocationModel()
  cities:LookUpModel[]=[];
  industrialAreas:LookUpModel[]=[];
  factoryEntities:LookUpModel[]=[];

  constructor(
    private route: ActivatedRoute,
     private toastr: ToastrService,
     private factoryLocationService: FactoryLocationService,
     private inspectorService: InspectorFactoryLocationService,
     private router: Router,
     private lookUpService: LookUpService,
     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit() {
    this.getLocation();
    this.getCities();
    this.getIndustrialAreas();
    this.getFactoryEntities();
  }
  getLocation() {
    this.factoryLocationService
      .getOne(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.requestFactory = res.Data;
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

  onEntitySelect(id:number){
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

  onCitySelect(id:number){
    this.cityCode= this.cities.find(x=>x.Id==id)?.CityCode;
    
    this.lookUpService
    .getAreaByCity(this.cityCode)
    .subscribe((res: any) => {
      this.industrialAreas = res.Data;
      console.log(this.industrialAreas)
    });
  }
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const closestRow = target.closest('.row');

    const showInputElement = closestRow?.querySelector('.show-input');

    if (showInputElement) {
      if (target.value =='0') {
        showInputElement.classList.remove('d-none');
      } else {
        showInputElement.classList.add('d-none');
      }
    }
  }

  save(){
    this.request.FactoryId=this.factoryId;
    this.request.PeriodId=this.periodId;
    this.request.WebSite=this.requestFactory.WebSite;
    this.request.FactoryEntityId=this.requestFactory.FactoryEntityId;
    this.request.CityId=this.requestFactory.CityId;
    this.request.IndustrialAreaId=this.requestFactory.IndustrialAreaId;
    console.log(this.request)
     this.inspectorService
    .create(this.request)
    .subscribe((res: any) => {
      this.router.navigate(['/pages/Inspector/visit-landing/'+this.factoryId+'/'+this.periodId]);
      
      this.toastr.success("تم الحفظ");
    });

  }
}
