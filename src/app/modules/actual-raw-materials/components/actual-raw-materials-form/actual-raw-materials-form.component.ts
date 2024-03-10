import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import * as convert from 'convert-units';

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
  rawMaterials: any = [];
  materials = new ResultResponse<RawMaterial>();
  search = new RawMaterialSearch();
  units!: LookUpModel[];
  x: any = [];
  src!: string;
  isNewData: boolean = false;
  request = new ActualRawMaterial();
  requestFile = new ActualRawMaterialFile();
  CurrentStockQuantity_KG: number = 0;
  dropdownSettings!: IDropdownSettings;
  selectedUnits: any = [];
  selectedItemId: number | null = null;
  selectedX: number = 0;
  sign: string | null = null;


  constructor(private route: ActivatedRoute, private service: ActualRawMaterialsService,
    private toastr: ToastrService,
    private router: Router,
    private lookUpService: LookUpService, private fileService: FileService) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }



  ngOnInit() {
    this.getRawMaterial();
    this.getFiles();
    this.getUnits()


    this.dropdownSettings = {
      singleSelection: true,
      idField: 'Id',
      textField: 'Name',
      searchPlaceholderText: 'بحث',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }





  getRawMaterial() {




    this.service
      .getByFactory(this.factoryId, this.periodId)
      .subscribe((res: any) => {
        this.rawMaterials = res.Data;
        this.materials = res.Data;


       // console.log(res)
        if (this.rawMaterials.length == 0) {
          this.isNewData = true
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

                  'UsedQuantity': 0,
                  'CurrentStockQuantity': 0,
                  'StockUnitId': item.UnitId,
                  'UsageUnitId': item.UnitId,
                  'AverageWeightKG': item.AverageWeightKG,

                })
              })
            });
        }

       // console.log(this.rawMaterials)

        this.rawMaterials.forEach((item: any) => {
          this.request.IncreasedUsageReason = item.IncreasedUsageReason
         // console.log(item)
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
   // console.log(this.isNewData)
  }


  onSelectionChange(row: ActualRawMaterial) {
  //  console.log(row)
    // if (row.UsageUnitId == 11) {
    //   row.CurrentStockQuantity_KG = row.CurrentStockQuantity
    // }
    // if (row.StockUnitId == 11) {
    //   row.CurrentStockQuantity_KG = row.CurrentStockQuantity
    // }
    // if (row.StockUnitId != 11 || row.UsageUnitId != 15) {
      row.CurrentStockQuantity_KG = row.CurrentStockQuantity * row.AverageWeightKG;
       row.UsedQuantity_KG = row.UsedQuantity * row.AverageWeightKG;

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
    this.search.PageNumber = data;
    this.getRawMaterial();

  }

  getFiles() {
    this.service
      .getFiles(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.files = res.Data;
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
        });

    }

  }

  save() {
    this.requestFile.PeriodId = this.periodId;
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
    console.log(data)
  }

  deleteFile(id: number) {
    this.service
      .delete(id)
      .subscribe((res: any) => {
        this.getFiles();
      });
  }


  saveItems() {

    if (this.isNewData == true) {
    
      this.x.forEach((item: any) => {
        item.periodId = this.periodId;
        item.IncreasedUsageReason = this.request.IncreasedUsageReason;

        this.service
          .create(item)
          .subscribe((res: any) => {
            this.router.navigate(['/pages/factory-landing', this.factoryId, this.periodId]);
          ///  console.log(item)
          });
      })
      this.toastr.success("تم الحفظ");
      this.request = new ActualRawMaterial();
    }
    else {
     
      this.x.forEach((item: any) => {
        item.IncreasedUsageReason = this.request.IncreasedUsageReason;

        this.service
          .update(item)
          .subscribe((res: any) => {
            this.router.navigate(['/pages/factory-landing', this.factoryId, this.periodId]);
          //  console.log(item)
          });
      })
      this.toastr.success("تم الحفظ");
      this.request = new ActualRawMaterial();
    }
  }


}

