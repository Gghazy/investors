import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { TermsModalComponent } from './components/terms-modal/terms-modal.component';
import { ToTopBtnComponent } from './components/to-top-btn/to-top-btn.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ListComponent } from './components/list/list.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RouterModule } from '@angular/router';




const COMPONENTS = [
  ToTopBtnComponent,
  TermsModalComponent,
  MenuComponent,
  HeaderComponent,
  FooterComponent,
  PaginationComponent,
  ListComponent
];


@NgModule({
  declarations: [[...COMPONENTS]],
  exports:[
    [...COMPONENTS],
    NgMultiSelectDropDownModule,
    FormsModule,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    ToastrModule,
    NgxSpinnerModule,
    CoreModule,
    HttpClientModule,  
    TooltipModule,
    RouterModule
  ],
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CoreModule,
    HttpClientModule,
    RouterModule,
    TooltipModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
