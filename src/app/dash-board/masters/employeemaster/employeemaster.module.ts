import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { EmployeemasterManager } from 'src/app/shared/services/restcontroller/bizservice/employeemaster.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { EmployeemasterRoutingModule } from './employeemaster-routing.module';
import { EmployeemasterComponent } from './employeemaster.component';


@NgModule({
  declarations: [EmployeemasterComponent],
  imports: [
    CommonModule,
    EmployeemasterRoutingModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    NgbModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    EmployeemasterManager
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class EmployeemasterModule { }
