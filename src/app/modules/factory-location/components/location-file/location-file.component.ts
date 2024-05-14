import { Component, Input, OnInit } from '@angular/core';
import { LocationFileModel } from '../../models/location-file-model';
import { FileService } from 'src/app/core/service/file.service';
import { FactoryLocationService } from '../../factory-location.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location-file',
  templateUrl: './location-file.component.html',
  styleUrls: ['./location-file.component.scss']
})
export class LocationFileComponent implements OnInit {
  factoryId: any;
  files: LocationFileModel[] = [];
  request = new LocationFileModel();
  src!: string;
  @Input() factoryLocationId!: number;
  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private factoryLocationService: FactoryLocationService,
    private toastr: ToastrService
  ){ 
    this.factoryId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles() {
    this.factoryLocationService
      .getAllFiles(this.factoryId)
      .subscribe((res: any) => {
        this.files = res.Data;
      });
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

  getFile(attachmentId: number){
    this.fileService.getImage(attachmentId).subscribe((res: any) => {
     this.src='data:image/jpeg;base64,'+res.Image;
    });
  }
  save(){
    this.request.FactoryLocationId = this.factoryLocationId;
    this.request.FactoryId = this.factoryId;
    this.request.Name = "";
    console.log(this.request)
    this.factoryLocationService
      .createFile(this.request)
      .subscribe((res: any) => {
        this.getFiles();
        this.toastr.success("تم الحفظ");
        this.request = new LocationFileModel();
      });

  }

  deleteFile(id: number){
    this.factoryLocationService
      .deleteFile(id)
      .subscribe((res: any) => {
        this.getFiles();
      });
  }
}
