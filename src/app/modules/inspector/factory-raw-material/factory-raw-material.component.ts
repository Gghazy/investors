import { Component } from '@angular/core';
import { fade } from 'src/app/shared/animation/app.animation';
import { FactoryRawMaterialService } from '../../factory-raw-materials/factory-raw-material.service';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/core/service/file.service';
import { ActivatedRoute } from '@angular/router';
import { RawMaterialSearch } from '../../factory-raw-materials/models/raw-material-search.model';
import { BasicFileModel } from '../../basic-info/models/basic-file-model';

@Component({
  selector: 'app-factory-raw-material',
  templateUrl: './factory-raw-material.component.html',
  styleUrls: ['./factory-raw-material.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryRawMaterialComponent {
  factoryId: any;
  rawMaterials: any;
  materials: any;
  search = new RawMaterialSearch();
  files: BasicFileModel[] = [];
  


  constructor(private rawMaterialService: FactoryRawMaterialService,
    private fileService: FileService,
    private toastr: ToastrService,
    private route: ActivatedRoute) {
    this.factoryId = 1;
    // this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {

    this.getRawMaterial()
    this.getFiles()
    console.log('test')
  }
  
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const closestRow = target.closest('.row');

    const showInputElement = closestRow?.querySelector('.show-input');

    if (showInputElement) {
      if (target.value === 'no') {
        showInputElement.classList.remove('d-none');
      } else {
        showInputElement.classList.add('d-none');
      }
    }
  }

  getImage(attachmentId: number) {
    if (attachmentId == null) {
      this.toastr.error("لا يوجد ملف");
    }
    else {
      this.fileService.getImage(attachmentId).subscribe((res: any) => {
        this.downloadattachment(res)
        console.log(res)
      });
    }

  }
  downloadattachment(data: any) {
    const blob = new Blob([data], { type: data.type });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
    console.log(data)
  }


  pageChanged(data: any) {
    this.search.PageNumber = data;
    this.getRawMaterial();

  }


  getRawMaterial() {

    this.rawMaterialService
      .getRawMaterial(this.search, this.factoryId)
      .subscribe((res: any) => {
        debugger;
        this.rawMaterials = res.Data.Items;
        this.materials = res.Data;
        console.log(this.rawMaterials.length)
        console.log(this.rawMaterials)

        
      });


  }

  getFiles() {
    // this.service
    //   .getFiles(this.factoryId)
    //   .subscribe((res: any) => {
    //     this.files = res.Data;
    //     console.log(this.files)
    //   });
  }

  saveDocs(file: any) {
    // console.log(file)
    // if (file.target.files.length > 0) {
    //   this.fileService
    //     .addFile(file.target.files[0])
    //     .subscribe((res: any) => {
    //       this.requestFile.AttachmentId = res.Data.Id
    //       this.requestFile.Path = res.Data.Path
    //       console.log(this.requestFile.AttachmentId)
    //     });

   // }

  }

  save() {
    // this.requestFile.Month = this.request.Month;
    // this.requestFile.FactoryId = this.factoryId;

    // this.service
    //   .AddFile(this.requestFile)
    //   .subscribe((res: any) => {
    //     this.getFiles();
    //     this.toastr.success("تم الحفظ");
    //     this.requestFile = new ActualRawMaterialFile();

    //   });


  }

  getFile(attachmentId: number) {
    // this.service.getFiles(attachmentId).subscribe((res: any) => {
    //   this.src = 'data:image/jpeg;base64,' + res.Image
  //  });
  
  }

   deleteFile(id: number) {
  
  //   // this.service
  //   //   .delete(id)
  //   //   .subscribe((res: any) => {
  //   //     this.getFiles();
  // //    });
   }



  saveItems() {
  //   this.x.forEach((item: any) => {
  //     item.IncreasedUsageReason = this.request.IncreasedUsageReason;
  //     item.Month = this.request.Month;
  //     this.service
  //       .create(item)
  //       .subscribe((res: any) => {

  //         console.log(item)
  //         console.log(this.request.Month)
  //       });
  //   })
  //   this.toastr.success("تم الحفظ");
  //   this.request = new ActualRawMaterial();
 }



}
