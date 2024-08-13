import { Component, ElementRef, EventEmitter, Output, ViewChild,SimpleChanges ,Input} from '@angular/core';
import { InspectorModel } from '../../models/inspector-lists.model';
import { FactoryService } from 'src/app/modules/factory/factory.service';
import { InspectorListsService } from '../../inspector-lists.service';
import { ToastrService } from 'ngx-toastr';
import { fade } from 'src/app/shared/animation/app.animation';
import { InspectorFactory } from '../../models/inspector-lists.model';

import { LookUpModel } from 'src/app/core/models/look-up-model';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { SearchCriteria } from 'src/app/core/models/search-criteria';
import { FactorySearch } from 'src/app/modules/factory/models/factory-search';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-inspector-form',
  templateUrl: './inspector-form.component.html',
  styleUrls: ['./inspector-form.component.scss'],
  animations: [
    fade
  ]
})
export class InspectorFormComponent {
  @Output() close = new EventEmitter<boolean>();
  inspecterForm!: FormGroup;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  separateDialCode = false;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  request = new InspectorModel();
  factoryEntities:LookUpModel[]=[];
  factories: number[]=[];
  factoriesAssigned: any[]=[];
  Allfactories: any[]=[];
  AllfactoriesList: any[]=[];
  ExsistOwnerIdentity=false
  search=new  FactorySearch()
  loadingNextPage: boolean = false;
  @Input() inspectorId!: number;
  @Input() closed!: boolean;
  @ViewChild('closeModal') Modal!: ElementRef;

  submitted=false
  constructor(
    private factoryService: FactoryService,
    private inspectorService: InspectorListsService,
    private toastr: ToastrService,
    private lookUpService: LookUpService) {}

  ngOnInit() {
    this.createInspecterForm()
    this.getFactoryEntities()
    this.getFactory()
   
   
  }
  ngOnChanges(changes: SimpleChanges) {
    
    
      this.factoriesAssigned=[];
      this.createInspecterForm();
      this.request=new InspectorModel();
      this.submitted=false;

     if(this.inspectorId!=-1)
     {
      this.getData(this.inspectorId)
     } 
     else
     {
      this.getFactoryEntities()
      this.getFactory()
     }
    

    
  }
  IsExsistOwnerIdentity()
  {
   this.ExsistOwnerIdentity=true;
  }
  IsNotExsistOwnerIdentity()
  {
   this.ExsistOwnerIdentity=false;
  }
  createInspecterForm(): void {
   
    this.inspecterForm = new FormGroup({       
      Name:  new FormControl('', [Validators.required]),
      OwnerIdentity:  new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[1-2][0-9]{9}$")])),
      FactoryEntityId:  new FormControl(-1, [Validators.required]),
      Status:  new FormControl(-1, [Validators.required]),                                             
      Phone:new FormControl('' ,
        [Validators.required, this.saPhoneNumberValidator]),
        email: new FormControl('' , 
          Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)])),
       
        FactoryId:  new FormControl(-1),
    
 
   });
     
   }
  addFactory(FactoryId:number){
     console.log(FactoryId)
     let factory= this.AllfactoriesList.find(x=>x.Id== FactoryId)
     //this.factories.push(FactoryId)
     this.request.FactoryIds.push(FactoryId)
     let fact=new InspectorFactory()
     fact.CommerialNumber=factory.CommercialRegister;
    
     fact.FactoryName=factory.NameAr;
     fact.Id=FactoryId;
     this.factoriesAssigned.push(fact)

     
  let index= this.Allfactories.findIndex(x=>x.Id== FactoryId)
  if (index !== -1) {
    this.Allfactories.splice(index, 1);
  }
    console.log(this.factories)
    console.log(this.factoriesAssigned)
  }
  saPhoneNumberValidator(control: FormControl): ValidationErrors | null {
    const phoneNumber = control.value?.number;
    if (phoneNumber != null) {
      const saPhoneNumberPattern = /^(05\d{8})$/; // Saudi Arabian phone number pattern without country code
      const isValid = saPhoneNumberPattern.test(phoneNumber);
      return isValid ? null : { saPhoneNumber: true };

    }
    return null;
  }

