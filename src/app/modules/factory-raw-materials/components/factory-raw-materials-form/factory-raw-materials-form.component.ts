import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { fade } from 'src/app/shared/animation/app.animation';
import { FactoryRawMaterialService } from '../../factory-raw-material.service';
import { ToastrService } from 'ngx-toastr';
import { RawMaterial } from '../../models/raw-material.model';
import { FileService } from 'src/app/core/service/file.service';

@Component({
  selector: 'app-factory-raw-materials-form',
  templateUrl: './factory-raw-materials-form.component.html',
  styleUrls: ['./factory-raw-materials-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryRawMaterialsFormComponent implements OnInit {

  rawMaterials: any = [];
  factoryId: any;
  materialCount: any;
  request = new RawMaterial();
  constructor(private rawMaterialService: FactoryRawMaterialService,
    private fileService: FileService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {



    this.factoryId = this.route.snapshot.paramMap.get('id');
  }
  handleUploadClick(event: Event) {
    const targetButton = event.target as HTMLButtonElement;
    const closestDiv = targetButton.closest('div');

    if (closestDiv) {
      const fileInput = closestDiv.querySelectorAll('input')[0];

      if (fileInput) {
        fileInput.click();
      }
    }
  }

  showInput = false;

  handleSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.showInput = selectedValue === 'yes';
  }


  dropdownList: any[] = [];
  selectedItems = [];
  selectedItems1 = [];
  selectedItems2 = [];

  dropdownSettings!: IDropdownSettings;

  ngOnInit() {
    this.getRawMaterial();
    this.dropdownList = [
      { item_id: 4990, item_text: ' المنتج 1 ' },
      { item_id: 2, item_text: ' المنتج 2 ' },
      { item_id: 3, item_text: ' المنتج 3 ' },

    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'تحديد الكل',
      unSelectAllText: 'ازالة التحديد',
      searchPlaceholderText: 'بحث',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    this.request.ProductId = item.item_id;
    //console.log(item);
  }
  onSelectAll(items: any) {
    //console.log(items);
  }

  onUnitSelect(event: Event) {
    let selectedValue: any = (event.target as HTMLSelectElement).value;
    if (selectedValue == "1") {
      console.log(selectedValue);
      this.request.AverageWeightKG = selectedValue
      this.request.AverageWeightKG = selectedValue
    }
    console.log(selectedValue)
    console.log(this.request.UnitId)
  }
  getRawMaterial() {

    this.rawMaterialService
      .getRawMaterial(this.factoryId)
      .subscribe((res: any) => {

        this.rawMaterials = res.Data;
        console.log(this.rawMaterials.length)
        this.materialCount = this.rawMaterials.length;
      });


  }

  savePaper(file: any) {
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.request.PaperId = res.Data.Id
          console.log( this.request.PaperId)
        });
    }
  }
  savePhoto(file: any) {
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.request.PhotoId = res.Data.Id
          console.log(this.request.PhotoId)
        });
    }
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

 

  getImage(attachmentId: number) {
    if (attachmentId == null) {
      this.toastr.error("لا يوجد ملف");
    }
    else {
      this.fileService.getImage(attachmentId).subscribe((res: any) => {
        this.downloadattachment(res)
      });
    }

  }

  downloadattachment(data: any) {
    const blob = new Blob([data], { type: data.type });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  save() {
    this.request.FactoryId = this.factoryId;
    this.request.AttachmentId = 1;
    this.rawMaterialService
      .create(this.request)
      .subscribe((res: any) => {

        this.toastr.success("تم الحفظ");

        console.log(this.request)
      });
      
      this.request=new RawMaterial();

  }



  
}
