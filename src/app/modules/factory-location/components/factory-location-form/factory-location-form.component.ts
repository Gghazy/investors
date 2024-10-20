import { Component , ViewChild, ElementRef, AfterViewInit} from '@angular/core';
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
import {ParamService}from 'src/app/core/service/paramService'
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
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
  fileDeletedList:number[]=[]
  fileAddedList:number[]=[]
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;
  lat!: number;
  lng!: number;
  showMap = false;
  location!: string;
  SelectedLocation: string="";
  display: any;
  geocoder!: google.maps.Geocoder;
  latLng!: google.maps.LatLng;
   center: google.maps.LatLngLiteral = { lat: 23.8859, lng: 45.0792 }; // Center of Saudi Arabia
    zoom = 12;
    options: google.maps.MapOptions = {
    maxZoom: 15,
    minZoom: 5,
    restriction: {
      latLngBounds: {
        north: 32.1543,
        south: 16.0036,
        west: 34.4957,
        east: 55.6667,
      },
      strictBounds: true,
    },
  };

  saudiArabiaBounds: google.maps.LatLngBoundsLiteral = {
    north: 32.1543,
    south: 16.0036,
    west: 34.4957,
    east: 55.6667,
  };
  constructor(
    private formBuilder: FormBuilder,

    private route: ActivatedRoute,
    private factoryLocationService: FactoryLocationService,
    private lookUpService: LookUpService,
    private toastr: ToastrService,
    private router: Router,
    private periodService: PeriodService,
    private sharedService:SharedService,
    private paramService: ParamService,

  ) {
    this.factoryId = paramService.getfactoryId();
    this.periodId = paramService.getperiodId();
    this.approveStatus=paramService.getstatus()
    this.geocoder = new google.maps.Geocoder();
    


  }
  ngOnInit(): void {
    if( this.factoryId==null||this.periodId==null)
      {
        this.router.navigate(['error']);
        return
      }
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
        if(this.request.WebSite!="")
        {
          this.SelectedLocation=this.request.WebSite
           if( this.SelectedLocation.includes(","))
               this.openLocation(this.request.WebSite)
            else
            this.getcurrentLocation()
        }
        else
        this.getcurrentLocation()
       
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
   // Define your patterns
const pattern1 = '^https://www\\.google\\.com/maps.+$';
const pattern2 = '^https://maps\\.app\\.goo\\.gl/.+$';
// Combine the patterns using the OR operator
const combinedPattern = `${pattern1}|${pattern2}`;
//"https://www.google.com/maps.+"
    this.factoryLocForm = this.formBuilder.group({
      factoryEntityId: [{value:'',disabled: this.approveStatus}, [Validators.required]],
      cityId: [{value:'',disabled: this.approveStatus}, [Validators.required]],
      industrialAreaId: [{value:'',disabled: this.approveStatus}, [Validators.required]],
    //  webSiteUrl:  [{value:'https://www.google.com/maps',disabled: this.approveStatus}, Validators.compose([Validators.required,Validators.pattern(combinedPattern)])],
    webSiteUrl:[{value:'',disabled: this.approveStatus}],
    });
  }
  /*get cityId() {
		let r= this.BasicInfoForm.get('cityId');
    if(r==null)
   
    return r;
	}*/
  public getFilestatus(item: any):void {
    this.statusFileLoc=item;
}
public DeleteFiles(fileIds: any):void {
  this.fileDeletedList=fileIds;
}
public AddFiles(fileIds: any):void {
  this.fileAddedList=fileIds;
}

