import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasicInfoService } from 'src/app/modules/basic-info/basic-info.service';
import { BasicInfoModel } from '../../models/basic-info.model';
import { FactoryModel } from 'src/app/modules/factory/models/factory-model';
import { FileService } from 'src/app/core/service/file.service';
import { BasicFileModel } from 'src/app/modules/basic-info/models/basic-file-model';

@Component({
  selector: 'app-basic-info-form',
  templateUrl: './basic-info-form.component.html',
  styleUrls: ['./basic-info-form.component.scss']
})
export class BasicInfoFormComponent implements OnInit {
  files:BasicFileModel[]=[];
  requestFile=new BasicFileModel();
  request=new BasicInfoModel();
  src!:string;
  factoryId: any;
  periodId: any;
  requestFactory =new FactoryModel();
  constructor(
    private route: ActivatedRoute,
     private basicInfoService: BasicInfoService,
     private fileService:FileService,
     private toastr: ToastrService,
     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit() {
    this.getBasicInfo();
    this.getFiles();
  }
  onInputChange(event: Event): void {
    debugger;
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
  deleteFile(id:number){
    this.basicInfoService
    .delete(id)
    .subscribe((res: any) => {
      this.getFiles();
    });
  }
  getFiles() {
    this.basicInfoService
      .getAll(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.files = res.Data;
      });
  }

  saveFile(file: any) {
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.requestFile.AttachmentId = res.Data.Id
          console.log(this.requestFile)
        });
    }
  }

  getFile(attachmentId:number){
    this.fileService.getImage(attachmentId).subscribe((res: any) => {
      this.src='data:image/jpeg;base64,'+res.Image
      const blob = new Blob([res], { type: res.type });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
    });
  }

  getBasicInfo() {
    this.basicInfoService
      .getOne(this.factoryId,this.periodId)
      .subscribe((res: any) => {
     this.requestFactory = res.Data;
      });
  }

  save(){
    this.request.FactoryId=this.factoryId;
    this.request.PeriodId=this.periodId;
    console.log(this.request)

     this.basicInfoService
    .create(this.request)
    .subscribe((res: any) => {
      this.toastr.success("تم الحفظ");
    });
// 
  }
}
