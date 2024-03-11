import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fade } from 'src/app/shared/animation/app.animation';
import { LocationModel } from '../../models/location-model';
import { FactoryLocationService } from '../../factory-location.service';
import { ToastrService } from 'ngx-toastr';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { LookUpModel } from 'src/app/core/models/look-up-model';
 
@Component({
  selector: 'app-factory-location-form',
  templateUrl: './factory-location-form.component.html',
  styleUrls: ['./factory-location-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryLocationFormComponent {
  factoryId: any;
  periodId: any;
  request = new LocationModel();
  cities:LookUpModel[]=[];
  industrialAreas:LookUpModel[]=[];
  factoryEntities:LookUpModel[]=[];

  constructor(
    private route: ActivatedRoute,
     private factoryLocationService: FactoryLocationService,
     private lookUpService: LookUpService,
     private toastr: ToastrService,
     private router: Router,
     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit(): void {
    this.getLocation();
    this.getCities();
    this.getIndustrialAreas();
    this.getFactoryEntities();
  }

  getLocation() {
    this.factoryLocationService
      .getOne(this.factoryId)
      .subscribe((res: any) => {
        this.request = res.Data;
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
    this.lookUpService
    .getAreaByCity(id)
    .subscribe((res: any) => {
      
      this.industrialAreas = res.Data;
    });
  }
  save(){
    this.request.FactoryId=this.factoryId;
    if (this.request.Id==0){
      this.factoryLocationService
      .create(this.request)
      .subscribe((res: any) => {
        this.request=res.Data;
        this.router.navigate(['/pages/factory-landing/'+this.factoryId]);
        this.toastr.success("تم الحفظ");
      });
    }
    else{
      this.factoryLocationService
      .update(this.request)
      .subscribe((res: any) => {
        this.router.navigate(['/pages/factory-landing/'+this.factoryId]);
        this.toastr.success("تم الحفظ");
      });
    }
   
  }
}
