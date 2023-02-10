import { Component, Input, SimpleChange } from '@angular/core';
import { Todo } from 'src/app/shared/modal/Todo.interface';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Language } from 'src/app/shared/modal/Language.interface';
import { GoogleObj } from 'src/app/shared/modal/GoogleObj.interface';
import { GoogletranslateService } from 'src/app/shared/services/googletranslate.service';
import { delay } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class TodoListComponent {
  //getting todo from parent component
  @Input() todosList: Todo[] = [];
  // todo from parent component
  @Input() todo: Todo = {
    name: '',
    originText: '',
    description: "",
    isLoading: false,
    userId: '',
    status: "",
  };
  //popup configs bootstraps
  modalRef: BsModalRef = new BsModalRef();
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  user;
  user$: any;
  constructor(private modelService: BsModalService,
    private toaster: ToastrService,
    private google: GoogletranslateService,
    private todoService: TodoService,
    private authService: AuthService,
  ) {
    this.user = this.authService.user$;
    this.user.subscribe((data) => {
      this.user$ = data;
      this.reset();
    })
  }
  // resetting list
  reset() {
    this.todosList = [];
  }
  ngOnInit() {
    if (this.user$ && this.user$.id) {
      this.getTasks();
    }
  }

  _faCheck = faCheck;
  _faTrash = faTrash;
  firstChange: boolean = false;
  ngOnChanges(changes: SimpleChange) {
    if (this.todo && this.todo.name) {
      // this.todosList.push(this.todo);
      // this.toaster.success("Task added.")
      // current user and logged in
      if (this.user$ && this.user$ && this.user$.id) {
        this.onAddTask();
      }
      else {
        // adding in else just
        this.todosList.push(this.todo);
        this.toaster.success("Task added.")
      }
    }
  }
  onAddTask() {
    this.todo.userId = String(this.user$.id);
    this.todoService.addTask(this.todo).subscribe((res: any) => {
      this.toaster.success("Task added.");
      this.getTasks();
    });

  }
  // getting all tasks of current logged in user
  getTasks() {
    this.todoService.getTask({ userId: String(this.user$.id) }).subscribe((res: any) => {
      this.todosList = res.data;
    })
  }

  // logged in status
  isLoggedIn() {
    if (this.user$ && this.user$.id) {
      return true;
    }
    else {
      return false;
    }
  }


  // on complete change status to close
  onCompleteTask(todo: Todo) {
    //changing status for now
    if (!this.isLoggedIn) {
      todo.status = 'open';
      this.toaster.success(todo.name + " Task undone.")
    }
    else {
      let body = {status:"close",
      id:todo.id,
      userId:String(this.user$.id)
    }
      this.todoService.onUpdateTask(body).subscribe((res:any)=>{
    if(res.status=="ok"){
      this.toaster.success(res.data);
      this.getTasks();

    }
    else{
      this.toaster.error(res.data)
    }
  })
    }
  }
  // deleting the task
  onDeleteTask(todo: Todo) {
    // console.log("Deleting",todo)
    this.modalRef = this.modelService.show(
      ConfirmationDialogComponent,
      this.config
    );
    // this.modalRef.content.data = company.company_name;
    this.modalRef.content.action = `delete task (${todo.name})`;
    this.modalRef.content.onClose.subscribe((confirm: boolean) => {
      if (confirm) {
        //not logged in case

        if (!this.user$ && !this.user$.id) {
          this.todosList = this.todosList.filter(x => x.name !== todo.name);
          this.toaster.success("Task deleted.")
        }
        else {
          this.todoService.onDeleteTask({ taskId: todo.id, userId: this.user$.id }).subscribe((res: any) => {
            if (res.status == "ok") {
              this.toaster.success("Task deleted.")
              this.getTasks();
            }
          })
        }
      }
    });
  }
  //google languages and their codes
  languages: Language[] = this.google.languages;
  onTranslate(targetCode: string, item: Todo, targetName: string) {
    const googleObj: GoogleObj = {
      q: item.originText,
      target: targetCode
    };
    if (targetCode === 'default') {
      item.name = item.originText;
      return;
    }
    item.isLoading = true;
    //delaying for showing spinner for a while using pipe method
    this.google.translate(googleObj).pipe(delay(2000)).subscribe(
      (res: any) => {
        //also save it in our database
        this.todoService.onCreateTranslation({
          userId:this.user$.id, //logged in user,
          translatedTo:targetCode,
          translatedText:item.originText
        }).subscribe((data:any)=>{
          if(data.status=="ok"){
            item.isLoading = false;
            item.name = res.data.translations[0].translatedText;
            this.toaster.success(`Translated to ${targetName}`);
          }
          else{
            console.error("couldn't save in our system");
            this.toaster.error(data.message)
          }
        })


      },
    );
  }
}
