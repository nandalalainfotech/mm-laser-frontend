import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { CaseentryRoutingModule } from './caseentry-routing.module';
import { CaseentryyComponent } from './caseentryy/caseentryy.component';
import { CaseEntryManager } from 'src/app/shared/services/restcontroller/bizservice/case-entry.service';
import { AgGridModule } from 'ag-grid-angular';
import { CaseentryComponent } from './caseentry.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { CaseMachineManager } from 'src/app/shared/services/restcontroller/bizservice/cashmacine.service';
import { CalendarModule } from 'primeng/calendar';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [CaseentryComponent, CaseentryyComponent],
  imports: [
    CommonModule,
    CaseentryRoutingModule,
    FormsModule,
    BreadcrumbModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    AgGridModule.withComponents([]),
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    DatePipe,
    CaseEntryManager,
    CaseMachineManager
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CaseentryModule { }
