import { Component} from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-nav-icons',
  templateUrl: './nav-icons.component.html',
  styleUrls: ['./nav-icons.component.css']
})
export class NavIconsComponent  {
/**
 *
 */
constructor(private router:Router) {

}
  signOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('orgId')
    this.router.navigate(['/'])
  }

}
