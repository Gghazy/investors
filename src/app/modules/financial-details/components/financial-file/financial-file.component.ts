import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FinancialFileModel } from '../../Models/financial-file-model';
import { FileService } from 'src/app/core/service/file.service';
import { FinancialDetailService } from '../../financial-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-financial-file',
  templateUrl: './financial-file.component.html',
  styleUrls: ['./financial-file.component.scss']
})
export class FinancialFileComponent implements OnInit {
  files:FinancialFileModel[]=[];
  request=new FinancialFileModel();
  src!:string;
  @Input() financialId!:number;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fileService:FileService,
    private financialDetailService:FinancialDetailService,
    private toastr: ToastrService
    ){}

  ngOnInit(): void {
   this.getFiles();
  }

  getFiles() { 
    this.financialDetailService
      .getAllFiles(this.financialId)
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
    this.request.FactoryFinancialId=Number(this.financialId);
    this.financialDetailService
    .createFile(this.request)
    .subscribe((res: any) => {
      this.getFiles();
      this.toastr.success("تم الحفظ");
      this.request=new FinancialFileModel();
      this.fileInput.nativeElement.value = '';

    });

  }

  deleteFile(id:number){
    this.financialDetailService
    .deleteFile(id)
    .subscribe((res: any) => {
      this.getFiles();
    });
  }
}
