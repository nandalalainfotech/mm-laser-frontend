import { CommonModule } from '@angular/common';
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
import { ItemStatusManager } from 'src/app/shared/services/restcontroller/bizservice/item-status.service';
import { MaterialManager } from 'src/app/shared/services/restcontroller/bizservice/material.service';
import { OperationManager } from 'src/app/shared/services/restcontroller/bizservice/operation.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { WorkStationManager } from 'src/app/shared/services/restcontroller/bizservice/work-station.service';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { BomDetailsRoutingModule } from './bom-details-routing.module';
import { BomDetailsComponent } from './bom-details.component';
import { ItemStatusComponent } from './item-status/item-status.component';
import { MaterialComponent } from './material/material.component';
import { OperationComponent } from './operation/operation.component';
import { WorkStationComponent } from './work-station/work-station.component';


export const environment = {
  production: true,
  appRootPrefix: '/<>'
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    BomDetailsComponent,
    MaterialComponent,
    ItemStatusComponent,
    WorkStationComponent,
    OperationComponent
  ],
  imports: [
    CommonModule,
    BomDetailsRoutingModule,
    CommonModule,
    BreadcrumbModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatTabsModule,
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
  ],
  providers: [
    ItemStatusManager,
    WorkStationManager,
    OperationManager,
    MaterialManager,
    SalesItemManager
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class BomDetailsModule { }
