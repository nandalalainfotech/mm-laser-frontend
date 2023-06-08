import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationsettingComponent } from './applicationsetting.component';
import { ApplicationsettingRoutingModule } from './applicationsetting-routing.module';
import { AppSettingManager } from 'src/app/shared/services/restcontroller/bizservice/applicationsetting.service';



@NgModule({
  declarations: [ApplicationsettingComponent],
  imports: [
    CommonModule,
    ApplicationsettingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AppSettingManager
  ],
})
export class ApplicationSettingModule { }
