import { Component, OnInit, ViewChild,  EventEmitter, Output, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactoryService } from 'src/app/modules/factory/factory.service';
import { InspectorListsService } from '../inspector-lists.service';
import { InspectorModel } from '../models/inspector-lists.model';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { LookUpModel } from 'src/app/core/models/look-up-model';

@Component({
  selector: 'app-inspector-lists',
  templateUrl: './inspector-lists.component.html',
  styleUrls: ['./inspector-lists.component.scss']
})
export class InspectorListsComponent  implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  @ViewChild('closeModal') Modal!: ElementRef;
  
inspectors!: InspectorModel[];
inspector=new InspectorModel();
factoryEntities:LookUpModel[]=[];
  constructor(    private route: ActivatedRoute,
    private factoryService: FactoryService,
    private inspectorService: InspectorListsService,
    private lookUpService: LookUpService) {}

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

  getData(id: number) {
   console.log(id)
   this.inspectorService
   .getOne(id)
   .subscribe((res: any) => {
     this.inspector = res.Data;
     console.log(this.inspector)
   });
   this.getFactoryEntities()
  }

  closePopUp() {
    this.Modal.nativeElement.click()
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
  }
  edit(id: number) {
    console.log(id)
   }
   getFactoryEntities() {
    this.lookUpService
      .getAllFactoryEntities()
      .subscribe((res: any) => {
        this.factoryEntities = res.Data;
        console.log(this.factoryEntities)
      });
  }
}
