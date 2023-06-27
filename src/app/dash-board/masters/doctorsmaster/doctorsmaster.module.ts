import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { DoctormasterManager } from 'src/app/shared/services/restcontroller/bizservice/doctormaster.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { DoctorsmasterRoutingModule } from './doctorsmaster-routing.module';
import { DoctorsmasterComponent } from './doctorsmaster.component';


@NgModule({
  declarations: [DoctorsmasterComponent],
  imports: [
    CommonModule,
    DoctorsmasterRoutingModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    NgbModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    DoctormasterManager
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DoctorsmasterModule { }
