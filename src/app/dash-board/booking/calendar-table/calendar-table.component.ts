import { DatePipe } from '@angular/common';
import {
  Component,
  HostBinding,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {
  endOfDay,
  isSameDay,
  isSameMonth,
  startOfDay
} from 'date-fns';
import { Subject } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BookingentryManager } from 'src/app/shared/services/restcontroller/bizservice/bookingentry.service';
import { DoctormasterManager } from 'src/app/shared/services/restcontroller/bizservice/doctormaster.service';
import { MachinemasterManager } from 'src/app/shared/services/restcontroller/bizservice/machinemaster.service';
import { Bookingentry001mb } from 'src/app/shared/services/restcontroller/entities/Bookingentry001mb';
import { Doctormaster001mb } from 'src/app/shared/services/restcontroller/entities/Doctormaster001mb';
import { Machinemaster001mb } from 'src/app/shared/services/restcontroller/entities/Machinemaster001mb';
import { Utils } from 'src/app/shared/utils/utils';
import { BookingmanagementComponent } from '../appointment/bookingmanagement/bookingmanagement.component';
import { BookingentryComponent } from '../appointment/bookingentry/bookingentry.component';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-calendar-table',
  templateUrl: './calendar-table.component.html',
  styleUrls: ['./calendar-table.component.css']
})
export class CalendarTableComponent implements OnInit {

  Doctormaster: Doctormaster001mb[] = [];
  machiness: Machinemaster001mb[] = [];
  booking: Bookingentry001mb[] = [];
  public gridOptions: GridOptions | any;
  date: Date | any;
  itemdate: any[] = [];
  event: any[] = [];
  propterty: any[] = []

  constructor(private modal: NgbModal,
    private bookingentryManager: BookingentryManager,
    private machinemasterManager: MachinemasterManager,
    private doctormasterManager: DoctormasterManager,
    private datePipe: DatePipe,
    private authManager: AuthManager,
    private modalService: NgbModal) {
    this.initializeYesterday();
    this.initializeEvents();
  }


  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  ngOnInit() {

    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);

      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });

    this.loaddata();
    this.machinemasterManager.allmachinemaster().subscribe((response: any) => {
      this.machiness = deserialize<Machinemaster001mb[]>(Machinemaster001mb, response);
    })
    this.doctormasterManager.alldoctormaster().subscribe((response: any) => {
      this.Doctormaster = deserialize<Doctormaster001mb[]>(Doctormaster001mb, response);
    });
  }
  loaddata() {
    this.events = [];
    this.event = [];
    this.bookingentryManager.allbooking().subscribe((response) => {
      this.booking = deserialize<Bookingentry001mb[]>(Bookingentry001mb, response);
      this.addEvent();
      this.initializeEvents();
    })
  }

  private initializeYesterday() { }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }
  private initializeEvents() {

    this.events = [];
    this.event = [];
    this.booking.map((datavalue) => {
      this.itemdate.push(this.datePipe.transform(datavalue.date, 'yyyy/MM/dd'))

    })
    const dayRosters = this.booking.map((datavalue, i) => ({
      start: new Date(this.itemdate[i]),
      payload: datavalue,
    }))
    this.events = [...dayRosters]
    this.event = [...dayRosters]
  }


  private yesterday!: Date;
  @ViewChild('modalContent')
  modalContent!: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  actions: CalendarEventAction[] = [];

  refresh: Subject<any> = new Subject();
  events: any[] = [];
  activeDayIsOpen: boolean = true;


//   onClick(){
//     {
//       label: '<i class="fa fa-fw fa-pencil"></i>',
//       onClick: ({ event }: { event: CalendarEvent }): void => {
//         this.handleEvent('Edited', event);
//       }
//   }
// }
 
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    console.log("events", events);


    const modalRef = this.modalService.open(BookingmanagementComponent, { windowClass: 'my-class' });
    modalRef.componentInstance.details = events;
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  handleEvent(event: any) {
    console.log("event", event);
    let eventlist = []
    eventlist.push(event)
    console.log("eventlist", eventlist);
    const modalRef = this.modalService.open(BookingmanagementComponent, { windowClass: 'my-class' });
    modalRef.componentInstance.details = eventlist;
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
  }

  setView(view: CalendarView) {
    this.view = view;
  }
  onClick({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    console.log("events", events);
    const modalRef = this.modalService.open(BookingentryComponent);
    modalRef.componentInstance.title = "Booking Entry";
    modalRef.componentInstance.details = events;
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
