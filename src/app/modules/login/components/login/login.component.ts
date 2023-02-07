// import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router,
    private authService: AuthService,
    private fb:FormBuilder,
    private toastr:ToastrService
  ) {
    this.userForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  userForm:FormGroup= new FormGroup({
    username:new FormControl(''),
    password:new FormControl('')
  });
  onSignup() {
    this.router.navigate(['/login/register']);
  }

  onLogin() {
    if(this.userForm.invalid){
      return;
    }
    let username = this.userForm.get('username')?.value;
    let password = this.userForm.get('password')?.value;
    this.authService.signin(username, password);
  }

}
