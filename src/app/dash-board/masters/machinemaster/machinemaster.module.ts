import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { BrandmasterManager } from 'src/app/shared/services/restcontroller/bizservice/brandmaster-service';
import { MachinemasterManager } from 'src/app/shared/services/restcontroller/bizservice/machinemaster.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { MachinemasterRoutingModule } from './machinemaster-routing.module';
import { MachinemasterComponent } from './machinemaster.component';

@NgModule({
  declarations: [MachinemasterComponent],
  imports: [
    CommonModule,
    MachinemasterRoutingModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    NgbModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    MachinemasterManager ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class MachinemasterModule { }
