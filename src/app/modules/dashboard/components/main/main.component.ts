import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Translation } from 'src/app/shared/modal/custom.response.interface';
import { User } from 'src/app/shared/modal/user.inteface';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
users:User[]=[];
constructor(private adminService:AdminService,
  private modalService:BsModalService

  ){}
// get all users
getUsers(){
  this.adminService.getUsers().subscribe((res)=>{
    if(res.status=="ok"){
      this.users = res.data;
    }
  })
}
ngOnInit(){
  this.getUsers();
}
modalRef?: BsModalRef;
translationList:Translation[]=[];
selectedUser:User={createdAt:"",id:"",email:"",username:""}
onViewHistory(template:TemplateRef<any>,user:User){
this.selectedUser = user;
this.translationList = [];
  this.adminService.getTranslationHistory(user.id).subscribe((res:any)=>{
    if(res.status=='ok'){
      this.translationList = res.data;
    }
    else{
      this.translationList = [];
    }
  });
  this.modalRef = this.modalService.show(template);
}
}
