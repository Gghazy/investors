import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fade } from 'src/app/shared/animation/app.animation';
import { ActualRawMaterialsService } from '../../actual-raw-materials.service';
import { ActualRawMaterial } from '../../models/actual-raw-material.model';
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
  rawMaterials: any = [];
  materials = new ResultResponse<RawMaterial>();
  search = new RawMaterialSearch();
  units!:LookUpModel[];
  x: any = [];
  src!: string;
  request = new ActualRawMaterial();
  requestFile = new ActualRawMaterialFile();
  CurrentStockQuantity_KG: number=0;
  dropdownSettings!: IDropdownSettings;
  selectedUnits:any=[];
  Months = [
    { Id: 1, month: 'يناير' },
    { Id: 2, month: 'فبراير' },
    { Id: 3, month: 'مارس' },
    { Id: 4, month: 'أبريل' },
    { Id: 5, month: 'مايو' },
    { Id: 6, month: 'يونيو' },
    { Id: 7, month: 'يوليو' },
    { Id: 8, month: 'أغسطس' },
    { Id: 9, month: 'سبتمبر' },
    { Id: 10, month: 'أكتوبر' },
    { Id: 11, month: 'نوفمبر' },
    { Id: 12, month: 'ديسمبر' },
  ];
  constructor(private route: ActivatedRoute, private service: ActualRawMaterialsService,
    private toastr: ToastrService,
    private lookUpService:LookUpService, private fileService: FileService) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
  }



  ngOnInit() {
    this.getRawMaterial();
    this.getFiles();
    this.getUnits()


    this.dropdownSettings = {
      singleSelection: true,
      idField: 'Id',
      textField: 'Name',
    //  selectAllText: 'تحديد الكل',
      //unSelectAllText: 'ازالة التحديد',
      searchPlaceholderText: 'بحث',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }


  onItemSelect(item: ActualRawMaterial) {
  //  this.request. = item.Id;
   // this.selectedProducts.push(item)
       console.log(this.selectedUnits);
      
     console.log(item.UnitId);
     item.CurrentStockQuantity_KG = item.CurrentStockQuantity *1000
  }
  onSelectAll(items: any) {
    //console.log(items);
  }

  getRawMaterial() {


    this.service
      .getRawMaterial(this.search, this.factoryId)
      .subscribe((res: any) => {
        this.rawMaterials = res.Data.Items;
        this.materials = res.Data;
        this.rawMaterials.forEach((item: any) => {
          this.x.push({
            'RawMaterialId': item.Id,
            'Name': item.Name,
            'CurrentStockQuantity_KG': 0,
            'UsedQuantity_KG': 0,
            'AttachmentId': 1,
            'Month': 0,
            'IncreasedUsageReason': 0
          })
        })
        //  console.log(this.x);
      });



  }
  getUnits(){
    this.lookUpService
      .getAllUnits()
      .subscribe((res: any) => {
      this.units = res.Data;
      console.log(res)
      });
  }
  pageChanged(data: any) {
    this.search.PageNumber = data;
    this.getRawMaterial();

  }

  getFiles() {
    this.service
      .getFiles(this.factoryId)
      .subscribe((res: any) => {
        this.files = res.Data;
        console.log(this.files)
      });
  }

  saveDocs(file: any) {
    console.log(file)
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.requestFile.AttachmentId = res.Data.Id
          this.requestFile.Path = res.Data.Path
          console.log(this.requestFile.AttachmentId)
        });

    }

  }

  onUnitSelect(newValue: any) {
  // const selectedValue = (event.target as HTMLSelectElement).value;
  const selectedValue =newValue
    console.log(selectedValue)
   
       this.CurrentStockQuantity_KG =  1000
    
  }


  save() {
    this.requestFile.Month = this.request.Month;
    this.requestFile.FactoryId = this.factoryId;

    this.service
      .AddFile(this.requestFile)
      .subscribe((res: any) => {
        this.getFiles();
        this.toastr.success("تم الحفظ");
        this.requestFile = new ActualRawMaterialFile();

      });


  }
  getFile(attachmentId: number) {
    this.service.getFiles(attachmentId).subscribe((res: any) => {
      this.src = 'data:image/jpeg;base64,' + res.Image
    });
  }

  deleteFile(id: number) {
    this.service
      .delete(id)
      .subscribe((res: any) => {
        this.getFiles();
      });
  }


  saveItems() {
    this.x.forEach((item: any) => {
      item.IncreasedUsageReason = this.request.IncreasedUsageReason;
      item.Month = this.request.Month;
      this.service
        .create(item)
        .subscribe((res: any) => {

          console.log(item)
          console.log(this.request.Month)
        });
    })
    this.toastr.success("تم الحفظ");
    this.request = new ActualRawMaterial();
  }

}

