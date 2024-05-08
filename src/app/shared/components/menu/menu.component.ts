import { Component, Input } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  userId!: string;
  userRole!: string;
  currentUrl: string;
constructor(private shared: SharedService,
  private route: ActivatedRoute, 
  private router: Router
){
  this.userId = this.shared.getUserId();
  this.currentUrl = this.router.url;
}
ngOnInit(): void {
  console.log(this.currentUrl)
if(this.currentUrl == '/pages/factories-list'){
  localStorage.setItem('param', 'Investor');
  this.shared.setUserRole('Investor');
  console.log(this.userRole)
}


if( this.currentUrl == '/pages/Inspector/factories-list'){
  this.shared.setUserRole('Inspector');
  console.log('tesst')
}
this.userRole = this.shared.getUserRole()

  this.shared.setUserId('1012955132');
  console.log(this.userRole)
}
isUrlIncludes(value: string): boolean {
  console.log(this.router.url)
  return this.router.url.includes(value);

}
}
