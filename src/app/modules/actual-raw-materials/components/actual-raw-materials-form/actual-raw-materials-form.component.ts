import { Component, OnInit } from '@angular/core';
import { fade } from 'src/app/shared/animation/app.animation';
import { ActualRawMaterialsService } from '../../actual-raw-materials.service';

@Component({
  selector: 'app-actual-raw-materials-form',
  templateUrl: './actual-raw-materials-form.component.html',
  styleUrls: ['./actual-raw-materials-form.component.scss'],
  animations: [
    fade
  ]
})
export class ActualRawMaterialsFormComponent implements OnInit{

  rawMaterials:any=[];
    constructor(private service :ActualRawMaterialsService){
  
    }


  ngOnInit() {
    this.getRawMaterial();
  }

  getRawMaterial() { 
   
    this.service
        .getRawMaterial(1)
        .subscribe((res: any) => {
        this.rawMaterials = res.Data;
        console.log(this.rawMaterials)
      });
  
      
    }
}
