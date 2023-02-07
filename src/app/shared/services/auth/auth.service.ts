import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { envrionment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user:BehaviorSubject<any> = new BehaviorSubject(
    JSON.parse(localStorage.getItem('user')||'{}')
  );
  public user$ = this.user.asObservable();
  apiUrl:string = envrionment.apiUrl;
  constructor(
    private http:HttpClient,
    private toaster:ToastrService,
    private router:Router
  ) {
    this.user$ = this.user.asObservable();
  }

  public get currentUserData(): any {
    return this.user.value;
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      // this.isLogin = true;
      return true;
    else
      // this.isLogin = false;
    return false;
  }

  get loggedIn():boolean{
    if(this.user){
      return true;
    }
    else{
      return false;
    }
  }

  getRole() {
    // this.roleAs = localStorage.getItem('ROLE');
    const role ="ROLE_ADMIN"
    return role;
  }

  //login
  signin(_username:string,_password:string){
    let body = {
      username:_username,
      password:_password
    }
     this.http.post(`${this.apiUrl}/auth/signin`,body).subscribe((res: any) => {
      console.log("this is res here",res);
      if(res.status=="ok"){
        // this.user.next(res.data);
          this.toaster.success("Logged in successfull.");
          localStorage.setItem("token",res.data.accessToken);
          localStorage.setItem("role",res.data.roles[0]);
          localStorage.setItem("STATE","true");
          localStorage.setItem('user',JSON.stringify(res.data));
          this.user.next(res.data);
          this.router.navigate(['/todo']);

      }
      else{
        this.toaster.error(res.message)
      }
    });


  }
  onLogOut(){
    this.user.next({});
    localStorage.clear();
  }
  getToken():string{
          // localStorage.setItem("token",res.data.accessToken);
          let token = localStorage.getItem('token') || '';
          return token
  }
}
