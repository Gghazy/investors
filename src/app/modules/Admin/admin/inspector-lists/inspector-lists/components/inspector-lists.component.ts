import { Component, OnInit, ViewChild, EventEmitter, Output,SimpleChanges, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FactoryService } from 'src/app/modules/factory/factory.service';
import { InspectorListsService } from '../inspector-lists.service';
import { InspectorModel } from '../models/inspector-lists.model';
import { InspectorFactory } from '../models/inspector-lists.model';

import { LookUpService } from 'src/app/core/service/look-up.service';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { ToastrService } from 'ngx-toastr';
import { FactorySearch } from 'src/app/modules/factory/models/factory-search';

@Component({
  selector: 'app-inspector-lists',
  templateUrl: './inspector-lists.component.html',
  styleUrls: ['./inspector-lists.component.scss']
})
export class InspectorListsComponent implements OnInit {

  @ViewChild('closeModal') Modal!: ElementRef;
  Allfactories: any[] = [];
  search = new FactorySearch()
  inspectors!: InspectorModel[];
  inspector = new InspectorModel();
  factoryEntities: LookUpModel[] = [];
  removeFactoryList:any=[]
  InspectorFactories:any[] = [];
  inspectorId=-1;
  modalLabel!: string;
  isClosed=false;

    constructor(private route: ActivatedRoute,
    private factoryService: FactoryService,
    private inspectorService: InspectorListsService,
    private lookUpService: LookUpService,
    private router: Router,

    private toastr: ToastrService) { }

  ngOnInit() {
  
    this.getInspectors()
    this.getFactory()
  }
 
  DeleteFactory(FactoryId: any) {
    let index= this.InspectorFactories.findIndex(x=>x.FactoryId== FactoryId.FactoryId)
  
    if (index !== -1) {
      this.InspectorFactories.splice(index, 1);
    }
 
    const index2 =  this.inspector.FactoryIds.indexOf(FactoryId.FactoryId);   
    if (index2 !== -1) {
   
      this.inspector.FactoryIds.splice(index2, 1);
    }
  }
  addFactory(FactoryId: number) {
    console.log(FactoryId)
      let factory= this.Allfactories.find(x=>x.Id== FactoryId)
      let fact=new InspectorFactory()
      fact.CommerialNumber=factory.CommercialRegister;
      fact.FactoryName=factory.NameAr;
      fact.Id=FactoryId;
      this.inspector.FactoryIds.push(FactoryId)
      this.InspectorFactories.push(fact)

        //this.factoriesAssigned.push(factory)
       // this.inspector
    //   console.log(this.factories)
    //   console.log(this.factoriesAssigned)
  }
  getInspectors() {
    this.inspectorService
      .getAll()
      .subscribe((res: any) => {
        this.inspectors = res.Data;
      });
  }

  EditData(id: number)
  {
    if (id == -1) {
      this.modalLabel = 'إضافة مدقق '
     
    }
    else {
      this.modalLabel = 'تعديل  مدقق'
    }
    this.inspectorId=id
  }
  getData(id: number) {
    console.log(id)
    this.inspectorService
      .getOne(id)
      .subscribe((res: any) => {
        this.inspector = res.Data;
       
        this.getInspectorFactories(this.inspector.OwnerIdentity)
        this.getFactoryEntities()
        console.log(this.inspector)
      });
      

  }

  getInspectorFactories(id: string) {
   
    this.inspectorService
      .getInspectorFactories(id)
      .subscribe((res: any) => {
this.InspectorFactories = res.Data
      })
  }
  getFactory() {

    this.factoryService
      .getAllPagination(this.search)
      .subscribe((res: any) => {
        this.Allfactories = res.Data.Items
        console.log(res)
      })
  }
  closePopUp() {
    this.isClosed=true;
    this.Modal.nativeElement.click()
    this.getInspectors()
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
  }
  edit(id: number) {
    console.log(id)
  }

  Update() {
    
    this.inspectorService
      .update(this.inspector)
      .subscribe((res: any) => {
        console.log(this.inspector)
        this.toastr.success("تم تعديل بيانات المدقق بنجاح");
        this.closePopUp()
        this.router.navigate(['/pages/Admin/inspectors-list']);



      });
  }


  getFactoryEntities() {
    this.lookUpService
      .getAllFactoryEntities()
      .subscribe((res: any) => {
        this.factoryEntities = res.Data;
        console.log(this.factoryEntities)
      });
  }
}
