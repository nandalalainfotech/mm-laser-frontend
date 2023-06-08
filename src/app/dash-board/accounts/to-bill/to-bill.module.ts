import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToBillRoutingModule } from './to-bill-routing.module';
import { OrderItemComponent } from './order-item/order-item.component';
import { DeliverItemComponent } from './deliver-item/deliver-item.component';
import { PurchaseItemComponent } from './purchase-item/purchase-item.component';
import { ReceiveItemComponent } from './receive-item/receive-item.component';
import { ToBillComponent } from './to-bill.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { AgGridModule } from 'ag-grid-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const environment = {
    production: true,
    appRootPrefix: '/<>'
    };
  export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }
  

@NgModule({
    declarations: [
        OrderItemComponent,
        DeliverItemComponent,
        PurchaseItemComponent,
        ReceiveItemComponent,
        ToBillComponent
    ],
    imports: [
        CommonModule,
        ToBillRoutingModule,
        BreadcrumbModule,
        AgGridModule.withComponents([]),
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient],
            },
            defaultLanguage: 'en-US',
          }),
        MatTabsModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ToBillModule { }
