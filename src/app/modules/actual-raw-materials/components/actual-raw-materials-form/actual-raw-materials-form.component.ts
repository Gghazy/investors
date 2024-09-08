import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fade } from 'src/app/shared/animation/app.animation';
import { ActualRawMaterialsService } from '../../actual-raw-materials.service';
import { ActualRawMaterial } from '../../models/actual-raw-material.model';
import { ActualRawMaterialstatus } from '../../models/actual-raw-material.model';

import { ToastrService } from 'ngx-toastr';
import { BasicFileModel } from 'src/app/modules/basic-info/models/basic-file-model';
import { RawMaterialSearch } from 'src/app/modules/factory-raw-materials/models/raw-material-search.model';
import { RawMaterial } from 'src/app/modules/factory-raw-materials/models/raw-material.model';
import { ResultResponse } from 'src/app/core/models/result-response';
import { ActualRawMaterialFile } from '../../models/actual-raw-material-file.model';
import { FileService } from 'src/app/core/service/file.service';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ActualRawMaterialSearch } from '../../models/actualRawMaterialSearch.model';
import { PeriodService } from 'src/app/modules/period/period.service';
import {ParamService}from 'src/app/core/service/paramService'

@Component({
  selector: 'app-actual-raw-materials-form',
  templateUrl: './actual-raw-materials-form.component.html',
  styleUrls: ['./actual-raw-materials-form.component.scss'],
  animations: [
    fade
  ]
})
export class ActualRawMaterialsFormComponent implements OnInit {
  files: BasicFileModel[] = [];
  factoryId: any;
  periodId: any;
  showInput: boolean = false
  rawMaterials: any = [];
  materials = new ResultResponse<RawMaterial>();
  search = new RawMaterialSearch();
  ActualRawMaterialsearch = new ActualRawMaterialSearch();
  units!: LookUpModel[];
  x: any = [];
  src!: string;
  IsComplete=0;
  lockSaveItem=false;
  isNewData: boolean = false;
  request = new ActualRawMaterial();
  requestFile = new ActualRawMaterialFile();
  CurrentStockQuantity_KG: number = 0;
  dropdownSettings!: IDropdownSettings;
  selectedUnits: any = [];
  selectedItemId: number | null = null;
  selectedX: number = 0;
  sign: string | null = null;
  PeriodName!: string
  year!:number;
  fileError: string | null = null;
  addFileButton: boolean = true
  fileSelected: boolean = false
  lockUploadfile=false;
  approveStatus:boolean;
  approveStatusText:any;
  statusList:ActualRawMaterialstatus[]=[]
  reasonList: any[] = [
    { Id: "1", Name: ' شراء معدات جديدة' },
    { Id: "2", Name: 'زيادة خطوط الإنتاج'},
    { Id: "3", Name: 'زيادة العمالة'},
    { Id: "4", Name: 'أخرى'}
];
selectedReason:any = { Id: "1"} 
  constructor(private route: ActivatedRoute, private service: ActualRawMaterialsService,
    private toastr: ToastrService,
    private router: Router,
    private periodService: PeriodService,
    private paramService: ParamService,

    private lookUpService: LookUpService, private fileService: FileService) {
      this.factoryId = paramService.getfactoryId();
      this.periodId = paramService.getperiodId();
      this.approveStatus=paramService.getstatus()
  }



