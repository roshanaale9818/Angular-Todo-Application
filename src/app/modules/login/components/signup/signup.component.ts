import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ConfirmValidator } from 'src/app/shared/validator/password.validator';
import { SignUp } from './../../../../shared/modal/signup.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
signUpForm:FormGroup = new FormGroup({
  username:new FormControl(''),
  password:new FormControl(''),
  verify_password:new FormControl(''),
  email:new FormControl('')
});


constructor(private fb:FormBuilder,
  private toaster:ToastrService,
  private auth:AuthService){}


ngOnInit(){
  this.buildSignUpForm();
}
buildSignUpForm(){
  this.signUpForm = this.fb.group({
    username:['',Validators.required],
  password:['',Validators.required],
  verify_password:['',Validators.required],
  email:['',Validators.required],
  },
  //confirm validator is custom validator for checking
  //pass two params, formControlname
  {validators:ConfirmValidator("password","verify_password")})
}
submitted:boolean =false;
onSignUpSubmit(){
  this.submitted = true;
  if(this.signUpForm.invalid){
    this.toaster.error("All fields are required");
    return;
  }
  let signUpObj:SignUp = {
    email:this.signUpForm.get('email')?.value,
    password:this.signUpForm.get('verify_password')?.value,
    username:this.signUpForm.get('username')?.value
  }
  this.auth.signUp(signUpObj).subscribe((res:any)=>{
    console.log("res",res);
    if(res['status']=="ok"){
      this.toaster.success(res.message);
      //restting the form again
      this.submitted=false;
      this.buildSignUpForm();
    }
    else{
      this.toaster.error(res.message)    }
  })
}
}
