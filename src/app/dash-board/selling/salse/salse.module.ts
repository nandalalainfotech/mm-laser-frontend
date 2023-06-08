import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SalseRoutingModule } from './salse-routing.module';
import { QuotTrendsComponent } from './quot-trends/quot-trends.component';
import { SalseOrderComponent } from './salse-order/salse-order.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { SalseComponent } from './salse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SalseOrderManager } from 'src/app/shared/services/restcontroller/bizservice/salse-order.service';
import { CalendarModule } from 'primeng/calendar';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
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
        SalseComponent,
        QuotTrendsComponent,
        SalseOrderComponent
    ],
    imports: [
        CommonModule,
        SalseRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        CalendarModule,
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
        SalseOrderManager,
        DatePipe,
        SalesItemManager

    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SalseModule { }
