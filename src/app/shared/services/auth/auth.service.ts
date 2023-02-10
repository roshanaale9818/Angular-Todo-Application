import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { envrionment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SignUp } from '../../modal/signup.interface';

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
    this.user$.subscribe((data)=>{
      this._user=data;

    })

  }


  // returns userData value from user observable
  public get currentUserData(): any {
    return this.user.value;
  }
  _user:any;

  // _user is where our all user properties are
  public isLoggedIn() {
    if (this._user && this._user) {
      return true;
    }
    else {
      return false;
    }
  }

  get loggedIn():boolean{
    if(this.user){
      return true;
    }
    else{
      return false;
    }
  }

    // returns user role
  getRole() {
    const role = JSON.parse(localStorage.getItem('user')||'null')
    return role?role.roles[0]:'ROLE_USER';
  }

  //login
  signin(_username:string,_password:string){
    let body = {
      username:_username,
      password:_password
    }
     this.http.post(`${this.apiUrl}/auth/signin`,body).subscribe((res: any) => {
      if(res.status=="ok"){
          this.toaster.success("Logged in successfull.");
          localStorage.setItem("token",res.data.accessToken);
          localStorage.setItem("role",res.data.roles[0]);
          localStorage.setItem("STATE","true");
          localStorage.setItem('user',JSON.stringify(res.data));
          this.user.next(res.data);
          if(res.data.roles[0]=="ROLE_ADMIN"){
            this.router.navigate(['/dashboard']);
          }
          else{
            this.router.navigate(['/todo']);
          }

      }
      else{
        this.toaster.error(res.message)
      }
    });


  }
  onLogOut(){
    this.user.next({});
    localStorage.clear();
    this.router.navigate(['/todo'])
  }
  getToken():string{
          let token = localStorage.getItem('token') || '';
          return token
  }


  // signup
  signUp(signUpObj:SignUp):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/signup`,signUpObj);
  }
}
