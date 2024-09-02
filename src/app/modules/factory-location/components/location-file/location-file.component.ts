import { Component, Input, OnInit , ViewChild ,Output,EventEmitter ,ElementRef} from '@angular/core';
import { LocationFileModel } from '../../models/location-file-model';
import { FileService } from 'src/app/core/service/file.service';
import { FactoryLocationService } from '../../factory-location.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {ParamService}from 'src/app/core/service/paramService'

@Component({
  selector: 'app-location-file',
  templateUrl: './location-file.component.html',
  styleUrls: ['./location-file.component.scss']
})
export class LocationFileComponent implements OnInit {
  selectedFirstItem: any = 1; 
  basicInfiFileDeletedList:number[]=[]
  basicInfiFileAddedList:number[]=[]
  @Output() DeletedfileIds = new EventEmitter<any>();
  @Output() AddedfileIds = new EventEmitter<any>();
  fileSizeError = false;

  factoryId: any;
  periodId: any;
  files: LocationFileModel[] = [];
  request = new LocationFileModel();
  src!: string;
  @Input() factoryLocationId!: number;
  @Input() approveStatusText!:string;
  approveStatus:boolean=false;
  @ViewChild('fileInputLoc') fileInputLoc!: ElementRef;
  @Output() fileStatusLoc = new EventEmitter<any>();

  fileError: string | null = null;
  addFileButton:boolean= false
  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private factoryLocationService: FactoryLocationService,
    private toastr: ToastrService,
    private paramService: ParamService,

  ){ 
    this.factoryId = paramService.getfactoryId();
    this.periodId = paramService.getperiodId();
    this.approveStatus=paramService.getstatus()

  }

  ngOnInit(): void {
    if( this.factoryId==null||this.periodId==null)
      {
        return
      }
    this.getFiles();
    this.initValue();

    
  }
 initValue(){
  
  this.request.Type=this.selectedFirstItem;
  this.fileError = '';

 }
  getFiles() {
    this.factoryLocationService
      .getAllFiles(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.files = res.Data;
        this.deleteAll();
        this.fileStatusLoc.emit(this.files.length);

      });
  }
  deleteAll()
  {
  
    this.basicInfiFileDeletedList.forEach((element:any) => {
    let index= this.files.findIndex(x=>x.Id== element)
    if (index !== -1) {
      this.files.splice(index, 1);
    }
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
      this.fileError = ' 5MB حجم الملف أكبر من';
            console.error(' 5MB حجم الملف أكبر من');
    }
    else{
      const file1 = file.target.files[0];
      const fileType = file1.type;

      if (fileType === 'image/png' || fileType === 'image/jpeg' ||fileType === 'application/pdf') {
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
    if(this.fileError!=null)
      {
        this.fileError = 'لم تقم بإختيار ملف';
        return
      }
      if (this.files.length > 10){
        this.fileError = 'الحد الاقصى للمرفقات 10';
        return
      }
   
    this.request.FactoryLocationId = this.factoryLocationId;
    this.request.FactoryId = this.factoryId;
    this.request.PeriodId = this.periodId;
    this.request.Name = "";

    console.log(this.request)
    if(this.files.length < 10){
    this.factoryLocationService
      .createFile(this.request)
      .subscribe((res: any) => {
        if(res.IsSuccess==false)
          {
            this.toastr.error("خطأ في  ارفاق الملف");
          }
          else
          {
            this.basicInfiFileAddedList.push(res.Data.Id)
            this.AddedfileIds.emit( this.basicInfiFileAddedList);
        this.getFiles();
        this.toastr.success("تم الحفظ");
        this.request = new LocationFileModel();
        this.fileInputLoc.nativeElement.value = '';
        this.initValue();
          }

      });
    }
  }

  deleteFile(id: number){
    this.basicInfiFileDeletedList.push(id);
    this.DeletedfileIds.emit( this.basicInfiFileDeletedList);

    let index= this.files.findIndex(x=>x.Id== id)
    if (index !== -1) {
      this.files.splice(index, 1);
    }
    this.fileStatusLoc.emit(this.files.length);

   /*this.factoryLocationService
      .deleteFile(id)
      .subscribe((res: any) => {
        this.getFiles();
        this.toastr.success("تم الحذف");
      });*/
  }
}
