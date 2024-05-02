import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FactoryContactModel } from 'src/app/modules/factory-contacts/models/factory-contact-model';
import { FactoryContactsModel } from '../../models/factory-contacts.model';
import { InspectorFactoryContactsService } from '../../factory-contacts.service';
import { SharedService } from 'src/app/shared/services/shared.service';


@Component({
  selector: 'app-factory-contacts-form',
  templateUrl: './factory-contacts-form.component.html',
  styleUrls: ['./factory-contacts-form.component.scss']
})
export class FactoryContactsFormComponent implements OnInit {
  factoryId: any;
  periodId: any;
  request = new FactoryContactsModel()
  requestContact = new FactoryContactModel()
  userId!: string;
  constructor(
    private route: ActivatedRoute,
    private inspectorContactService: InspectorFactoryContactsService,
    private shared: SharedService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit() {
    this.userId = this.shared.getUserRole();
    this.getContact()


  }

  getContact() {
    this.inspectorContactService
      .getOne(this.factoryId, this.periodId, this.userId)
      .subscribe((res: any) => {
        this.request = res.Data;
        console.log(this.request)
      });
  }


  onInputChange(event: Event): void {

    if (this.request.IsOfficerMailCorrect == true) {
      this.request.NewOfficerEmail = ''
    }
    if (this.request.IsOfficerPhoneCorrect == true) {
      this.request.NewOfficerPhoneId = ''
    }

  }

  save() {
    this.request.FactoryId = this.factoryId;
    this.request.PeriodId = this.periodId;
    console.log(this.request)




    if (this.request.Id == 0) {
      this.inspectorContactService
        .create(this.request)
        .subscribe((res: any) => {
          this.router.navigate(['/pages/Inspector/visit-landing/' + this.factoryId + '/' + this.periodId]);

        });

    }
    else {
      this.inspectorContactService
        .update(this.request)
        .subscribe((res: any) => {
          this.router.navigate(['/pages/Inspector/visit-landing/' + this.factoryId + '/' + this.periodId]);


        });
      this.toastr.success("تم الحفظ");

    }
  }

}
