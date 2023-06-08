import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointOfSaleRoutingModule } from './point-of-sale-routing.module';
import { PosComponent } from './pos/pos.component';
import { PointOfSaleComponent } from './point-of-sale.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
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
        PointOfSaleComponent,
        PosComponent
    ],
    imports: [
        CommonModule,
        PointOfSaleRoutingModule,
        BreadcrumbModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient],
            },
            defaultLanguage: 'en-US',
          }),
        ReactiveFormsModule, AgGridModule.withComponents([])
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class PointOfSaleModule { }
