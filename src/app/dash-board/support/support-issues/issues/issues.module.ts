import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesRoutingModule } from './issues-routing.module';
import { IssueComponent } from './issue/issue.component';
import { MinutesToResponseComponent } from './minutes-to-response/minutes-to-response.component';
import { BreadcrumbModule } from 'src/app/dash-board/breadcrumb/breadcrumb.module';
import { IssuesComponent } from './issues.component';
import { CommunicationComponent } from '../communication/communication.component';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
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
        IssuesComponent,
        IssueComponent,
        MinutesToResponseComponent,
        CommunicationComponent
    ],
    imports: [
        CommonModule,
        IssuesRoutingModule,
        BreadcrumbModule,
        AgGridModule.withComponents([]),
        MatTabsModule,
        MatMenuModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient],
            },
            defaultLanguage: 'en-US',
          }),
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class IssuesModule { }
