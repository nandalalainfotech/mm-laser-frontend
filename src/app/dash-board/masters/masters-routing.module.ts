import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MastersComponent } from './masters.component';

const routes: Routes = [
  {
    path: "",
    component: MastersComponent,
    children: [
      {
        path: 'app-machinemaster',
        loadChildren: () => import("./machinemaster/machinemaster.module").then(m => m.MachinemasterModule)
      },
      {
        path: 'app-doctorsmaster',
        loadChildren: () => import("./doctorsmaster/doctorsmaster.module").then(m => m.DoctorsmasterModule)
      },
      {
        path: 'app-employeemaster',
        loadChildren: () => import("./employeemaster/employeemaster.module").then(m => m.EmployeemasterModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
