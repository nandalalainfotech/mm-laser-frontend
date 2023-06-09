import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { GrossProfitComponent } from './gross-profit/gross-profit.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { AnalyticsComponent } from './analytics.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GrossProfitManager } from 'src/app/shared/services/restcontroller/bizservice/gross-profit.service';
import { PurchaseInvoiceComponent } from './purchase-invoice/purchase-invoice.component';
import { PurchaseInvoiceManager } from 'src/app/shared/services/restcontroller/bizservice/purchase-invoice.service';
import { SalesInvoiceManager } from 'src/app/shared/services/restcontroller/bizservice/sales-invoice.service';
import { CalendarModule } from 'primeng/calendar';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export const environment = {
    production: true,
    appRootPrefix: '/<>'
    };
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }



@NgModule({
    declarations: [
        GrossProfitComponent,
        PurchaseInvoiceComponent,
        SalesInvoiceComponent,
        AnalyticsComponent
    ],
    imports: [
        CommonModule,
        AnalyticsRoutingModule,
        BreadcrumbModule,
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
        NgxMaskModule.forRoot(),
        MatTabsModule
    ],
    providers: [
        GrossProfitManager,
        PurchaseInvoiceManager,
        SalesInvoiceManager,
        DatePipe
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AnalyticsModule { }
