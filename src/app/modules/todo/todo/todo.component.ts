import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/shared/modal/Todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
todoList:Todo[]=[];
}
