import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ModalModule,
    FontAwesomeModule

  ],
  exports:[
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
