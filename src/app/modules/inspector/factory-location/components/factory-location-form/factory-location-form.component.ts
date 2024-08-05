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
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { invalid } from 'moment';

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
submitted=false;
FactoryLocForm!: FormGroup;
combinedPattern="";
isSelectedNew=false;
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private shared: SharedService,
    private factoryLocationService: FactoryLocationService,
    private inspectorService: InspectorFactoryLocationService,
    private router: Router,
    private lookUpService: LookUpService,
    private periodService : PeriodService,
    private formBuilder: FormBuilder,


  ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit() {
  
    this.createfactoryLocationForm();
    this.userId = this.shared.getUserId();
    this.getLocation();
    this.getFactoryEntities();
    this.getCities();
    this.getIndustrialAreas();
   this.getperiod()
   //
   

  }
  createfactoryLocationForm(): void {
    // Define your patterns
 const pattern1 = '^https://www\\.google\\.com/maps.+$';
 const pattern2 = '^https://maps\\.app\\.goo\\.gl/.+$';
 // Combine the patterns using the OR operator
 const combinedPattern = `${pattern1}|${pattern2}`;
 
 //"https://www.google.com/maps.+"
     this.FactoryLocForm = new FormGroup({  
      
       FactoryEntityId: new FormControl ({ value: '', disabled: true }),
       IsFactoryEntityCorrect:new FormControl(''),
       NewFactoryEntityId: new FormControl([{value:-1}]),
       CityId:  new FormControl ({ value: '', disabled: true }),
       IsCityCorrect:new FormControl(''),
       NewCityId:new FormControl([{value:-1}]),
       IndustrialAreaId:  new FormControl ({ value: '', disabled: true }),
       IsIndustrialAreaCorrect:new FormControl(''),
       NewIndustrialAreaId:new FormControl([{value:-1}]),
       WebSite :  new FormControl ({ value: '', disabled: true }),
       IsWebSiteCorrect :new FormControl(''),
       NewWebSite: new FormControl ('',
         Validators.compose([Validators.required,Validators.pattern(combinedPattern)])),
         Comment:new FormControl(''),
 
     });
   }
   
   
  getLocation() {
    this.inspectorService
      .getAll(this.factoryId, this.periodId, this.userId)
      .subscribe((res: any) => {
        this.requestFactory = res.Data;
        if(this.FactoryLocForm.get('NewWebSite')?.errors!=null)
        this.FactoryLocForm.get('NewWebSite')?.setErrors(null);
      
        console.log(this.requestFactory)
      });
  }

  getCities() {
    this.lookUpService
      .getAllCities()
      .subscribe((res: any) => {
        this.cities = res.Data;
        this.Newcities=res.Data;
      //  this.cityName = this.cities.find(x => x.Id == this.requestFactory.CityId)?.NameAr;

      });
  }

  getIndustrialAreas() {
    this.lookUpService
      .getAllIndustrialAreas()
      .subscribe((res: any) => {

        this.industrialAreas = res.Data;
        this.NewindustrialAreas=res.Data;
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
    
    
    if(id>0)
    {
    this.cityCode = this.cities.find(x => x.Id == id)?.CityCode;
    this.lookUpService
      .getAreaByCity(this.cityCode)
      .subscribe((res: any) => {
        this.NewindustrialAreas = res.Data;
       // this.requestFactory.NewIndustrialAreaId =-1
      });
    }
   
  }
  onInputChange(event: Event): void {
    console.log(this.requestFactory)

   
    
      
       
        if( this.requestFactory.IsIndustrialAreaCorrect  && this.requestFactory.IsCityCorrect==false)
          {
            this.FactoryLocForm.get('IsIndustrialAreaCorrect')?.setValue(false);
            this.toastr.error(" يجب تعديل المنطقة عند إختيار المدينة  [لا]")
          }
      // الجهة التي يتبع لها المصنع​ غير صحيحة  
      if (this.requestFactory.IsFactoryEntityCorrect == false) {
      
      if( this.requestFactory.IsCityCorrect &&  this.requestFactory.NewFactoryEntityId ==-1 && this.isSelectedNew)
        {
          this.FactoryLocForm.get('IsCityCorrect')?.setValue(false);
          this.toastr.error(" لم يتم إختيار الجهة الصحيحة  بعد ")
        }
        else
        if( this.requestFactory.IsCityCorrect  && this.isSelectedNew)
          {
            this.FactoryLocForm.get('IsCityCorrect')?.setValue(false);
            this.toastr.error(" يجب تعديل المدينة والمنطقة عند إختيار جهة المصنع [لا]")
          }

          if( this.requestFactory.IsIndustrialAreaCorrect &&  this.requestFactory.NewCityId==-1 && this.isSelectedNew)
            {
              this.FactoryLocForm.get('IsIndustrialAreaCorrect')?.setValue(false);
              this.toastr.error(" لم يتم إختيار المدينة الصحيحة بعد ")
      
            }
            else
            if( this.requestFactory.IsIndustrialAreaCorrect  && this.isSelectedNew)
              {
                this.FactoryLocForm.get('IsIndustrialAreaCorrect')?.setValue(false);
                this.toastr.error(" يجب تعديل المنطقة عند إختيار المدينة  [لا]")
              }

      this.requestFactory.IsCityCorrect = false
      this.requestFactory.IsIndustrialAreaCorrect = false
      //this.FactoryLocForm.get('NewFactoryEntityId')?.setValue(-1);
      if(this.isSelectedNew==false)
      {
        this.requestFactory.NewFactoryEntityId =-1

    //  this.FactoryLocForm.get('NewFactoryEntityId')?.setValue(-1);
    //  this.FactoryLocForm.get('NewCityId')?.setValue(-1);
      }
     
     

    } //clear all
    if (this.requestFactory.IsFactoryEntityCorrect == true) {
      this.requestFactory.NewCityId = -1
      this.requestFactory.NewIndustrialAreaId =-1
      this.requestFactory.NewFactoryEntityId =-1
     if(this.FactoryLocForm.get('NewFactoryEntityId')?.errors!=null)
      this.FactoryLocForm.get('NewFactoryEntityId')?.setErrors(null);
      //this.isSelectedNew=false
      
      
    } 
    if (this.requestFactory.IsCityCorrect == false) {
      if(this.requestFactory.IsFactoryEntityCorrect)
      this.onEntitySelect(this.requestFactory.FactoryEntityId)
      else
      this.onEntitySelect(this.requestFactory.NewFactoryEntityId)

      this.requestFactory.IsIndustrialAreaCorrect = false
      if(this.isSelectedNew==false)
        {
          
          this.requestFactory.NewCityId = -1
          

      //  this.FactoryLocForm.get('NewCityId')?.setValue(-1);
      //  this.FactoryLocForm.get('NewCityId')?.setValue(-1);
        }
    } 
    if (this.requestFactory.IsCityCorrect == true) {
      this.requestFactory.NewCityId = -1
      this.requestFactory.NewIndustrialAreaId =-1
      this.requestFactory.NewFactoryEntityId =-1
      if(this.FactoryLocForm.get('NewCityId')?.errors!=null)
      this.FactoryLocForm.get('NewCityId')?.setErrors(null);

    }
    if (this.requestFactory.IsIndustrialAreaCorrect == false) {
      if(this.requestFactory.IsCityCorrect)
      this.onCitySelect(this.requestFactory.CityId)
      else
      this.onCitySelect(this.requestFactory.NewCityId)

      this.requestFactory.IsIndustrialAreaCorrect = false
    } 
    if (this.requestFactory.IsIndustrialAreaCorrect == true) {
      this.requestFactory.NewCityId = -1
      this.requestFactory.NewIndustrialAreaId =-1
      this.requestFactory.NewFactoryEntityId =-1
      if(this.FactoryLocForm.get('NewIndustrialAreaId')?.errors!=null)
      this.FactoryLocForm.get('NewIndustrialAreaId')?.setErrors(null);

    } 
    if (this.requestFactory.IsFactoryEntityCorrect == false) {
      this.isSelectedNew=true;
    }
    
  }
  onwebUrlChange()
  {  
    if (this.requestFactory.IsWebSiteCorrect) {
    this.requestFactory.NewWebSite = ''
    if(this.FactoryLocForm.get('NewWebSite')?.errors!=null)
    this.FactoryLocForm.get('NewWebSite')?.setErrors(null);

  }
  else
  {

  }

  }

  save() {
    this.submitted=true;
    if(this.FactoryLocForm.invalid)
      {
        this.toastr.error("الرجاء التأكد من صحة البيانات المدخلة ")
        return 
      }
   if(!this.requestFactory.IsFactoryEntityCorrect)
   {
    if(this.requestFactory.NewFactoryEntityId ==-1)
    {
      this.toastr.error("الرجاء التأكد من صحة البيانات المدخلة ")
      return 
    }
   }
   if(!this.requestFactory.IsCityCorrect)
    {
     if(this.requestFactory.NewCityId ==-1)
     {
       this.toastr.error("الرجاء التأكد من صحة البيانات المدخلة ")
       return 
     }
    }
    if(!this.requestFactory.IsIndustrialAreaCorrect)
      {
       if(this.requestFactory.NewIndustrialAreaId ==-1)
       {
         this.toastr.error("الرجاء التأكد من صحة البيانات المدخلة ")
         return 
       }
      }
      if(!this.requestFactory.IsWebSiteCorrect)
        {
          if(this.FactoryLocForm.get('NewFactoryEntityId')?.hasError('pattern'))
           {
            this.toastr.error("الرجاء التأكد من صحة البيانات المدخلة ")
           return 
           }
         }
        
 
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
          this.toastr.success("تم حفظ بيانات موقع المصنع");
          this.router.navigate(['/pages/Inspector/visit-landing/' + this.factoryId + '/' + this.periodId]);

        });
    }
    else {
      this.inspectorService
        .update(this.requestFactory)
        .subscribe((res: any) => {
          this.toastr.success("تم حفظ بيانات موقع المصنع");
          this.router.navigate(['/pages/Inspector/visit-landing/' + this.factoryId + '/' + this.periodId]);

      
        });
    }
 

  }
}
