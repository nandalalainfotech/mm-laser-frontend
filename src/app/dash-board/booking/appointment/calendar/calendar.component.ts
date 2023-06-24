import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { deserialize } from 'serializer.ts/Serializer';
import { BookingentryManager } from 'src/app/shared/services/restcontroller/bizservice/bookingentry.service';
import { MachinemasterManager } from 'src/app/shared/services/restcontroller/bizservice/machinemaster.service';
import { Bookingentry001mb } from 'src/app/shared/services/restcontroller/entities/Bookingentry001mb';
import { Machinemaster001mb } from 'src/app/shared/services/restcontroller/entities/Machinemaster001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { BookingentryComponent } from '../bookingentry/bookingentry.component';
import * as moment from 'moment';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  previewWeek = new FormControl(null);
  booking: Bookingentry001mb[] = [];
  selectedDays: any[] = [];
  name = 'Angular 6';
  dayList: Array<any> = [];
  point: any[] = []
  dayas: any[] = []
  machiness: Machinemaster001mb[] = [];
  onEditButtonClick: any;

  constructor(
    private modalService: NgbModal,
    private bookingentryManager: BookingentryManager,
    private machinemasterManager: MachinemasterManager,
    private calloutService: CalloutService,
  ) {

  }
  ngOnInit() {
    // console.log("1111111111111");

    this.loaddata();
    this.datemethod();
    this.setActiveDay();
  }

  loaddata() {
    this.point = [];
    this.machinemasterManager.allmachinemaster().subscribe((response: any) => {
      this.machiness = deserialize<Machinemaster001mb[]>(Machinemaster001mb, response);
    })

    this.bookingentryManager.allbooking().subscribe((response) => {
      this.booking = deserialize<Bookingentry001mb[]>(Bookingentry001mb, response);

      for (let i = 0; i < this.booking.length; i++) {
        for (let j = 0; j < this.dayList.length; j++) {
          if (this.dayList[j].day == this.booking[i].days) {
            this.point.push(this.booking[i])
          }
        }
      }
    })

  }

  editClick(day: any, i: any) {
    console.log('day', day);

    const modalRef = this.modalService.open(BookingentryComponent, { windowClass: 'my-class' });
    modalRef.componentInstance.title = "Booking Entry";
    modalRef.componentInstance.detailslist = day;
  }
  editClickk(value3: any, i: any) {
    console.log("value3", value3);

    const modalRef = this.modalService.open(BookingentryComponent, { windowClass: 'my-class' });
    modalRef.componentInstance.title = "Booking Entry";
    modalRef.componentInstance.editmethod = value3;
  }
  editClickks(value3: any, i: any) {
    const modalRef = this.modalService.open(BookingentryComponent, { windowClass: 'my-class' });
    modalRef.componentInstance.title = "Entry";
    modalRef.componentInstance.editmethod = value3;
  }

  // viewClick(days: any, i: any) {
  //   const modalRef = this.modalService.open(BookingentryComponent);
  //   modalRef.componentInstance.title = "Booking Entry";
  //   modalRef.componentInstance.viewmethod = days;
  // }

  onDeleteButtonClick(params: any, i: any) {
    this.bookingentryManager.bookingdelete(params.bookingId).subscribe((response: any) => {
      for (let i = 0; i < this.booking.length; i++) {
        if (this.booking[i].bookingId == params.bookingId) {
          this.booking?.splice(i, 1);
          break;
        }
      }
      this.calloutService.showSuccess("Purchase Request Removed Successfully");
      this.ngOnInit()
    });
  }

  datemethod() {
    const newDate = new Date
    const name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    // const month = ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const now = Date.now();
    const DAY = 60 * 60 * 24 * 1000;
    const today = new Date(now).getDay();

    for (let i = today; i >= 0; i--) {
      const date = new Date(now - DAY * i);
      let item = { "day": name[date.getDay()], "date": date.getDate(), "mon": date.getMonth() }
      this.dayas.push(item)
    }
    for (let i = 1; i < 7 - today; i++) {
      const date = new Date(now + DAY * i);
      let item = { "day": name[date.getDay()], "date": date.getDate(), "mon": date.getMonth() }
      this.dayas.push(item)
      if (item.date <= item.date) {
      }
    }
  }

  setActiveDay() {
    let dummyDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = new Date().getDay();
    for (let i = day; i < 7 + day; i++) {
      if (i < dummyDays.length) {
        if (i == day) {
          this.dayList.push({ day: dummyDays[i], active: true });
        } else {
          this.dayList.push({ day: dummyDays[i], active: false });
        }

      } else {
        this.dayList.push({ day: dummyDays[i - 7], active: false })
      }
    }
  }

  onClick(value1: any, value2: any, index: any) {
    console.log("value1", value1, value2, index);
    const date = moment().month(value2.mon - 1).date(value2.date).format("YYYY-MM-DD");
    console.log("date", date);

    const modalRef = this.modalService.open(BookingentryComponent, { windowClass: 'my-class' });
    modalRef.componentInstance.title = "Booking Entry";
    modalRef.componentInstance.details = value1;
    modalRef.componentInstance.daydetails = value2;
    modalRef.componentInstance.daydetailss = date;
  }
}