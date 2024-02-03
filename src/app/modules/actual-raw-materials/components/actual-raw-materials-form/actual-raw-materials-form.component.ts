import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fade } from 'src/app/shared/animation/app.animation';
import { ActualRawMaterialsService } from '../../actual-raw-materials.service';
import { ActualRawMaterial } from '../../models/actual-raw-material.model';
import { ToastrService } from 'ngx-toastr';
import { BasicFileModel } from 'src/app/modules/basic-info/models/basic-file-model';

@Component({
  selector: 'app-actual-raw-materials-form',
  templateUrl: './actual-raw-materials-form.component.html',
  styleUrls: ['./actual-raw-materials-form.component.scss'],
  animations: [
    fade
  ]
})
export class ActualRawMaterialsFormComponent implements OnInit {
  files:BasicFileModel[]=[];
  factoryId: any;
  rawMaterials: any = [];

  x: any = [];
  src!:string;
  request:ActualRawMaterial[]=[]; 
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
        this.rawMaterials.forEach((item: any) => {
         this.x.push({
          'RawMaterialId':item.Id,
          'Name':item.Name,'CurrentStockQuantity_KG':2,
          'UsedQuantity_KG':30,
          'AttachmentId':1 })
        })
        console.log(this.x);
      });
      
   
    
  }

  
  getFiles() { 
    this.service
      .getFiles(this.factoryId)
      .subscribe((res: any) => {
        this.files = res.Data;
      });
  }

  saveFile(file: any) {
    console.log(file)
    // if (file.target.files.length > 0) {
    //   this.request.RawMaterialId = 4
    //   this.service
    //     .AddFile(file.target.files[0])
    //     .subscribe((res: any) => {
    //       this.request.AttachmentId = res.Data.Id
        
    //     });
    // }
  }

  getFile(attachmentId:number){
    this.service.getFiles(attachmentId).subscribe((res: any) => {
      this.src='data:image/jpeg;base64,'+res.Image
    });
  }

  deleteFile(id:number){
    this.service
    .delete(id)
    .subscribe((res: any) => {
      this.getFiles();
    });
  }


  save() {
    this.x.forEach((item: any) => {

  this.service
    .create(item)
    .subscribe((res: any) => {
    this.toastr.success("تم الحفظ");
     console.log(item)
  });
   })
  
  }

}

