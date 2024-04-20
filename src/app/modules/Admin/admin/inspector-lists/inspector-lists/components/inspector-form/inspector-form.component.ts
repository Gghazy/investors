import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { InspectorModel } from '../../models/inspector-lists.model';
import { FactoryService } from 'src/app/modules/factory/factory.service';
import { InspectorListsService } from '../../inspector-lists.service';
import { ToastrService } from 'ngx-toastr';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { SearchCriteria } from 'src/app/core/models/search-criteria';
import { FactorySearch } from 'src/app/modules/factory/models/factory-search';

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
  Allfactories: any[]=[];
  search=new  FactorySearch()
  loadingNextPage: boolean = false;
  constructor(
    private factoryService: FactoryService,
    private inspectorService: InspectorListsService,
    private toastr: ToastrService,
    private lookUpService: LookUpService) {}

  ngOnInit() {

    this.getFactoryEntities()
    this.getFactory()
  }
  addFactory(FactoryId:number){
    console.log(FactoryId)
   let factory= this.Allfactories.find(x=>x.Id== FactoryId)
     this.factories.push(FactoryId)
     
     this.factoriesAssigned.push(factory)
    console.log(this.factories)
    console.log(this.factoriesAssigned)
  }
deleteFactory(i: number,Factory: any){

    this.factories.splice(i,1)
    console.log(this.factories)
    this.factoriesAssigned.splice(i,1)
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

  getFactory(){
   
    this.factoryService
    .getAllPagination(this.search)
    .subscribe((res:any)=>{
      this.Allfactories=res.Data.Items
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
