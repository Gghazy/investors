import { Component, ContentChild, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  @Input() itemsData!: any[];
  @ContentChild('header') header!: TemplateRef<ElementRef>;
  @ContentChild('body') body!: TemplateRef<ElementRef>;

  constructor() { }

  ngOnInit(): void {
  }

}
