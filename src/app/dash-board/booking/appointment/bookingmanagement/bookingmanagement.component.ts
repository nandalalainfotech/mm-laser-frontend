import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-bookingmanagement',
  templateUrl: './bookingmanagement.component.html',
  styleUrls: ['./bookingmanagement.component.css']
})
export class BookingmanagementComponent implements OnInit {
  @Input() details: any
  @Input() preventCancel: boolean = false;
  @Output() cancelClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder,
    public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
    console.log("details--------->>", this.details);
  }
  onCrossClick(event: any) {
    if (!this.preventCancel) {
      event.stopPropagation();
      this.activeModal.close('Cross click');
    } else {
      this.cancelClick.emit(true);
    }
  }
}
