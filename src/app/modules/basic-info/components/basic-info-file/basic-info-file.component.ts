import { Component, ElementRef, Input, Output, OnInit, ViewChild ,EventEmitter } from '@angular/core';
import { BasicFileModel } from '../../models/basic-file-model';
import { FileService } from 'src/app/core/service/file.service';
import { BasicInfoService } from '../../basic-info.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-info-file',
  templateUrl: './basic-info-file.component.html',
  styleUrls: ['./basic-info-file.component.scss']
})
export class BasicInfoFileComponent implements OnInit {
//  selectedValue: string = '0'; 
  selectedFirstItem: any = 0; 

  selectedFileForm!: FormGroup;

  files:BasicFileModel[]=[];
  request=new BasicFileModel();
  src!:string;
  fileError: string | null = null;
  addFileButton:boolean= false
  @Input() factoryId!:string;
  @Input() periodId!:string;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Output() fileStatus = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private fileService:FileService,
    private basicInfoService:BasicInfoService,
    private toastr: ToastrService
    ){}

  ngOnInit(): void {
   this.getFiles();
   this.initValue();
  }
  initValue(){
    this.request.Type=this.selectedFirstItem;
    this.fileError = '';

   }
  selectFirstItem(): void {
    this.selectedFileForm = this.formBuilder.group({
      type: [0]
    });
    this.request.Type=  this.selectedFileForm.value.type;
  }
  getFiles() {
    this.basicInfoService
      .getAll(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.files = res.Data;
        this.fileStatus.emit(this.files.length);
      });
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
    else {
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

  getFile(attachmentId:number){
    this.fileService.getImage(attachmentId).subscribe((res: any) => {
      this.src='data:image/jpeg;base64,'+res.Image
    });
  }

  save(){

    if(this.fileError!=null)
      {
        this.fileError = 'لم تقم بإختيار ملف';
        return
      }
      if (this.files.length > 10){
        this.fileError = 'الحد الاقصى للمرفقات 10';
        return
      }
    this.request.FactoryId=Number(this.factoryId);
    this.request.PeriodId=Number(this.periodId);
 
    if(this.files.length < 10){
      this.basicInfoService
      .create(this.request)
      .subscribe((res: any) => {
        this.getFiles();
        this.toastr.success("تم الحفظ");
        this.fileStatus.emit(this.files.length);

        this.request=new BasicFileModel();
        this.fileInput.nativeElement.value = '';
        this.initValue();
  
      });
    }
   

  }

  deleteFile(id:number){
    this.basicInfoService
    .delete(id)
    .subscribe((res: any) => {
      this.getFiles();
    });
  }

}
