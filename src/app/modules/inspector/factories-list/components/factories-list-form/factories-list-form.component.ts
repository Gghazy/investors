import { Component, OnInit } from '@angular/core';
import { FactoriesListService } from '../../factories-list.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import {FactoriesListModel}from '../../models/factories-list.model'

@Component({
  selector: 'app-factories-list-form',
  templateUrl: './factories-list-form.component.html',
  styleUrls: ['./factories-list-form.component.scss']
})
export class FactoriesListFormComponent implements OnInit {
factories: any=[]
userId:any
factorysModel = new FactoriesListModel();

InspectorFactory:any
  constructor(private factoryService :FactoriesListService,
    private shared: SharedService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {
   
      this.route.queryParams.subscribe(params => {
        const token = params['token'];
        if (token) {
          localStorage.setItem('authToken', token);

        }
      });
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
  pageChanged(data:any){
   // this.search.PageNumber=data;
    //this.getPeriods();

  }
  getData(id: number) {
 let x=  this.factories.find((x: any)=>x.Id == id);
 console.log(x)
  }
}
