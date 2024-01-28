import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-actual-production-form',
  templateUrl: './actual-production-form.component.html',
  styleUrls: ['./actual-production-form.component.scss']
})
export class ActualProductionFormComponent implements OnInit {

@Input()factoryId!:number;
@Input()productId!:number;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
