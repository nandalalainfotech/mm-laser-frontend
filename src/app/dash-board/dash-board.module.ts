import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LineChartModule } from '@swimlane/ngx-charts';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { GojsAngularModule } from 'gojs-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ColorPickerModule } from 'ngx-color-picker';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ApplanguagesettingManager } from '../shared/services/restcontroller/bizservice/applanguagesetting.service';
import { BookingentryManager } from '../shared/services/restcontroller/bizservice/bookingentry.service';
import { DoctormasterManager } from '../shared/services/restcontroller/bizservice/doctormaster.service';
import { MachinemasterManager } from '../shared/services/restcontroller/bizservice/machinemaster.service';
import { UserManager } from '../shared/services/restcontroller/bizservice/user.service';
import { DataSharedService } from '../shared/services/services/datashared.service';
import { APiechartComponent } from './body/a-piechart/a-piechart.component';
import { BarchartComponent } from './body/barchart/barchart.component';
import { BodyChartComponent } from './body/body-chart/body-chart.component';
import { BodyComponent } from './body/body.component';
import { ChatBoxComponent } from './body/chat-box/chat-box.component';
import { ClientLoginComponent } from './body/client-login/client-login.component';
import { LogsComponent } from './body/logs/logs.component';
import { ProcessCardComponent } from './body/process-card/process-card.component';
import { ReviewComponent } from './body/review/review.component';
import { StateChartComponent } from './body/state-chart/state-chart.component';
import { StatusOfSiteComponent } from './body/status-of-site/status-of-site.component';
import { TablesComponent } from './body/tables/tables.component';
import { DashboardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SidemenuDashboardComponent } from './sidemenu-dashboard/sidemenu-dashboard.component';

export const environment = {
  production: true,
  appRootPrefix: '/<>'
};
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({

  declarations: [
    DashBoardComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    BodyComponent,
    BodyChartComponent,
    APiechartComponent,
    BarchartComponent,
    LogsComponent,
    StatusOfSiteComponent,
    ProcessCardComponent,
    ChatBoxComponent,
    ClientLoginComponent,
    ReviewComponent,
    TablesComponent,
    SidemenuDashboardComponent,
    StateChartComponent,

  ],

  imports: [
    CommonModule,
    FormsModule,
    LineChartModule,
    ChartsModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    ProgressbarModule.forRoot(),
    RoundProgressModule,
    TranslateModule.forRoot(),
    GojsAngularModule,
    MatMenuModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    NgbModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatTabsModule,
    ColorPickerModule,
    DashboardRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      defaultLanguage: 'en-US',
    }),
  ],
  providers: [DataSharedService, UserManager, ApplanguagesettingManager, DoctormasterManager, MachinemasterManager, BookingentryManager, DatePipe
  ],
  exports: [NgbCollapseModule],
})
export class DashboardModule { }

