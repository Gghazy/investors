import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/core/service/file.service';
import { RawMaterialSearch } from 'src/app/modules/factory-raw-materials/models/raw-material-search.model';
import { FactoryRawMaterialService } from 'src/app/modules/factory-raw-materials/factory-raw-material.service';
import { FactoryRawMaterialsService } from '../../factory-raw-materials.service';


@Component({
  selector: 'app-factory-raw-materials-form',
  templateUrl: './factory-raw-materials-form.component.html',
  styleUrls: ['./factory-raw-materials-form.component.scss']
})
export class FactoryRawMaterialsFormComponent implements OnInit {
  factoryId: any;
  periodId: any;
  src!:any;
  materials:any[]=[]
  searchRawmaterial = new RawMaterialSearch();
  request: any[] = [];
    constructor(
    private route: ActivatedRoute,
     private toastr: ToastrService,
     private rawMaterialService: FactoryRawMaterialService,
     private service: FactoryRawMaterialsService,
     private fileService: FileService,
     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit() {
    this.getRawMaterial()
  }
  getRawMaterial() {
    this.rawMaterialService
      .getRawMaterial(this.searchRawmaterial, this.factoryId)
      .subscribe((res: any) => {
        
          this.materials = res.Data.Items;
          this.request = this.materials.map(item => ({
            Name: item.Name,
            PhotoId:item.PhotoId,
            IsPhotoClear: true,
            Comments: '',
            ClearPhotoId:'',

          }));
        })
      
      }

      getFile(attachmentId:number){
        if(attachmentId==null){
          this.toastr.error("لا يوجد ملف");    }
        else{
          this.fileService.downloadTempelete(attachmentId).subscribe((res: any) => {
            this.downloadattachment(res)    
          });
        }
        
      }
      downloadattachment(data: any) {
        const blob = new Blob([data], { type: data.type });
        const url= window.URL.createObjectURL(blob);
        this.src=url
      }
 

  save(){
    this.request.forEach(element => {
      console.log(element)
    
  
     this.service
    .create(element)
    .subscribe((res: any) => {
      this.toastr.success("تم الحفظ");
    });
  });
  }
}
