import { Component, Input,SimpleChange } from '@angular/core';
import { Todo } from 'src/app/shared/modal/Todo.interface';
import {faCheck,faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Language } from 'src/app/shared/modal/Language.interface';
import { GoogleObj } from 'src/app/shared/modal/GoogleObj.interface';
import { GoogletranslateService } from 'src/app/shared/services/googletranslate.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers:[{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class TodoListComponent {
  @Input() todosList:Todo[]=[];
  @Input()todo:Todo={
    name: '',
    originText:''
  };
  //popup configs
  modalRef: BsModalRef = new BsModalRef();
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  constructor(private modelService: BsModalService,
              private toaster:ToastrService,
              private google:GoogletranslateService){

  }

  _faCheck = faCheck;
  _faTrash = faTrash;
firstChange:boolean = false;
  ngOnChanges(changes:SimpleChange){
    if(this.todo && this.todo.name){
      this.todosList.push(this.todo);
      this.toaster.success("Task added.")
    }
  }
  onCompleteTask(todo:Todo){
    //changing status for now
    todo.status='close';
    this.toaster.success(todo.name +" Task completed.")
  }
  onUndoCompleted(todo:Todo){
    //changing status for now
    todo.status='open';
    this.toaster.success(todo.name +" Task undone.")
  }
  onDeleteTask(todo:Todo){
    // console.log("Deleting",todo)
    this.modalRef = this.modelService.show(
      ConfirmationDialogComponent,
      this.config
    );
    // this.modalRef.content.data = company.company_name;
    this.modalRef.content.action = `delete task (${todo.name})`;
    this.modalRef.content.onClose.subscribe((confirm:boolean) => {
      if (confirm) {
        this.todosList = this.todosList.filter(x=> x.name !== todo.name);
        this.toaster.success("Task deleted.")
      }
    });
  }
  //google languages and their codes
  languages:Language[]=[
    {
      name:"Spanish",
      code:'es'
    },
    {
      name:"Punjabi",
      code:'pa'
    },
    {
      name:"Nepali",
      code:'ne'
    },
    {
      name:"Hindi",
      code:'hi'
    },
    {
      name:"Default",
      code:'default'
    }
  ];
  onTranslate(targetCode:string,item:Todo,targetName:string){
    const googleObj: GoogleObj = {
      q:item.originText,
      target: targetCode
    };
    if(targetCode ==='default'){
      item.name = item.originText;
      return;
    }
    item.isLoading = true;
    //delaying for showing spinner for a while using pipe method
    this.google.translate(googleObj).pipe(delay(2000)).subscribe(
      (res: any) => {
        item.isLoading=false;
        // console.log("RES",res);
        item.name=res.data.translations[0].translatedText;
        this.toaster.success(`Translated to ${targetName}` )
      },
    );
  }
}
