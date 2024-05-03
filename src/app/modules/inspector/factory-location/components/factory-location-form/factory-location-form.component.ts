import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FactoryLocationModel } from '../../models/factory-location.model';
import { FactoryLocationService } from '../../../../factory-location/factory-location.service';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { InspectorFactoryLocationService } from '../../factory-location.service';
import { SharedService } from 'src/app/shared/services/shared.service';

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
  request=new FactoryLocationModel()
  requestFactory=new FactoryLocationModel()
  cities:LookUpModel[]=[];
  industrialAreas:LookUpModel[]=[];
  factoryEntities:LookUpModel[]=[];

  constructor(
    private route: ActivatedRoute,
     private toastr: ToastrService,
     private shared: SharedService,
     private factoryLocationService: FactoryLocationService,
     private inspectorService: InspectorFactoryLocationService,
     private router: Router,
     private lookUpService: LookUpService,
     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit() {
    this.userId = this.shared.getUserRole();
    this.getLocation();
    this.getCities();
    this.getIndustrialAreas();
    this.getFactoryEntities();
  }
  getLocation() {
    this.inspectorService
      .getAll(this.factoryId,this.periodId,this.userId)
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
    this.requestFactory.FactoryId=this.factoryId;
    this.requestFactory.PeriodId=this.periodId;
    this.requestFactory.WebSite=this.requestFactory.WebSite;
    this.requestFactory.FactoryEntityId=this.requestFactory.FactoryEntityId;
    this.requestFactory.CityId=this.requestFactory.CityId;
    this.requestFactory.IndustrialAreaId=this.requestFactory.IndustrialAreaId;
    console.log(this.requestFactory)
    if(this.requestFactory.Id==0){
      this.inspectorService
      .create(this.requestFactory)
      .subscribe((res: any) => {
      
      });
    }
    else{
      this.inspectorService
      .update(this.requestFactory)
      .subscribe((res: any) => {
       
      });
    }
    this.router.navigate(['/pages/Inspector/visit-landing/'+this.factoryId+'/'+this.periodId]);
        
    this.toastr.success("تم الحفظ");
   

  }
}
