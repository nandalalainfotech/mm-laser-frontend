import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockAnalyticsDetailsRoutingModule } from './stock-analytics-details-routing.module';
import { DelNoteTrendComponent } from './del-note-trend/del-note-trend.component';
import { PurRecptTrendComponent } from './pur-recpt-trend/pur-recpt-trend.component';
import { StockAnalyticsDetailsComponent } from './stock-analytics-details.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { DelNoteTrendManager } from 'src/app/shared/services/restcontroller/bizservice/del-note-trend.service';
import { PurRecptTrendManager } from 'src/app/shared/services/restcontroller/bizservice/pur-recpt-trend.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { NgxMaskModule } from 'ngx-mask';
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
    StockAnalyticsDetailsComponent,
    DelNoteTrendComponent, 
    PurRecptTrendComponent
  ],

  imports: [
    CommonModule,
    StockAnalyticsDetailsRoutingModule,
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
    NgxMaskModule.forRoot(),
    MatTabsModule
  ],
  providers: [
    DelNoteTrendManager,
    PurRecptTrendManager,
    SalesItemManager
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] 
})

export class StockAnalyticsDetailsModule { }