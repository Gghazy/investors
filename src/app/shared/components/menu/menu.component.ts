import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  userRole!: string;
  currentUrl: string;
constructor(private shared: SharedService,
  private route: ActivatedRoute, 
  private router: Router
){
  this.userRole = this.shared.getUserRole();
  this.currentUrl = this.router.url;
}
ngOnInit(): void {
  console.log(this.currentUrl)
}
}
