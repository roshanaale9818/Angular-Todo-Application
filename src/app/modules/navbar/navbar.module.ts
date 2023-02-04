import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarRoutingModule } from './navbar-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertModule } from 'ngx-bootstrap/alert';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
  CommonModule,
    NavbarRoutingModule,
    FontAwesomeModule,
    AlertModule.forRoot()


  ],
  exports:[
    NavbarComponent
  ]
})
export class NavbarModule { }
