import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo/todo.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { NavbarModule } from '../navbar/navbar.module';
@NgModule({
  declarations: [
    TodoComponent,
    TodoFormComponent,
    TodoListComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    FontAwesomeModule,
    SharedModule,
    ModalModule.forRoot(), // modalmodule injected in root
    BsDropdownModule.forRoot(),
    MatProgressSpinnerModule,
    NavbarModule
  ]
})
export class TodoModule { }
