import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";
// import fa icons from @fortawesome
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.scss"]
})
export class ConfirmationDialogComponent implements OnInit {
  // subject for close of boolean value
  public onClose: Subject<boolean> = new Subject();

  constructor(public bsModalRef: BsModalRef) {}

  public ngOnInit(): void {
    this.onClose = new Subject();
  }
  _faXmark =faXmark;

  public onConfirm(): void {
    // passing true when yes button is clicked  via subject
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    // passing false when yes button is clicked  via subject
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}
