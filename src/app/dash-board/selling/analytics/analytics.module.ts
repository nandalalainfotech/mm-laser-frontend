import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AgGridModule } from 'ag-grid-angular';
import { NgxMaskModule } from 'ngx-mask';
import { CalendarModule } from 'primeng/calendar';
import { CustomerLoyaltyManager } from 'src/app/shared/services/restcontroller/bizservice/customer-acqustion-loyalty.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { SalseOrderManager } from 'src/app/shared/services/restcontroller/bizservice/salse-order.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { CustomerAcqustionLoyaltyComponent } from './customer-acqustion-loyalty/customer-acqustion-loyalty.component';
import { QuotationTrendsComponent } from './quotation-trends/quotation-trends.component';
import { SalesAnalyticsComponent } from './sales-analytics/sales-analytics.component';
import { SalesFunnelComponent } from './sales-funnel/sales-funnel.component';
import { SalesOrderTrendsComponent } from './sales-order-trends/sales-order-trends.component';

export const environment = {
	production: true,
	appRootPrefix: '/<>'
	};

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }
  

@NgModule({
  declarations: [
    AnalyticsComponent,
    SalesAnalyticsComponent,
    SalesFunnelComponent,
    CustomerAcqustionLoyaltyComponent,
    QuotationTrendsComponent,
    SalesOrderTrendsComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    CalendarModule,
    NgxMaskModule.forRoot(),
    MatTabsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      defaultLanguage: 'en-US',
    }),
  ],
  providers: [
    CustomerLoyaltyManager,
    SalseOrderManager,
    SalesItemManager,
    DatePipe
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class AnalyticsModule { }
