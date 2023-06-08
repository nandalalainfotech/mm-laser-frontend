import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockSetupDetailsRoutingModule } from './stock-setup-details-routing.module';
import { StkSettingComponent } from './stk-setting/stk-setting.component';
import { WareHouseComponent } from './ware-house/ware-house.component';
import { UnitOfMeasureComponent } from './unit-of-measure/unit-of-measure.component';
import { BrandComponent } from './brand/brand.component';
import { StockSetupDetailsComponent } from './stock-setup-details.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StockSettingManager } from 'src/app/shared/services/restcontroller/bizservice/stk-setting.service';
import { BrandManager } from 'src/app/shared/services/restcontroller/bizservice/brand.service';
import { UnitofMeaseureManager } from 'src/app/shared/services/restcontroller/bizservice/unit-of-measure.service';
import { WareHouseManager } from 'src/app/shared/services/restcontroller/bizservice/ware-house.service';
import { StockLedgerManager } from 'src/app/shared/services/restcontroller/bizservice/stock-ledger.service';
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
        StockSetupDetailsComponent,
        StkSettingComponent,
        WareHouseComponent,
        UnitOfMeasureComponent,
        BrandComponent
    ],

    imports: [
        CommonModule,
        StockSetupDetailsRoutingModule,
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
        StockSettingManager,
        BrandManager,
        UnitofMeaseureManager,
        StockLedgerManager,
        WareHouseManager
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})

export class StockSetupDetailsModule { }