deleteAddedFileList(){
  let length=this.fileAddedList.length
  let deletestat=true;
  this.fileAddedList.forEach(element => {
    this.factoryLocationService
      .deleteFile(element)
      .subscribe((res: any) => {
      length--;
      if(res.IsSuccess==false)
        {
         deletestat=false
        }
        if(length==0&&deletestat==false)
          this.toastr.error("خطأ في  حذف الملف");
      if(length==0)
        this.router.navigate(['/pages/factory-landing']);

    });
  });
 
}
deleteFileList(){
  let deletestat=true;
  let length=this.fileDeletedList.length
  this.fileDeletedList.forEach(element => {
    this.factoryLocationService
    .deleteFile(element)
    .subscribe((res: any) => {
      length--;
      if(res.IsSuccess==false)
        {
         deletestat=false
        }
        if(length==0&&deletestat==false)
          this.toastr.error("خطأ في  حذف الملف");

      
    });
  });
 
}
cancel() {
  if(this.fileAddedList.length>0)
   {
     this.deleteAddedFileList();
   }
   else
     this.router.navigate(['/pages/factory-landing']);
 }
  save() {
    
    this.submitted = true;
    if (this.factoryLocForm.invalid ||this.SelectedLocation=="") {
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
    if(this.fileDeletedList.length>0)
      {
        
        this.deleteFileList();
  
      }
    this.request.FactoryId = this.factoryId;
    this.request.PeriodId = this.periodId;
    if (this.request.Id == 0) {
      this.lockSaveItem=true;
      this.factoryLocationService
        .create(this.request)
        .subscribe((res: any) => {
          if(res.IsSuccess==false)
            {
                this.toastr.error("خطأ في عملية حفظ موقع المصنع")
            }
            else
            {
          this.toastr.success("تم حفظ موقع المصنع بنجاح");
          this.getLocation();
          this.router.navigate(['/pages/factory-landing']);
            }
            this.lockSaveItem=false;

        });
    }
    else {
      this.lockSaveItem=true;
      this.factoryLocationService
        .update(this.request)
        .subscribe((res: any) => {
          if(res.IsSuccess==false)
            {
                this.toastr.error("خطأ في عملية تعديل موقع المصنع")
            }
            else
            {
          this.toastr.success("تم تعديل موقع المصنع بنجاح");
          this.router.navigate(['/pages/factory-landing']);
            }
            this.lockSaveItem=false;

        });
    }
   
  }
  //map
  
  ngAfterViewInit() {
    this.initMap();
   //this.locateMe()
  }

  async initMap() {
 
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: this.center,
      zoom: this.zoom,
      ...this.options,
    });

     this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      const latLng = event.latLng;
     
      if (latLng) {
        this.geocodeLatLng(latLng).then(result => {
         
          if (result) {
            if (latLng && this.isWithinBounds(latLng)) {
        
              this.location = `${latLng.lat()}, ${latLng.lng()}`;
            } else {
              this.location =""
              this.toastr.error('  الرجاء مراجعة موقع المصنع ,خطأ في الموقع');
            }
          } else {
            this.toastr.error('  الرجاء مراجعة موقع المصنع ,خطأ في الموقع');
          }
        }).catch(error => {
          this.toastr.error('  الرجاء مراجعة موقع المصنع ,خطأ في الموقع');
        });
      }
      else
      this.toastr.error('  الرجاء مراجعة موقع المصنع ,خطأ في الموقع');

   
    
      /*let isKsaLocation =latLng?   (async () => {
        await this.geocodeLatLng(latLng);
      })():false;*/
      
      
     
      /*if (latLng && this.isWithinBounds(latLng)) {
        
        this.location = `${latLng.lat()}, ${latLng.lng()}`;
        alert("location"+this.location)
      } else {
        this.location =""
        this.toastr.error('الموقع خارج حدود المملكه العربية السعودية');
      }
      alert(this.location+"111")*/

    });
    
  }
  /*getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          this.geocodeLatLng(this.latLng);
        },
        (error) => {
          this.toastr.error('Geolocation failed: ' + error.message);
        }
      );
    } else {
      this.toastr.error('Geolocation is not supported by this browser.');
    }
  }*/
  isWithinBounds(latLng: google.maps.LatLng): boolean {
    return (
      latLng.lat() <= this.saudiArabiaBounds.north &&
      latLng.lat() >= this.saudiArabiaBounds.south &&
      latLng.lng() >= this.saudiArabiaBounds.west &&
      latLng.lng() <= this.saudiArabiaBounds.east
    );
  }
  geocodeLatLng(latLng: google.maps.LatLng): Promise<boolean>  {
  return new Promise((resolve, reject) => {

    this.geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' &&results) {
        if (results.length > 0) {
          const country = results[0].address_components.find(component => component.types.includes('country'));
          if (country && country.short_name === 'SA') {
                this.location = `${latLng.lat()}, ${latLng.lng()}`;
            resolve(true);
          } else {
            resolve(false);
            this.location =""
           //   this.toastr.error('الموقع خارج حدود المملكه العربية الس44عودية'+country?.short_name);
            
          }
        } else {
          resolve(false);
          this.location =""
          //this.toastr.error('الموقع خارج حدود المملكه العربية السعود33ية');
        
        }
      } else {
        
        resolve(false);
        this.location =""
        //this.toastr.error('الموقع خارج حدود المملكه العربية السعودي22ة');
      
      }

    });
  });
  }
  getcurrentLocation() {

    if (navigator.geolocation) 
      {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          const newCenter = { lat, lng };
          this.map.setCenter(newCenter);
          this.map.setZoom(15); // Adjust zoom level as needed
          return true
         // this.mapInitializer();
        },
        (error) => {
          //console.error('Geolocation error'+'Error Code = ' + error.code + ' - ' + error.message);
          return false
       //   alert('Error Code = ' + error.code + ' - ' + error.message);
        }
        ,
  {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  }
      );
    } 
    else {
      console.log('Geolocation is not supported by this browser.');
      return false
    }
    return false
  }
 
  openLocation(location: string) {
   
    const [lat, lng] = location.split(',').map(Number);  
    const newCenter = { lat, lng };
    this.map.setCenter(newCenter);
    this.map.setZoom(15); // Adjust zoom level as needed
  }
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  selectLocation()
  {
    if(this.location!="")
    this.toastr.info("احداثيات الموقع"+this.location);
    this.SelectedLocation=this.location
    this.request.WebSite=this.location;
    
  }
  cancelLocation()
  {
    this.location=""
    this.SelectedLocation=""
    


  }
}

