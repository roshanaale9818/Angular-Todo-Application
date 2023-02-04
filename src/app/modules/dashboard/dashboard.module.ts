import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './components/main/main.component';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NavbarModule
  ]
})
export class DashboardModule { }
