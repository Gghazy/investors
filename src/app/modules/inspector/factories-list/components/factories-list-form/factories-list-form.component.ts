import { Component, OnInit } from '@angular/core';
import { FactoriesListService } from '../../factories-list.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-factories-list-form',
  templateUrl: './factories-list-form.component.html',
  styleUrls: ['./factories-list-form.component.scss']
})
export class FactoriesListFormComponent implements OnInit {
factories: any=[]
userId:any
InspectorFactory:any
  constructor(private factoryService :FactoriesListService,
    private shared: SharedService,
  ){

  }

  ngOnInit(): void {
   this.userId= this.shared.getUserId()
    this.getInspectorFactories();
     
   } 
   getInspectorFactories() { 
    
    this.factoryService
      .getFacatories(this.userId)
      .subscribe((res: any) => {
        this.factories = res.Data;
        console.log(this.factories)
      });
  }

  getData(id: number) {
 let x=  this.factories.find((x: any)=>x.Id == id);
 console.log(x)
  }
}