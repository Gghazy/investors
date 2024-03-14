import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BasicFileModel } from '../../models/basic-file-model';
import { FileService } from 'src/app/core/service/file.service';
import { BasicInfoService } from '../../basic-info.service';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-basic-info-file',
  templateUrl: './basic-info-file.component.html',
  styleUrls: ['./basic-info-file.component.scss']
})
export class BasicInfoFileComponent implements OnInit {

  files:BasicFileModel[]=[];
  request=new BasicFileModel();
  src!:string;
  @Input() factoryId!:string;
  @Input() periodId!:string;
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(
    private fileService:FileService,
    private basicInfoService:BasicInfoService,
    private toastr: ToastrService
    ){}

  ngOnInit(): void {
   this.getFiles();
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
          this.request.AttachmentId = res.Data.Id
        });
    }
  }

  getFile(attachmentId:number){
    this.fileService.getImage(attachmentId).subscribe((res: any) => {
      this.src='data:image/jpeg;base64,'+res.Image
    });
  }

  save(){
    this.request.FactoryId=Number(this.factoryId);
    this.request.PeriodId=Number(this.periodId);
    
    this.basicInfoService
    .create(this.request)
    .subscribe((res: any) => {
      this.getFiles();
      this.toastr.success("تم الحفظ");
      this.request=new BasicFileModel();
      this.fileInput.nativeElement.value = '';
    });

  }

  deleteFile(id:number){
    this.basicInfoService
    .delete(id)
    .subscribe((res: any) => {
      this.getFiles();
    });
  }

}
