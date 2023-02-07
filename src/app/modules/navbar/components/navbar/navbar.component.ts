import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {faS, faSignIn ,faSignOut} from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
_faSignIn=faSignIn;
_faSignOut = faSignOut;
loggedIn:boolean = false;
constructor(private authService:AuthService,
  private router:Router
  ){
  this.user = this.authService.user$;
  // this.loggedIn = this.authService.loggedIn
  console.log("this is user",this.user);
  this.user.subscribe((data)=>{
    console.log("called in navbar",data)
    this.user$ = data;
  })
}
user;
user$: any;
logOut(){

}
onLogin(){
    this.router.navigate(['/login'])
}
onLogout(){
  this.authService.onLogOut();
}

}
