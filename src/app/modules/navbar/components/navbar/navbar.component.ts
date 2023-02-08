import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {faS, faSignIn ,faSignOut} from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
_faSignIn=faSignIn;
_faSignOut = faSignOut;
loggedIn:boolean = false;
modalRef: BsModalRef = new BsModalRef();
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
constructor(private authService:AuthService,
  private router:Router,
  private modalService:BsModalService
  ){
  this.user = this.authService.user$;
  // this.loggedIn = this.authService.loggedIn
  console.log("this is user",this.user);
  this.user.subscribe((data)=>{
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



onLogout() {
  // console.log("Deleting",todo)
  this.modalRef = this.modalService.show(
    ConfirmationDialogComponent,
    this.config
  );
  // this.modalRef.content.data = company.company_name;
  this.modalRef.content.action = `log out`;
  this.modalRef.content.onClose.subscribe((confirm: boolean) => {
    if (confirm) {
      //not logged in case
this.authService.onLogOut();
    }
  });
}

}
