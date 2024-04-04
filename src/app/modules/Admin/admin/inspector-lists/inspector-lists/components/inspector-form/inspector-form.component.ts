import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { InspectorModel } from '../../models/inspector-lists.model';
import { FactoryService } from 'src/app/modules/factory/factory.service';
import { InspectorListsService } from '../../inspector-lists.service';
import { ToastrService } from 'ngx-toastr';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { LookUpService } from 'src/app/core/service/look-up.service';

@Component({
  selector: 'app-inspector-form',
  templateUrl: './inspector-form.component.html',
  styleUrls: ['./inspector-form.component.scss']
})
export class InspectorFormComponent {
  @Output() close = new EventEmitter<boolean>();
 
  request = new InspectorModel();
  factoryEntities:LookUpModel[]=[];
  factories: number[]=[];
  factoriesAssigned: any[]=[];
  factoriesByEntity: any[]=[];
  
  constructor(
    private factoryService: FactoryService,
    private inspectorService: InspectorListsService,
    private toastr: ToastrService,
    private lookUpService: LookUpService) {}

  ngOnInit() {

    this.getFactoryEntities()
  }
  addFactory(FactoryId:number){
    console.log(FactoryId)
   let factory= this.factoriesByEntity.find(x=>x.Id== FactoryId)
     this.factories.push(FactoryId)
     
     this.factoriesAssigned.push(factory)
    console.log(this.factories)
    console.log(this.factoriesAssigned)
  }
deleteFactory(i: number,Factory: any){

    this.factories.splice(Factory.Id)
    console.log(Factory.Id)
    this.factoriesAssigned.splice(Factory)
    console.log(this.factoriesAssigned)
}

  getFactoryEntities() {
    this.lookUpService
      .getAllFactoryEntities()
      .subscribe((res: any) => {
        this.factoryEntities = res.Data;
        console.log(this.factoryEntities)
      });
  }

  getFactory(id:number){
    console.log(id)
    this.factoryService
    .getFactoryEntity(id)
    .subscribe((res:any)=>{
      this.factoriesByEntity=res.Data
      console.log(this.factoriesByEntity)
      console.log(res)
    })
  }
  save() {
   this.request.FactoryIds=this.factories
    console.log(this.request)
      this.inspectorService
        .create(this.request)
        .subscribe((res: any) => {
          console.log(this.request)
          this.close.emit(true);
          this.toastr.success("تم الحفظ");

        });

  }

}
