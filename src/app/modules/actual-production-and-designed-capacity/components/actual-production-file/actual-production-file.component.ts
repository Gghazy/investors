import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActualProductionFileModel } from '../../models/actual-production-file-model';
import { FileService } from 'src/app/core/service/file.service';
import { ToastrService } from 'ngx-toastr';
import { ReasonService } from '../../reason.service';

@Component({
  selector: 'app-actual-production-file',
  templateUrl: './actual-production-file.component.html',
  styleUrls: ['./actual-production-file.component.scss']
})
export class ActualProductionFileComponent {
  files:ActualProductionFileModel[]=[];
  request=new ActualProductionFileModel();
  src!:string;
  @Input() factoryId!:number;
  @Input() periodId!:number;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fileService:FileService,
    private reasonService:ReasonService,
    private toastr: ToastrService
    ){}

  ngOnInit(): void {
    if( this.factoryId==null||this.periodId==null)
      {
        return
      }
   this.getFiles();
  }

  getFiles() { 
    
    this.reasonService
      .getAllFiles(this.factoryId,this.periodId)
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
    this.fileService.downloadTempelete(attachmentId).subscribe((res: any) => {
      this.downloadattachment(res)    });
  }
  downloadattachment(data: any) {
    const blob = new Blob([data], { type: data.type });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }
  save(){
    this.request.FactoryId=this.factoryId;
    this.request.PeriodId=this.periodId;
    this.reasonService
    .createFile(this.request)
    .subscribe((res: any) => {
      this.getFiles();
      this.toastr.success("تم الحفظ");
      this.request=new ActualProductionFileModel();
      this.fileInput.nativeElement.value = '';

    });

  }

  deleteFile(id:number){
    this.reasonService
    .deleteFile(id)
    .subscribe((res: any) => {
      this.getFiles();
    });
  }
}
