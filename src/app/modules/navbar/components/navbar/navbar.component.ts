import { Component } from '@angular/core';
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
constructor(private authService:AuthService){
  this.user$ = this.authService.user$;
}
user$:Observable<any>=new Observable();
logOut(){

}

}
