import { Component, Input, OnInit } from '@angular/core';
import { LocationFileModel } from '../../models/location-file-model';
import { FileService } from 'src/app/core/service/file.service';
import { FactoryLocationService } from '../../factory-location.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location-file',
  templateUrl: './location-file.component.html',
  styleUrls: ['./location-file.component.scss']
})
export class LocationFileComponent implements OnInit {
  factoryId: any;
  periodId: any;
  files: LocationFileModel[] = [];
  request = new LocationFileModel();
  src!: string;
  @Input() factoryLocationId!: number;
  fileError: string | null = null;
  addFileButton:boolean= false
  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private factoryLocationService: FactoryLocationService,
    private toastr: ToastrService
  ){ 
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }

  ngOnInit(): void {
    this.getFiles();
    this.request.Type='1'
  }

  getFiles() {
    this.factoryLocationService
      .getAllFiles(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.files = res.Data;
      });
  }

  saveFile(file: any) {
    if (file.target.files.length > 0) {
      const file1 = file.target.files[0];
      const fileType = file1.type;

      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        this.fileError = null;

        this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.request.AttachmentId = res.Data.Id
         
        });
        this.addFileButton =true
      } else {
        this.fileError = 'الرجاء رفع المستند بالصيغة الموضحة';
        
      }
    
    }
   
  }

  getFile(attachmentId: number){
    this.fileService.getImage(attachmentId).subscribe((res: any) => {
     this.src='data:image/jpeg;base64,'+res.Image;
    });
  }
  save(){
    this.request.FactoryLocationId = this.factoryLocationId;
    this.request.FactoryId = this.factoryId;
    this.request.PeriodId = this.periodId;
    this.request.Name = "";
    console.log(this.request)
    this.factoryLocationService
      .createFile(this.request)
      .subscribe((res: any) => {
        this.getFiles();
        this.toastr.success("تم الحفظ");
        this.request = new LocationFileModel();
      });

  }

  deleteFile(id: number){
    this.factoryLocationService
      .deleteFile(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.getFiles();
        this.toastr.success("تم الحذف");
      });
  }
}
