import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ResolveStart,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/core/service/file.service';
import { RawMaterialSearch } from 'src/app/modules/factory-raw-materials/models/raw-material-search.model';
import { FactoryRawMaterialService } from 'src/app/modules/factory-raw-materials/factory-raw-material.service';
import { FactoryRawMaterialsService } from '../../factory-raw-materials.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PeriodService } from 'src/app/modules/period/period.service';
import {ParamService}from 'src/app/core/service/paramService'


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
  PeriodName!:string
  validProductList=true;
  inspectorApproved=false;
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private rawMaterialService: FactoryRawMaterialService,
    private service: FactoryRawMaterialsService,
    private fileService: FileService,
    private shared: SharedService,
    private periodService : PeriodService,
    private router: Router,
    private paramService: ParamService



  ) {
    this.factoryId = paramService.getfactoryId();
    this.periodId = paramService.getperiodId();
    this.inspectorApproved=paramService.getInspectorStatus()
  }
  ngOnInit() {
    if( this.factoryId==null||this.periodId==null)
      {
        this.router.navigate(['error']);
        return
      }
    this.userId = this.shared.getUserId();
    this.getRawMaterial()
    this.getperiod()
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
        console.log(res)
        this.downloadattachment(res)
      });
    }
  }
  downloadattachment(data: any) {
 
    const blob = new Blob([data], { type: data.type });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }
  deleteImage(material: any) {
    console.log(material)
    material.CorrectPhotoId = 0
    this.toastr.success( " تم حذف صورة المادة الأولية"+"("+ material.RawMaterialName+")");


  }

  deleteFile(material: any) {
    console.log(material)
    material.CorrectPaperId = 0
    this.toastr.success( " تم حذف ورقة بيانات المادة الأولية"+"("+ material.RawMaterialName+")");


  }
  savePhoto(file: any,i:number) {
    if (file.target.files.length > 0) {
      const fileImage = file.target.files[0];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
    if (fileImage.size > maxFileSize) {
      // If the file is larger than 5 MB
      this.toastr.error (' 5MB حجم الملف أكبر من');
            console.error(' 5MB حجم الملف أكبر من');
            
    }
    else {
      const file1 = file.target.files[0];
      const fileType = file1.type;
      
        if (!(fileType === 'image/png' || fileType === 'image/jpeg') )
        {
          this.toastr.error (' الرجاء رفع المستند بالصيغة jpeg , jpg , png  ');
       
        }
        else
        {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.materials[i].CorrectPhotoId = res.Data.Id
          this.toastr.success( " تم إرفاق صورة المادة الأولية"+"("+ this.materials[i].RawMaterialName+")");

          console.log(this.materials)
          this.Valid()
        });
    }}
  }
  }

  saveFile(file: any,i:number) {
    if (file.target.files.length > 0) {
      const fileImage = file.target.files[0];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
    if (fileImage.size > maxFileSize) {
      // If the file is larger than 5 MB
      this.toastr.error (' 5MB حجم الملف أكبر من');
            console.error(' 5MB حجم الملف أكبر من');
            
    }
    else {
      const file1 = file.target.files[0];
      const fileType = file1.type;
      
         const validFileTypes = ['application/pdf'];
      if (!validFileTypes.includes(fileType)) 
      {
        this.toastr.error (' الرجاء رفع المستند بالصيغة  pdf');
       
        }
        else
        {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.materials[i].CorrectPaperId = res.Data.Id
          this.toastr.success( " تم إرفاق ورقة بيانات المادة الأولية"+"("+ this.materials[i].RawMaterialName+")");
          console.log(this.materials)
          this.Valid()
        });
    }
  }
}
  }
  NotValid()
  {
    this.validProductList=false;
  }
  Valid()
  {
    this.validProductList=true;
  }
  save() {
    if(!this.validProductList)
      {
        this.toastr.error("الرجاء التأكد من صحة البيانات المدخلة ")
        return
      }

    let count=this.materials.length
    this.materials.forEach(element => {
      console.log(element)

       element.Comment=  this.materials[0].Comment 
       if(element.IsImageClear)
        {
          element.CorrectPaperId=0
          element.CorrectPhotoId=0
        }

      if (element.Id == 0) {
        this.service
          .create(element)
          .subscribe((res: any) => {
            count--;
        if(count<=0)
          {
            this.toastr.success(" تم حفظ بيانات المواد الأولية بنجاح");
            this.router.navigate(['/pages/Inspector/visit-landing']);
          }
          });
      }
      else {
        this.service
          .update(element)
          .subscribe((res: any) => {
            count--;
        if(count<=0)
          {
            this.toastr.success(" تم حفظ بيانات المواد الأولية بنجاح");
          this.router.navigate(['/pages/Inspector/visit-landing']);
          }
          });
      }

    });
    
  }
  getperiod(){
    this.periodService
    .getOne(this.periodId)
    .subscribe((res: any) => {
      
      this.PeriodName= res.Data.PeriodName;
    });
  }
  onInputChange(event: Event): void {
    this.Valid();

  }
}
