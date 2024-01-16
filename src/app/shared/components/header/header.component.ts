import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  routeTitle: string = '';

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    // Subscribe to changes in the route title
    this.sharedService.routeTitle$.subscribe(title => {
      this.routeTitle = title;
    });
  }
}
