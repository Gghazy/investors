import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/core/service/file.service';
import { RawMaterialSearch } from 'src/app/modules/factory-raw-materials/models/raw-material-search.model';
import { FactoryRawMaterialService } from 'src/app/modules/factory-raw-materials/factory-raw-material.service';
import { FactoryRawMaterialsService } from '../../factory-raw-materials.service';
import { SharedService } from 'src/app/shared/services/shared.service';


@Component({
  selector: 'app-factory-raw-materials-form',
  templateUrl: './factory-raw-materials-form.component.html',
  styleUrls: ['./factory-raw-materials-form.component.scss']
})
export class FactoryRawMaterialsFormComponent implements OnInit {
  factoryId: any;
  periodId: any;
  userId: any;
  src!: any;
  materials: any[] = []
  searchRawmaterial = new RawMaterialSearch();
  request: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private rawMaterialService: FactoryRawMaterialService,
    private service: FactoryRawMaterialsService,
    private fileService: FileService,
    private shared: SharedService,
  ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit() {
    this.userId = this.shared.getUserId();
    this.getRawMaterial()
  }
  getRawMaterial() {
    this.service
      .getAll(this.factoryId, this.periodId, this.userId)
      .subscribe((res: any) => {

        this.materials = res.Data;
console.log(this.materials)
      })

  }
  getImage(attachmentId: number) {
    this.src = ""
    console.log(attachmentId)
    if (attachmentId == 0) {
      this.toastr.error("لا يوجد صورة");
    }
    else {
      this.fileService.getImage(attachmentId).subscribe((res: any) => {
        this.src = 'data:image/jpeg;base64,' + res.Image
      });
    }

  }


  getFile(attachmentId: number) {
    if (attachmentId == 0) {
      this.toastr.error("لا يوجد ملف");
    }
    else {
      this.fileService.downloadTempelete(attachmentId).subscribe((res: any) => {
        this.downloadattachment(res)
      });
    }
  }
  downloadattachment(data: any) {
    const blob = new Blob([data], { type: data.type });
    const url = window.URL.createObjectURL(blob);
    this.src = url
  }
  deleteImage(material: any) {
    console.log(material)
    material.CorrectPhotoId = 0

  }

  deleteFile(material: any) {
    console.log(material)
    material.CorrectPaperId = 0

  }
  savePhoto(file: any) {
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.materials[0].CorrectPhotoId = res.Data.Id
          console.log(this.materials)

        });
    }
  }

  saveFile(file: any) {
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.materials[0].CorrectPaperId = res.Data.Id
          console.log(this.materials)

        });
    }
  }
  save() {
    
    this.materials.forEach(element => {
      console.log(element)

element.Comment=      this.materials[0].Comment 
      if (element.Id == 0) {
        this.service
          .create(element)
          .subscribe((res: any) => {
          
          });
      }
      else {
        this.service
          .update(element)
          .subscribe((res: any) => {
           
          });
      }

    });
    this.toastr.success("تم الحفظ");
  }

  onInputChange(event: Event): void {
    //     if (target.value === 'no') {
    //   showInputElement.classList.remove('d-none');
    // } else {
    //   showInputElement.classList.add('d-none');
    // }

  }
}
