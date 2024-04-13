import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  userRole!: string;
constructor(private shared: SharedService,
  private route: ActivatedRoute, 
){
  this.userRole = this.shared.getUserRole();
}


}
