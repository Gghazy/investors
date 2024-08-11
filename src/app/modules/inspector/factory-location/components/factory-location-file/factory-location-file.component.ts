import { Component, ElementRef, Input, OnInit, ViewChild ,Output,EventEmitter} from '@angular/core';
import { FileService } from 'src/app/core/service/file.service';
import { InspectorFactoryLocationService } from '../../factory-location.service';
import { FactoryLocationFileModel } from '../../models/factory-location-file-model.model';
import { FactoryLocationService } from 'src/app/modules/factory-location/factory-location.service';
import { ToastrService } from 'ngx-toastr';
import {ParamService}from 'src/app/core/service/paramService'


@Component({
  selector: 'app-factory-location-file',
  templateUrl: './factory-location-file.component.html',
  styleUrls: ['./factory-location-file.component.scss']
})
export class FactoryLocationFileComponent implements OnInit {
  src!: string;
  files: any;
  InspectorsLocationfiles: any;
  fileError: string | null = null;
  addFileButton: boolean = false
  @Input() factoryId!: string;
  @Input() periodId!: string;
  factoryLocationId!: number;
  Inspectorsfiles!: any
  request = new FactoryLocationFileModel()
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  @ViewChild('photoModal') Modal!: ElementRef;
  @Output() close = new EventEmitter<boolean>(); 

  selectedFirstItem: any = 1; 
  inspectorApproved=false;

  constructor(private fileService: FileService,
    private InspectorService: InspectorFactoryLocationService,
    private factoryLocationService: FactoryLocationService,
    private toastr: ToastrService,
    private paramService: ParamService

  ) {
    this.inspectorApproved=paramService.getInspectorStatus()

  }
  ngOnInit(): void {
    if( this.factoryId==null||this.periodId==null)
      {
        return
      }
    this.getFiles();
    this.getInspectorsFiles()
    this.initValue();

  }
  initValue(){
    this.request.Type=this.selectedFirstItem;
    this.fileError = '';
   

   }
  getFiles() {
    this.request.FactoryId = parseInt(this.factoryId)
    this.request.PeriodId = parseInt(this.periodId)
    this.factoryLocationService
      .getAllFiles(this.request.FactoryId,this.request.PeriodId)
      .subscribe((res: any) => {
        this.files = res.Data;
      });
  }
  getInspectorsFiles() {
    let factoryid = parseInt(this.factoryId)
    let periodId = parseInt(this.periodId)
    this.InspectorService
      .getFiles(factoryid, periodId)
      .subscribe((res: any) => {
        this.Inspectorsfiles = res.Data;

      });
  }
  save() {
    if(this.fileError!=null)
      {
        this.fileError = 'لم تقم بإختيار ملف';
        return
      }
      if (this.files.length > 10){
        this.fileError = 'الحد الاقصى للمرفقات 10';
        return
      }

    this.request.FactoryId = parseInt(this.factoryId)
    this.request.PeriodId = parseInt(this.periodId)
    if(this.files.length < 10){
    this.request.Name =''
    this.InspectorService
      .CreateFiles(this.request)
      .subscribe((res: any) => {
        this.getInspectorsFiles()
        this.toastr.success("تم ارفاق الملف");
        // this.fileStatus.emit(this.files.length);
         this.request=new FactoryLocationFileModel()
         this.fileInput.nativeElement.value = '';
         this.initValue();
      });
    }

    this.request = new FactoryLocationFileModel()
    this.fileInput.nativeElement.value = '';
  }
  saveFile(file: any) {

    const input = file.target as HTMLInputElement;
   
    if (!input.files || input.files.length === 0) {
      this.fileError = 'لم تقم بإختيار ملف';
      console.error('لم تقم بإختيار ملف');
      return;
    }
    const fileImage = input.files[0];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
    if (fileImage.size > maxFileSize) {
      // If the file is larger than 5 MB
      this.fileError = ' الرجاء رفع مستند بحجم أقل من  5MB  ';
            console.error(' 5MB حجم الملف أكبر من');
    }
    else  {
      const file1 = file.target.files[0];
      const fileType = file1.type;

      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        this.fileError = null;

        this.fileService
          .addFile(file.target.files[0])
          .subscribe((res: any) => {
            this.request.AttachmentId = res.Data.Id
          });
          this.addFileButton = true
      }
     else {
      this.fileError = 'الرجاء رفع المستند بالصيغة الموضحة';

    }
  }
}
  getFile(attachmentId: number) {
    
    this.fileService.getImage(attachmentId).subscribe((res: any) => {
     if(res==null)
     {
     
     }

      else
     this.src = 'data:image/jpeg;base64,' + res.Image;
    });
  }

  closePopUp() {
    this.Modal.nativeElement.click()
    this.close.emit(true);
  }
  deleteFile(id: number) {
    this.InspectorService
      .deleteFile(id)
      .subscribe((res: any) => {
        this.getInspectorsFiles();

      });
  }
}