  ngOnInit() {
    if( this.factoryId==null||this.periodId==null)
      {
        this.router.navigate(['error']);
        return
      }
    this.getRawMaterial();
    this.getFiles();
    this.getUnits()
    this.getperiod()
    this.fileSelected = false;
    
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'Id',
      textField: 'Name',
      searchPlaceholderText: 'بحث',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  getperiod() {
    this.periodService
      .getOne(this.periodId)
      .subscribe((res: any) => {
        this.year = res.Data.Year -1;
        this.PeriodName = res.Data.PeriodName;
      });
  }



  getRawMaterial() {

    this.ActualRawMaterialsearch.FactoryId = this.factoryId;
    this.ActualRawMaterialsearch.PeriodId = this.periodId;
    this.search.PeriodId = this.periodId;
    this.x = []
    this.service
      .getAll(this.ActualRawMaterialsearch)
      .subscribe((res: any) => {
        this.rawMaterials = res.Data;
        this.materials = res.Data;
        
        if (this.rawMaterials.length == 0) {
          this.toastr.warning("لم يتم إنشاء  المواد الأولية ")
         /* this.isNewData = true
          this.service
            .getRawMaterial(this.search, this.factoryId)
            .subscribe((res: any) => {
              this.rawMaterials = res.Data;
              this.materials = res.Data;


              this.rawMaterials.forEach((item: any) => {

                this.x.push({
                  'RawMaterialId': item.Id,
                  'Name': item.Name,
                  'CurrentStockQuantity_KG': 0,
                  'UsedQuantity_KG': 0,
                  'AttachmentId': 1,

                  'UsedQuantity': 0,
                  'CurrentStockQuantity': 0,
                  'StockUnitId': item.UnitId,
                  'UsageUnitId': item.UnitId,
                  'AverageWeightKG': item.AverageWeightKG,

                })
              })
            });
       */
          }


        this.showInput = false;
        this.rawMaterials.forEach((item: any) => {
         
          this.request.IncreasedUsageReason = item.IncreasedUsageReason
         
          if (item.IncreasedUsageReason > 0) {
            this.showInput = true
          }

          this.x.push({
            'Id': item.Id,
            'RawMaterialId': item.RawMaterialId.Id,
            'periodId': item.PeriodId,
            'Name': item.RawMaterialId.Name,
            'CurrentStockQuantity_KG': item.CurrentStockQuantity_KG,
            'UsedQuantity_KG': item.UsedQuantity_KG,
            'AttachmentId': 1,
            'UsedQuantity': item.UsedQuantity,
            'CurrentStockQuantity': item.CurrentStockQuantity,
            'StockUnitId': item.StockUnitId,
            'UsageUnitId': item.UsageUnitId,
            'AverageWeightKG': item.RawMaterialId.AverageWeightKG,

          })

        })
      });
  }


  onSelectionChange(row: ActualRawMaterial) {
   
   if (row.AverageWeightKG==0)
   { 
    this.toastr.error("الرجاء التاكد من معلومات المادة الأولية في شاشة بيانات المواد الأولية");
   
  }
  else
  {
   row.CurrentStockQuantity_KG = row.CurrentStockQuantity * row.AverageWeightKG;
   row.UsedQuantity_KG = row.UsedQuantity * row.AverageWeightKG;
    if (row.UsedQuantity_KG > row.CurrentStockQuantity_KG) {
      let index= this.statusList.findIndex(x=>x.Id== row.Id)
  
      if (index !== -1) {
        this.statusList.splice(index, 1);
      }
      else{
      let actRaw=new ActualRawMaterialstatus()
      actRaw.Id=row.Id;
      actRaw.Valid=true;
      this.statusList.push(actRaw)
      }
      this.showInput = true
      this.request.IncreasedUsageReason="4"
     
    } else {
      let index= this.statusList.findIndex(x=>x.Id== row.Id)
  
      if (index !== -1) {
        this.statusList.splice(index, 1);
      }
      let st=false;
      this.statusList.forEach(element => {
        if(element.Valid)
        {
          st=element.Valid;
        }
      });
      this.showInput = st
    }
  }




    // }

  }

  getUnits() {
    this.lookUpService
      .getAllUnits()
      .subscribe((res: any) => {
        this.units = res.Data;
      });
  }
  pageChanged(data: any) {
    this.ActualRawMaterialsearch.PageNumber = data;
    this.getRawMaterial()
  }

  getFiles() {
    this.service
      .getFiles(this.factoryId, this.periodId)
      .subscribe((res: any) => {
        this.files = res.Data;
          this.requestFile.AttachmentId = res.Data.Id
            this.requestFile.Path = res.Data.Path
      });
  }

  saveDocs(file: any) {
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
    else {
      const file1 = file.target.files[0];
      const fileType = file1.type;
      const validFileTypes = ['application/pdf'];
      if (validFileTypes.includes(fileType)) {
        this.fileError = null;
        this.fileSelected = true

        this.fileService
          .addFile(file.target.files[0])
          .subscribe((res: any) => {
            this.requestFile.AttachmentId = res.Data.Id
            this.requestFile.Path = res.Data.Path
            this.addFileButton = false

          });
      } else {
        this.fileError = 'الرجاء رفع المستند بالصيغة الموضحة';

      }

    }

  }

  save() {
    if (!(this.fileSelected)) {
      this.fileError = 'لم تقم بإختيار ملف';
      return
    }
    if (this.files.length > 10){
      this.fileError = 'الحد الاقصى للمرفقات 10';
      return
    }
  
    this.requestFile.PeriodId = this.periodId;
    this.requestFile.FactoryId = this.factoryId;
    this.requestFile.Name = '';
    if (this.files.length < 10) {
      this.lockUploadfile=true;

      this.service
        .AddFile(this.requestFile)
        .subscribe((res: any) => {
          this.getFiles();
          this.lockUploadfile=false;
          this.toastr.success("تم تحميل المستندات المرفقة");
          this.addFileButton = true

          this.requestFile = new ActualRawMaterialFile();
          // this.router.navigate(['/pages/factory-landing/'+this.factoryId+'/'+this.periodId]);


        });
    }
  //  this.saveItems();


  }
  getFile(attachmentId: number) {
    if (attachmentId == null) {
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
    window.open(url);
  }

  deleteFile(id: number) {
    this.service
      .delete(id)
      .subscribe((res: any) => {
        this.getFiles();
      });
  }
  setReasonValue(event: Event) {
    const selectedValue = (event.target as HTMLInputElement).value;
    this.request.IncreasedUsageReason=selectedValue;
    
  }
  
  saveItems() {

    if (this.fileError) {
      this.toastr.error("الرجاء التحقق من البيانات المدخلة")
      return
    }
    if(this.lockUploadfile)
      {
        this.toastr.error("الرجاء الإنتظار قليلا لأكنمال تحميل الملف المرفق")
        return
        
      }
    if(this.lockSaveItem)
      {
          this.toastr.error("عملية حفظ/تعديل المواد الخام الأولية قيد التنفيذ")
          return
          
      }
      if(!this.showInput)
        this.request.IncreasedUsageReason="0";
    
    if (this.isNewData == true) {

      this.IsComplete=0;
      this.lockSaveItem=true
      let count= this.x.length;
      this.x.forEach((item: any) => {
        item.periodId = this.periodId;
        item.IncreasedUsageReason = this.request.IncreasedUsageReason;
        if(item.AverageWeightKG==0)
          count--;
        else
        this.service
          .create(item)
          .subscribe((res: any) => {
            if(res.IsSuccess==false)
            {
                this.toastr.error("خطأ في عملية تعديل بيانات المواد الخام الأولية")
            }
            this.IsComplete=this.IsComplete+1;
            if(this.IsComplete==count)
              {
                this.lockSaveItem=false
              this.toastr.success(" تم تعديل بيانات المواد الخام الأولية بنجاح");
              this.router.navigate(['/pages/factory-landing']);
      
              }
          });
      })

      
        this.request = new ActualRawMaterial();
    }
    else {
      this.IsComplete=0;
      let count= this.x.length;
      this.lockSaveItem=true;
     
      this.x.forEach((item: any) => {
        item.IncreasedUsageReason = this.request.IncreasedUsageReason;
        if(item.AverageWeightKG==0)
        {
          count--;
        }
        else
        this.service
          .update(item)
          .subscribe((res: any) => {
            if(res.IsSuccess==false)
              {
                  this.toastr.error("خطأ في عملية تعديل بيانات المواد الخام الأولية")
                  this.lockSaveItem=false;

              }
            this.IsComplete=this.IsComplete+1;
            if(this.IsComplete==count)
              {
                this.lockSaveItem=false;
              this.toastr.success(" تم تعديل بيانات المواد الخام الأولية بنجاح");
              this.router.navigate(['/pages/factory-landing']);
      
              }

          });

      })
      if(this.lockSaveItem&& count==0)
      {
        this.toastr.success(" تم حفظ المواد الخام الأولية بنجاح");
        this.router.navigate(['/pages/factory-landing']);

      }

      

      this.request = new ActualRawMaterial();
    }
  }


}

