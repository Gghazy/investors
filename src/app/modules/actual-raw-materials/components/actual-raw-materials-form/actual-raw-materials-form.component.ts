import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class ActualRawMaterialsFormComponent implements OnInit {
  factoryId: any;
  rawMaterials: any = [];

  constructor(private route: ActivatedRoute, private service: ActualRawMaterialsService) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
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