import { Component, Input,SimpleChange } from '@angular/core';
import { Todo } from 'src/app/shared/modal/Todo.interface';
import { faCoffee,faCheck,faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input() todosList:Todo[]=[];
  @Input()todo:Todo={};
  //popup configs
  modalRef: BsModalRef = new BsModalRef();
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  constructor(private modelService: BsModalService, private toaster:ToastrService){

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
}
