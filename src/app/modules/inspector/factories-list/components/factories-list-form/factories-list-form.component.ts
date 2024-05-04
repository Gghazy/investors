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
inspector:any
  constructor(private factoryService :FactoriesListService,
    private shared: SharedService,
  ){

  }

  ngOnInit(): void {
    this.getInspectorFactories();
    this.shared.setUserRole('Inspector');
   } 

   getInspectorFactories() { 
    
    this.factoryService
      .getFacatories(27)
      .subscribe((res: any) => {
        this.factories = res.Data;
        console.log(this.factories)
      });
  }
}
