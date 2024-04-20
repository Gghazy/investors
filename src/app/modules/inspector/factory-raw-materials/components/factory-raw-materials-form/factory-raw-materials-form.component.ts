import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResultResponse } from 'src/app/core/models/result-response';
import { FileService } from 'src/app/core/service/file.service';
import { FactoryRawMaterialService } from 'src/app/modules/factory-raw-materials/factory-raw-material.service';
import { RawMaterialSearch } from 'src/app/modules/factory-raw-materials/models/raw-material-search.model';
import { RawMaterial } from 'src/app/modules/factory-raw-materials/models/raw-material.model';
import { FactoryRawMaterialsModel } from '../../models/factory-raw-materials.model';

@Component({
  selector: 'app-factory-raw-materials-form',
  templateUrl: './factory-raw-materials-form.component.html',
  styleUrls: ['./factory-raw-materials-form.component.scss']
})
export class FactoryRawMaterialsFormComponent implements OnInit {
  factoryId: any;
  periodId: any;
  src!:any;
  materials= new ResultResponse<RawMaterial>()
  searchRawmaterial = new RawMaterialSearch();
  request= new FactoryRawMaterialsModel()
  constructor(
    private route: ActivatedRoute,
     private toastr: ToastrService,
     private rawMaterialService: FactoryRawMaterialService,
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
        
          this.materials = res.Data;
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
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const closestRow = target.closest('.row');

    const showInputElement = closestRow?.querySelector('.show-input');

    if (showInputElement) {
      if (target.value == '0') {
        showInputElement.classList.remove('d-none');
      } else {
        showInputElement.classList.add('d-none');
      }
    }
  }

  save(){
    console.log(this.request)
     // this.FormService
    // .create(this.request)
    // .subscribe((res: any) => {
    //   this.toastr.success("تم الحفظ");
    // });

  }
}
