import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactoryService } from 'src/app/modules/factory/factory.service';
import { InspectorListsService } from '../inspector-lists.service';
import { InspectorModel } from '../models/inspector-lists.model';
import { ResultResponse } from 'src/app/core/models/result-response';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { LookUpModel } from 'src/app/core/models/look-up-model';

@Component({
  selector: 'app-inspector-lists',
  templateUrl: './inspector-lists.component.html',
  styleUrls: ['./inspector-lists.component.scss']
})
export class InspectorListsComponent  implements OnInit {
inspectors!: InspectorModel[];

  constructor(    private route: ActivatedRoute,
    private factoryService: FactoryService,
    private inspectorService: InspectorListsService,) {}

  ngOnInit() {
   this.getInspectors()
  }

  getInspectors(){
    this.inspectorService
    .getAll()
    .subscribe((res: any) => {
      this.inspectors = res.Data;
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
  }

}
