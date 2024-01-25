import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fade } from 'src/app/shared/animation/app.animation';
import { ActualRawMaterialsService } from '../../actual-raw-materials.service';
import { ActualRawMaterial } from '../../models/actual-raw-material.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actual-raw-materials-form',
  templateUrl: './actual-raw-materials-form.component.html',
  styleUrls: ['./actual-raw-materials-form.component.scss'],
  animations: [
    fade
  ]
})
export class ActualRawMaterialsFormComponent implements OnInit {
  factoryId: any;
  rawMaterials: any = [];
  request = new ActualRawMaterial();
  constructor(private route: ActivatedRoute, private service: ActualRawMaterialsService,
    private toastr: ToastrService,) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
  }



  ngOnInit() {
    this.getRawMaterial();
    
  }

  getRawMaterial() {

    this.service
      .getRawMaterial(this.factoryId)
      .subscribe((res: any) => {
        this.rawMaterials = res.Data;
        console.log(this.rawMaterials)
      });

      addItem(item :string,x:number,y:number)
      {
    this.data.push({
        itemId:item,
        X:x,
        Y:y
    })}
    
    this.rawMaterials.forEach(element => {
      this.addItem(element.Name,0,0);
    });
  }

  
 

  save() {
   
    this.service
      .create(this.request)
      .subscribe((res: any) => {
       this.toastr.success("تم الحفظ");
       console.log(this.request)
      });
  }

}

function addItem(item: any, string: any, x: any, number: any, y: any, number1: any) {
  throw new Error('Function not implemented.');
}
