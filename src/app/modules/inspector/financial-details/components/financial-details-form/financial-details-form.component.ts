import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-financial-details-form',
  templateUrl: './financial-details-form.component.html',
  styleUrls: ['./financial-details-form.component.scss']
})
export class FinancialDetailsFormComponent implements OnInit {
  factoryId: any;
  periodId: any;
  constructor(
    private route: ActivatedRoute,
     private toastr: ToastrService,
     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit() {
  }
}
