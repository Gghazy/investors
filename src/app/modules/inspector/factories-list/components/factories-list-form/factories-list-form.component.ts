import { Component, OnInit } from '@angular/core';
import { FactoriesListService } from '../../factories-list.service';

@Component({
  selector: 'app-factories-list-form',
  templateUrl: './factories-list-form.component.html',
  styleUrls: ['./factories-list-form.component.scss']
})
export class FactoriesListFormComponent implements OnInit {
factories: any=[]
  constructor(private factoryService :FactoriesListService){

  }

  ngOnInit(): void {
    this.getInspectorFactories();
   } 

   getInspectorFactories() { 
    
    this.factoryService
      .getFacatories(27)
      .subscribe((res: any) => {
        this.factories = res.Data;
      });
  }
}
