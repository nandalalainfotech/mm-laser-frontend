import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { BreadcrumbModule } from 'src/app/dash-board/breadcrumb/breadcrumb.module';
import { RegistrationRoutingModule } from './registration-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    MatTabsModule,
    FlexLayoutModule,
    AgGridModule.withComponents([])
  ]
})
export class RegistrationModule { }
