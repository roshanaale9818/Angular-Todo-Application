import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Todo } from 'src/app/shared/modal/Todo.interface';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
value:any;
taskForm:FormGroup;
constructor(private fb:FormBuilder,
  private toaster:ToastrService){
    //creating form and its control with formBuilder
  this.taskForm = this.fb.group({
    name:['',Validators.required]
  })
}
//on add function
onSubmitHandler(){
  if(this.taskForm.invalid){
    this.toaster.error("Task field is required");
    return;} // return if input field is empty
  let _todo:Todo = {
    name:this.taskForm.get('name')?.value,
    status:'open',
    originText:this.taskForm.get('name')?.value
  }
  // for sending the data to child component
  this.todo=_todo;
  this.taskForm.reset(); // resetting the form
}
todo:Todo={name:"",originText:""};


}
