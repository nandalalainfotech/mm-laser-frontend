import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [BookingComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    CalendarModule
  ]
})
export class BookingModule { }
