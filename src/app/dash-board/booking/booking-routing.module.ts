import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking.component';

const routes: Routes = [
  {
    path: "",
    component: BookingComponent,
    children: [
      {
        path: "app-appointment",
        loadChildren: () => import("./appointment/appointment.module").then(m => m.AppointmentModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
