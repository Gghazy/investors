import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FactoryRawMaterialService } from '../../factory-raw-material.service';
import { ResultResponse } from 'src/app/core/models/result-response';
import { RawMaterial } from '../../models/raw-material.model';
import { DeletesIds } from '../../models/raw-material.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { FactoryProductService } from 'src/app/modules/factory-products/factory-product.service';
import { ProductModel } from 'src/app/modules/customs-items-update/models/product-model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/core/service/file.service';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { ProductSearch } from 'src/app/modules/customs-items-update/models/product-search';
import { SearchCriteria } from 'src/app/core/models/search-criteria';
import { RawMaterialSearch } from '../../models/raw-material-search.model';
import { PeriodService } from 'src/app/modules/period/period.service';
import {ParamService}from 'src/app/core/service/paramService'

@Component({
  selector: 'app-factory-raw-materials-lists',
  templateUrl: './factory-raw-materials-lists.component.html',
  styleUrls: ['./factory-raw-materials-lists.component.scss']
})
export class FactoryRawMaterialsListsComponent implements OnInit {
  @ViewChild('closeModal') Modal!: ElementRef;
  @ViewChild('myModalClose') modalClose!:ElementRef;
  factoryId: any;
  isClosed=false;
  isShow = false;
  periodId: any;
  Id!: number;
  showKG: boolean = false
  materialCount!: number;
  materials = new ResultResponse<RawMaterial>();
  materialsList:RawMaterial[]=[];
  openSpinner=false;
  rawMaterials: any = [];
  approveStatus:boolean;
  approveStatusText:any;
  request = new RawMaterial();
  search = new SearchCriteria();
  searchRawmaterial = new RawMaterialSearch();
  selectedProducts: any = [];
  selectedItem!: any;
  ProductName: any;
  ss: any = [];
  data: any []= [];
  products12: any = [];
  ProductNameList: any = [];
  products  !: ProductModel[];
  dropdownSettings!: IDropdownSettings;
  units!: LookUpModel[];
  src!: string;
  saveSuccessful: boolean = false;
  numRows: number = 0;
  PeriodName!: string;
  year!:number;
  modalLabel!: string;
  rawMaterialDeletedList:number[]=[]
  constructor(private rawMaterialService: FactoryRawMaterialService,
    private productService: FactoryProductService,
    private lookUpService: LookUpService,
    private fileService: FileService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private paramService: ParamService,   
     private spinner: NgxSpinnerService,

    private periodService: PeriodService) 
    {
      this.factoryId = paramService.getfactoryId();
      this.periodId = paramService.getperiodId();
      this.approveStatus=paramService.getstatus()

  }

  ngOnInit() {
    if( this.factoryId==null||this.periodId==null)
      {
        this.router.navigate(['error']);
        return
      }
    this.getRawMaterial()
    
    // this.getProducts()
    // this.getUnits();
     this.getperiod()
     this.openSpinner=false
  }


  getperiod() {
    this.periodService
      .getOne(this.periodId)
      .subscribe((res: any) => {
        this.year = res.Data.Year -1;
        this.PeriodName = res.Data.PeriodName;
        
      });
  }

  edit(id: number) {
    if (id == 0) {
      this.modalLabel = 'إضافة مادة أولية'
     
    }
    else {
      this.modalLabel = 'تعديل مادة أولية'
    }
    this.Id = id
    this.isClosed=false;
  }

  deleteAll()
  {
    this.rawMaterialDeletedList.forEach((element:any) => {
    let index= this.data.findIndex(x=>x.Id== element)
    if (index !== -1) {
    
      this.data.splice(index, 1);
    }
  });
  }
  delete(id: number) {

    this.rawMaterialDeletedList.push(id);
    let index= this.data.findIndex(x=>x.Id== id)
    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }


  getUnits() {
    this.lookUpService
      .getAllUnits()
      .subscribe((res: any) => {
        this.units = res.Data;
      });
  }



  getRawMaterial() {
    debugger
    this.searchRawmaterial.PeriodId = this.periodId;

    this.rawMaterialService
      .getRawMaterial(this.searchRawmaterial, this.factoryId)
      .subscribe((res: any) => {
        if (res) {

          this.data = res.Data;
          this.deleteAll();
        //  this.materialsList=res.Data.items;
       
          console.log(this.data)
        
        }
        else {
          console.log('No content returned from server (204)');
        }
      }



      );


  }
  getFile(attachmentId: number) {
    if (attachmentId == null||attachmentId <=0) {
      this.toastr.error("لم يتم إرفاق ورقة بيانات للمادة الأولية")
    }
    else {
      this.fileService.downloadTempelete(attachmentId).subscribe((res: any) => {
        this.downloadattachment(res)
      });
    }

  }


  getImage(attachmentId: number) {
  
    if (attachmentId == null || attachmentId <= 0) {
      
      this.isShow=false
      this.src=''
      this.toastr.error("لم يتم إرفاق صورة للمادة الأولية")
     // this.modalClose.nativeElement.click(); // Close the modal

    }
    else {
      this.isShow=true
      this.fileService.getImage(attachmentId).subscribe((res: any) => {
        this.src = 'data:image/jpeg;base64,' + res.Image;
      });
    }

  }
 
  downloadattachment(data: any) {
    const blob = new Blob([data], { type: data.type });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }










  getProducts() {

    this.productService
      .getAllProducts()
      .subscribe((res: any) => {
        this.products = res.Data;
      });

  }






  closePopUp() {
   this.isClosed=true;
    this.Modal.nativeElement.click()
    this.getRawMaterial()
  }
  pageChanged(data: any) {
    this.search.PageNumber = data;
    this.getRawMaterial();

  }



  save() {
    let length=this.rawMaterialDeletedList.length;
    let count=0;
    
    if(length>0)
    {this.spinner.show("rawMatDelete");
      this.openSpinner=true
      let IdsList=new DeletesIds();
      IdsList.ids=this.rawMaterialDeletedList
      this.rawMaterialService
        .delete(IdsList)
        .subscribe((res: any) => {
          this.spinner.hide("rawMatDelete");
          if(res.IsSuccess==false)
            {
                this.toastr.error("خطأ في عملية حذف بيانات المواد الخام الأولية")
            } 
            else
            {
              this.toastr.success("تم تعديل المواد الخام");
              this.router.navigate(['/pages/factory-landing']);
            }
            this.openSpinner=false
          
        });
  
      
      /*this.rawMaterialDeletedList.forEach((element:any) => {
       
        this.rawMaterialService
        .delete(element)
        .subscribe((res: any) => {
          if(res.IsSuccess==false)
            {
                this.toastr.error("خطأ في عملية حذف بيانات المواد الخام الأولية")
            }
          count++;
          if(count==length)
          {
          
            this.toastr.success("تم حفظ المواد الأولية بنجاح");
            this.router.navigate(['/pages/factory-landing']);
          }
         
        });
  
      });*/
    }
    else
    {
      this.toastr.success("تم تعديل المواد الخام");
      this.router.navigate(['/pages/factory-landing']);
    }
  

  }

}
