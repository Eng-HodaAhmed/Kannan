import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-NavBar',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /**
   *
   */
  constructor(private router:Router) {
    
    
  }
logIn(){
// const token=localStorage.getItem('token');
// const orgId=localStorage.getItem('orgId');
// if(token&&orgId){
//   this.router.navigate(['controllerPage'])
// }
// else{
  this.router.navigate(['logIn'])
// }
}
}
