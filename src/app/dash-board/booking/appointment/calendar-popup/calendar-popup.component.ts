import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar-popup',
  templateUrl: './calendar-popup.component.html',
  styleUrls: ['./calendar-popup.component.css']
})
export class CalendarPopupComponent implements OnInit {

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
