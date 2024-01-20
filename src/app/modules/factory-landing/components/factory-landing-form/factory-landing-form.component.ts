import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactoryService } from 'src/app/modules/factory/factory.service';
import { fade } from 'src/app/shared/animation/app.animation';

@Component({
  selector: 'app-factory-landing-form',
  templateUrl: './factory-landing-form.component.html',
  styleUrls: ['./factory-landing-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryLandingFormComponent implements OnInit {

  factoryId:any;

  constructor(private route: ActivatedRoute){
    this.factoryId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

}
