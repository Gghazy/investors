import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Output() changePage = new EventEmitter<any>();
  @Input() pageSize = 10;
  @Input() totalCount = 1;
  @Input() pageNumber = 1;
  currentPageNumber=1;
  numbers:number[]=[];
  pageChanged(data: any) {
    this.currentPageNumber=data;
    this.changePage.emit(data);

  }
}
