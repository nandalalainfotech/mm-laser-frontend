import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AccToolsRoutingModule } from './acc-tools-routing.module';
import { PeriodclosingVoucherComponent } from './periodclosing-voucher/periodclosing-voucher.component';
import { AssetMovementComponent } from './asset-movement/asset-movement.component';
import { ChequeprintTemplateComponent } from './chequeprint-template/chequeprint-template.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { AccToolsComponent } from './acc-tools.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AssetMovementManager } from 'src/app/shared/services/restcontroller/bizservice/asset-movement.service';
import { ChequePrintManager } from 'src/app/shared/services/restcontroller/bizservice/chequeprint-template.service';
import { PeriodClosingManager } from 'src/app/shared/services/restcontroller/bizservice/periodclosing-voucher.service';
import { CalendarModule } from 'primeng/calendar';
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
        PeriodclosingVoucherComponent,
        AssetMovementComponent,
        ChequeprintTemplateComponent,
        AccToolsComponent
    ],
    imports: [
        CommonModule,
        AccToolsRoutingModule,
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
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
        CalendarModule,
        MatTabsModule
    ],
    exports: [],
    providers: [
        AssetMovementManager,
        ChequePrintManager,
        PeriodClosingManager,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AccToolsModule { }
