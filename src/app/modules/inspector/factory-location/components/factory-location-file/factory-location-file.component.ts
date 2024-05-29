import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileService } from 'src/app/core/service/file.service';
import { InspectorFactoryLocationService } from '../../factory-location.service';
import { FactoryLocationFileModel } from '../../models/factory-location-file-model.model';
import { FactoryLocationService } from 'src/app/modules/factory-location/factory-location.service';

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
  constructor(private fileService: FileService,
    private InspectorService: InspectorFactoryLocationService,
    private factoryLocationService: FactoryLocationService,
  ) {

  }
  ngOnInit(): void {
    this.getFiles();
    this.getInspectorsFiles()
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
    this.request.FactoryId = parseInt(this.factoryId)
    this.request.PeriodId = parseInt(this.periodId)
    this.request.Name=''
    console.log(this.request)
    this.InspectorService
      .CreateFiles(this.request)
      .subscribe((res: any) => {
        this.getInspectorsFiles()
      });

    this.request = new FactoryLocationFileModel()
    this.fileInput.nativeElement.value = '';
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
      }
      this.addFileButton = true
    } else {
      this.fileError = 'الرجاء رفع المستند بالصيغة الموضحة';

    }
  }
  getFile(attachmentId: number) {
    this.fileService.getImage(attachmentId).subscribe((res: any) => {
      this.src = 'data:image/jpeg;base64,' + res.Image;
    });
  }


  deleteFile(id: number) {
    this.InspectorService
      .deleteFile(id)
      .subscribe((res: any) => {
        this.getInspectorsFiles();

      });
  }
}