import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AgGridModule } from 'ag-grid-angular';
import { NgxMaskModule } from 'ngx-mask';
import { CalendarModule } from 'primeng/calendar';
import { createTranslateLoader } from 'src/app/app.module';
import { ProjectQuantityManager } from 'src/app/shared/services/restcontroller/bizservice/projected-quantity.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { StockAgeingManager } from 'src/app/shared/services/restcontroller/bizservice/stock-ageing.service';
import { StockBalanceManager } from 'src/app/shared/services/restcontroller/bizservice/stock-balance.service';
import { StockLedgerManager } from 'src/app/shared/services/restcontroller/bizservice/stock-ledger.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { ProjectedQuantityComponent } from './projected-quantity/projected-quantity.component';
import { StockAgeingComponent } from './stock-ageing/stock-ageing.component';
import { StockBalanceComponent } from './stock-balance/stock-balance.component';
import { StockLedgerComponent } from './stock-ledger/stock-ledger.component';
import { StockReportRoutingModule } from './stock-report-routing.module';
import { StockReportComponent } from './stock-report.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/','.json');
  }
@NgModule({
    declarations: [
        StockReportComponent,
        StockLedgerComponent,
        StockBalanceComponent,
        ProjectedQuantityComponent,
        StockAgeingComponent
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        StockReportRoutingModule,
        CalendarModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient],
            },
            defaultLanguage: 'en-US',
          }),
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot()
    ],
    providers:[
        StockLedgerManager,
        StockBalanceManager,
        ProjectQuantityManager,
        StockAgeingManager,
        SalesItemManager,
        DatePipe
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class StockReportModule { }
