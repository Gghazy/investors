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
import { ActualRawMaterialSearch } from '../../models/actualRawMaterialSearch.model';
import { PeriodService } from 'src/app/modules/period/period.service';

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
  fileError: string | null = null;
  addFileButton: boolean = false

  constructor(private route: ActivatedRoute, private service: ActualRawMaterialsService,
    private toastr: ToastrService,
    private router: Router,
    private periodService: PeriodService,
    private lookUpService: LookUpService, private fileService: FileService) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }



  ngOnInit() {
    this.getRawMaterial();
    this.getFiles();
    this.getUnits()
    this.getperiod()

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

        this.PeriodName = res.Data.PeriodName;
      });
  }



  getRawMaterial() {

    this.ActualRawMaterialsearch.FactoryId = this.factoryId;
    this.ActualRawMaterialsearch.PeriodId = this.periodId;
    this.x = []
    this.service
      .getAll(this.ActualRawMaterialsearch)
      .subscribe((res: any) => {
        this.rawMaterials = res.Data.Items;
        this.materials = res.Data;
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

        this.rawMaterials.forEach((item: any) => {
          this.request.IncreasedUsageReason = item.IncreasedUsageReason
          if (item.IncreasedUsageReason > 0) {
            this.showInput = true
          }
          else {
            this.showInput = false
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
    row.CurrentStockQuantity_KG = row.CurrentStockQuantity * row.AverageWeightKG;
    row.UsedQuantity_KG = row.UsedQuantity * row.AverageWeightKG;

    if (row.UsedQuantity_KG > row.CurrentStockQuantity_KG) {
      this.showInput = true
    } else {
      this.showInput = false
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
      });
  }

  saveDocs(file: any) {
    if (file.target.files.length > 0) {
      const file1 = file.target.files[0];
      const fileType = file1.type;
      const validFileTypes = ['application/pdf'];
      if (validFileTypes.includes(fileType)) {
        this.fileError = null;

        this.fileService
          .addFile(file.target.files[0])
          .subscribe((res: any) => {
            this.requestFile.AttachmentId = res.Data.Id
            this.requestFile.Path = res.Data.Path
          });
        this.addFileButton = true
      } else {
        this.fileError = 'الرجاء رفع المستند بالصيغة الموضحة';

      }

    }

  }

  save() {
    this.requestFile.PeriodId = this.periodId;
    this.requestFile.FactoryId = this.factoryId;
    this.requestFile.Name = '';
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
          });
      })
      this.toastr.success("تم الحفظ");
      this.request = new ActualRawMaterial();
    }
  }


}

