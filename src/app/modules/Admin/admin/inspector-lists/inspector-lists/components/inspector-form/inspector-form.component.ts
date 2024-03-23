import { Component, EventEmitter, Output } from '@angular/core';
import { InspectorModel } from '../../models/inspector-lists.model';
import { FactoryService } from 'src/app/modules/factory/factory.service';
import { InspectorListsService } from '../../inspector-lists.service';
import { ToastrService } from 'ngx-toastr';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { LookUpService } from 'src/app/core/service/look-up.service';

@Component({
  selector: 'app-inspector-form',
  templateUrl: './inspector-form.component.html',
  styleUrls: ['./inspector-form.component.scss']
})
export class InspectorFormComponent {
  @Output() close = new EventEmitter<boolean>();
  request = new InspectorModel();
  factoryEntities:LookUpModel[]=[];
  
  constructor(
    private factoryService: FactoryService,
    private inspectorService: InspectorListsService,
    private toastr: ToastrService,
    private lookUpService: LookUpService) {}

  ngOnInit() {

    this.getFactoryEntities()
  }


  getFactoryEntities() {
    this.lookUpService
      .getAllFactoryEntities()
      .subscribe((res: any) => {
        this.factoryEntities = res.Data;
        console.log(this.factoryEntities)
      });
  }
  save() {
    console.log(this.request)
      this.inspectorService
        .create(this.request)
        .subscribe((res: any) => {
          console.log(this.request)
          this.close.emit(true);
          this.toastr.success("تم الحفظ");

        });

  }

}
