import { Injectable } from '@angular/core';
import { envrionment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Todo } from 'src/app/shared/modal/Todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
apiUrl:string = envrionment.apiUrl;
  constructor(
    private http:HttpClient,
    private toast:ToastrService
  ) { }

  // adding task
  addTask(task:Todo){
    return this.http.post(`${this.apiUrl}/task/createTask`,task);
  }
  // get all tasks of user
  getTask(body:any){
    return this.http.post(`${this.apiUrl}/task/getTasks`,body);
  }
  // updatetask
  onUpdateTask(body:any){
    return this.http.post(`${this.apiUrl}/task/updateTask`,body);

  }
  // delete task
  onDeleteTask(body:any){
    return this.http.post(`${this.apiUrl}/task/deleteTask`,body);

  }

  //create translation
  onCreateTranslation(body:any){
    return this.http.post(`${this.apiUrl}/createTranslation`,body);

  }
}
