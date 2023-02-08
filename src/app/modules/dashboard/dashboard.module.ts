import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './components/main/main.component';
import { NavbarModule } from '../navbar/navbar.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TodoModule } from '../todo/todo.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NavbarModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    TodoModule
  ]
})
export class DashboardModule { }
