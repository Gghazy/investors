import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileService } from 'src/app/core/service/file.service';
import { InspectorActualProductionAndDesignedCapacityService } from '../../actual-production-and-designed-capacity.service';
import { ActualProductionAndDesignedCapacityService } from 'src/app/modules/actual-production-and-designed-capacity/actual-production-and-designed-capacity.service';
import { ActualProductionAndDesignedCapacityFileModel } from '../../models/actual-production-and-designed-capacity-file-model.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ReasonService } from 'src/app/modules/actual-production-and-designed-capacity/reason.service';

@Component({
  selector: 'app-actual-production-and-designed-capacity-file',
  templateUrl: './actual-production-and-designed-capacity-file.component.html',
  styleUrls: ['./actual-production-and-designed-capacity-file.component.scss']
})
export class ActualProductionAndDesignedCapacityFileComponent implements OnInit {
  src!: string;
  files: any;
  userId: any;
  Inspectorsfiles: any;
  @Input() factoryId!: number;
  @Input() periodId!: number;
  request = new ActualProductionAndDesignedCapacityFileModel()
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(private fileService: FileService,
    private ActualProductionService: InspectorActualProductionAndDesignedCapacityService,
    private FactoryService: ActualProductionAndDesignedCapacityService,
    private shared: SharedService,
    private reasonService: ReasonService,

  ) {

  } ngOnInit(): void {
    this.userId = this.shared.getUserRole();
    this.getFiles();
    this.getInspectorsFiles()
  }
  getFiles() {
    this.reasonService
      .getAllFiles(this.factoryId, this.periodId)
      .subscribe((res: any) => {
        this.files = res.Data;
      });
  }
  getInspectorsFiles() {
    this.ActualProductionService
      .getFiles(this.factoryId, this.periodId, this.userId)
      .subscribe((res: any) => {
        this.Inspectorsfiles = res.Data;
        console.log(res)
      });
  }


  save() {
    this.request.FactoryId=this.factoryId;
    this.request.PeriodId=this.periodId;
    this.ActualProductionService
      .CreateFiles(this.request)
      .subscribe((res: any) => {
        this.getInspectorsFiles()
      });
    //this.request= new BasicInfoFileModel()
    this.fileInput.nativeElement.value = '';
  }
  saveFile(file: any) {
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.request.AttachmentId = res.Data.Id

        });
    }
  }
  getFile(attachmentId: number) {
    this.fileService.downloadTempelete(attachmentId).subscribe((res: any) => {
      this.downloadattachment(res)
    });
  }
  downloadattachment(data: any) {
    const blob = new Blob([data], { type: data.type });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }


  deleteFile(id: number) {
    this.ActualProductionService
    .deleteFile(id)
    .subscribe((res: any) => {
      this.getInspectorsFiles();
    });
  }
}

