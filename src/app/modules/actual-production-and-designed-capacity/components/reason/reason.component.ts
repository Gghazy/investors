import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { ReasonService } from '../../reason.service';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { ReasonModel } from '../../models/reason-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.scss']
})
export class ReasonComponent implements OnInit, OnChanges {

  @Input() monthId!: number;
  @Input() factoryId!: number;
  reasonses: LookUpModel[] = [];
  request = new ReasonModel();

  constructor(
    private lookUpService: LookUpService,
    private reasonService: ReasonService,
    private toastr: ToastrService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes["monthId"]) {
      this.getAllReasons();
      this.getOne();
    }

  }
  ngOnInit(): void {
    this.getAllReasons();
    this.getOne();
  }

  getAllReasons() {
    this.lookUpService
      .getAllReasons()
      .subscribe((res: any) => {
        this.reasonses = res.Data;
      });
  }

  getOne() {
    this.reasonService
      .getOne(this.monthId,this.factoryId)
      .subscribe((res: any) => {
        debugger
        this.request = res.Data;
      });
  }

  save() {
    debugger
    this.request.MonthId=this.monthId;
    this.request.FactoryId=this.factoryId;
    if (this.request.Id == 0 || this.request.Id ==undefined) {
      this.reasonService
        .create(this.request)
        .subscribe((res: any) => {
          this.toastr.success("تم الحفظ");
        });
    }
    else {
      this.reasonService
        .update(this.request)
        .subscribe((res: any) => {
          this.toastr.success("تم الحفظ");
        });
    }
  }

}
