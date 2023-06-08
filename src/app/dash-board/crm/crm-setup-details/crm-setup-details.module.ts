import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmSetupDetailsRoutingModule } from './crm-setup-details-routing.module';
import { CrmCommunicationComponent } from './crm-communication/crm-communication.component';
import { CrmCustGroupComponent } from './crm-cust-group/crm-cust-group.component';
import { CrmTerritoryComponent } from './crm-territory/crm-territory.component';
import { CrmSetupDetailsComponent } from './crm-setup-details.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CrmCommunicationManager } from 'src/app/shared/services/restcontroller/bizservice/crm-communication.service';
import { CrmCustGroupManager } from 'src/app/shared/services/restcontroller/bizservice/crm-cust-group.service';
import { CrmTerritoryManager } from 'src/app/shared/services/restcontroller/bizservice/crm-territory.service';
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
        CrmCommunicationComponent,
        CrmCustGroupComponent,
        CrmTerritoryComponent,
        CrmSetupDetailsComponent

    ],
    imports: [
        CommonModule,
        CrmSetupDetailsRoutingModule,
        BreadcrumbModule,
        DataTablesModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
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
    providers:[
        CrmCommunicationManager,
        CrmCustGroupManager,
        CrmTerritoryManager
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CrmSetupDetailsModule { }