/*deleteFactory(i: number,Factory: any){

    this.factories.splice(i,1)
    console.log(this.factories)
    this.factoriesAssigned.splice(i,1)
    console.log(this.factoriesAssigned)
}
*/
deleteFactory(FactoryId: any) {
 
  let index= this.factoriesAssigned.findIndex(x=>x.FactoryId== FactoryId)
  if (index !== -1) {
    this.factoriesAssigned.splice(index, 1);
  }

  const index2 =  this.request.FactoryIds.indexOf(FactoryId);   
  if (index2 !== -1) {
 
    this.request.FactoryIds.splice(index2, 1);
  }


  let factory= this.AllfactoriesList.find(x=>x.Id== FactoryId)
  this.Allfactories.push(factory)

 

}
  getFactoryEntities() {
    this.lookUpService
      .getAllFactoryEntities()
      .subscribe((res: any) => {
        this.factoryEntities = res.Data;
     
        console.log(this.factoryEntities)
      });
  }

  getFactory(){
   
    this.factoryService
    .getAllPagination(this.search)
    .subscribe((res:any)=>{
      this.Allfactories=res.Data.Items
    this.AllfactoriesList=res.Data.Items
      console.log(res)
    })
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
   if (atBottom && ! this.loadingNextPage) {
      this.getFactory();
    }
  }
   getInspectorFactories(id: string) {
   
    this.inspectorService
      .getInspectorFactories(id)
      .subscribe((res: any) => {
       this.factoriesAssigned = res.Data
       
       this.factoryService
       .getAllPagination(this.search)
       .subscribe((res:any)=>{
         this.Allfactories=res.Data.Items
        this.factoriesAssigned.forEach(element => {
    
          let index= this.Allfactories.findIndex(x=>x.Id== element.FactoryId)
              if (index !== -1) {
                this.Allfactories.splice(index, 1);
              }
           });

         console.log(res)
       })
      
      
      })
  }
  getData(id: number) {
    console.log(id)
    this.inspectorService
      .getOne(id)
      .subscribe((res: any) => {
        this.request = res.Data;
        this.inspecterForm.get('Phone')?.setValue(this.request.Phone);
      
      
        this.getInspectorFactories(this.request.OwnerIdentity)
       // this.getFactoryEntities()
       // console.log(this.inspector)
      });
      

  }
  closePopUp() {
    this.Modal.nativeElement.click()
    this.close.emit(true);
  }
  closeModel()
  {
      this.submitted=false
      this.close.emit(true);
      
  }
  save() {
    this.submitted=true

  
    if (this.inspecterForm.invalid || this.ExsistOwnerIdentity) {
      
        
      this.toastr.error( 'رجاءا تاكد من صحة جميع الحقول المدخلة');
     
      return;
    }
   /// this.request.FactoryIds=this.factories

   let phoneNumber=this.inspecterForm.get('Phone')?.value;
    if(phoneNumber==undefined)
      this.request.Phone=''
    else
    this.request.Phone=phoneNumber.number
  if(this.inspectorId>0)
  {
    
     this.inspectorService
    .update(this.request)
    .subscribe((res: any) => {
      console.log(this.request)
     

      if(res.Data==null)
        {
          this.toastr.error("رقم هوية المدقق موجود مسبقا");
          this.IsExsistOwnerIdentity();
        }
        else
        {
          console.log(this.request)
          this.toastr.success("تم تعديل بيانات المدقق بنجاح");
          this.close.emit(true);
        }  
    });

  }
  else
  {

    console.log(this.request)
      this.inspectorService
        .create(this.request)
        .subscribe((res: any) => {
          if(res.Data==null)
          {
            this.toastr.error("رقم هوية المدقق موجود مسبقا");
            this.IsExsistOwnerIdentity();
          }
          else
          {
            console.log(this.request)
            this.toastr.success("تم حفظ بيانات المدقق بنجاح");
            this.close.emit(true);
          }  
         
        });
  }
  

  }

}
