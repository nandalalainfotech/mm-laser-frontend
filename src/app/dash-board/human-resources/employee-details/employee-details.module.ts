import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EmployeeDetailsRoutingModule } from './employee-details-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDetailsComponent } from './employee-details.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { AgGridModule } from 'ag-grid-angular';
import { EmployeeManager } from 'src/app/shared/services/restcontroller/bizservice/employee.service';
import { EmpDeptmentManager } from 'src/app/shared/services/restcontroller/bizservice/emp-deptment.service';
import { EmpAttendanceManager } from 'src/app/shared/services/restcontroller/bizservice/emp-attendance.service';
import { CalendarModule } from 'primeng/calendar';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/','.json');
  }
@NgModule({
    declarations: [
        EmployeeComponent,
        DepartmentComponent,
        AttendanceComponent,
        EmployeeDetailsComponent
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        EmployeeDetailsRoutingModule,
        DataTablesModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient],
            },
            defaultLanguage: 'en-US',
          }),
        AgGridModule.withComponents([]),
        CalendarModule,
        MatTabsModule
    ],
    providers: [
        EmployeeManager,
        EmpDeptmentManager,
        EmpAttendanceManager,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class EmployeeDetailsModule { }
