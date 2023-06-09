import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierDetailsRoutingModule } from './supplier-details-routing.module';
import { SupplierTypeComponent } from './supplier-type/supplier-type.component';
import { SupplierStatusComponent } from './supplier-status/supplier-status.component';
import { SupplierDetailsComponent } from './supplier-details.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { BuyingSupplierComponent } from './buying-supplier/buying-supplier.component';
import { AgGridModule } from 'ag-grid-angular';
import { buySuppliersManager } from 'src/app/shared/services/restcontroller/bizservice/buyingsupplies.service';
import { suStatusManager } from 'src/app/shared/services/restcontroller/bizservice/sustatus.service';
import { supTypeManager } from 'src/app/shared/services/restcontroller/bizservice/suptype.service';
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
        SupplierTypeComponent,
        SupplierStatusComponent,
        SupplierDetailsComponent,
        BuyingSupplierComponent
    ],
    imports: [
        CommonModule,
        SupplierDetailsRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        DataTablesModule,
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
    providers:[
        buySuppliersManager,
        suStatusManager,
        supTypeManager
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SupplierDetailsModule { }
