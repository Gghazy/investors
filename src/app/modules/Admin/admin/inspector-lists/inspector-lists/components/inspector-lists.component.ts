import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactoryService } from 'src/app/modules/factory/factory.service';
import { InspectorListsService } from '../inspector-lists.service';
import { InspectorModel } from '../models/inspector-lists.model';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { ToastrService } from 'ngx-toastr';
import { FactorySearch } from 'src/app/modules/factory/models/factory-search';

@Component({
  selector: 'app-inspector-lists',
  templateUrl: './inspector-lists.component.html',
  styleUrls: ['./inspector-lists.component.scss']
})
export class InspectorListsComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  @ViewChild('closeModal') Modal!: ElementRef;
  Allfactories: any[] = [];
  search = new FactorySearch()
  inspectors!: InspectorModel[];
  inspector = new InspectorModel();
  factoryEntities: LookUpModel[] = [];
  InspectorFactories:any
    constructor(private route: ActivatedRoute,
    private factoryService: FactoryService,
    private inspectorService: InspectorListsService,
    private lookUpService: LookUpService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getInspectors()
    this.getFactory()
  }
  addFactory(FactoryId: number) {
    console.log(FactoryId)
    //  let factory= this.Allfactories.find(x=>x.Id== FactoryId)
    //    this.factories.push(FactoryId)

    //    this.factoriesAssigned.push(factory)
    //   console.log(this.factories)
    //   console.log(this.factoriesAssigned)
  }
  getInspectors() {
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
      this.getInspectorFactories(id)
    this.getFactoryEntities()
  }

  getInspectorFactories(id: number) {
    this.inspectorService
      .getInspectorFactories(id)
      .subscribe((res: any) => {
this.InspectorFactories = res.Data
      })
  }
  getFactory() {

    this.factoryService
      .getAllPagination(this.search)
      .subscribe((res: any) => {
        this.Allfactories = res.Data.Items
        console.log(res)
      })
  }
  closePopUp() {
    this.Modal.nativeElement.click()
    this.getInspectors()
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
  }
  edit(id: number) {
    console.log(id)
  }

  Update() {
    this.inspectorService
      .update(this.inspector)
      .subscribe((res: any) => {
        console.log(this.inspector)
        this.closePopUp()
        this.toastr.success("تم التعديل");

      });
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
