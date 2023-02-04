import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new Subject();
  public user$ = this.user.asObservable();
  constructor() { }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      // this.isLogin = true;
      return true
    else
      // this.isLogin = false;
    return false;
  }

  getRole() {
    // this.roleAs = localStorage.getItem('ROLE');
    const role ="ROLE_ADMIN"
    return role;
  }

  //login
  onLogin(){

  }
  onLogOut(){}
}
