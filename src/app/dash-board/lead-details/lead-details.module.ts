import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadDetailsRoutingModule } from './lead-details-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { LeadDetailsComponent } from './lead-details.component';
import { AgGridModule } from 'ag-grid-angular';
import { LeadDetailsManager } from 'src/app/shared/services/restcontroller/bizservice/lead-detail.service';
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
  declarations: [LeadDetailsComponent],
  imports: [
    CommonModule,
    LeadDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      defaultLanguage: 'English',
    }),
    BreadcrumbModule,
    AgGridModule.withComponents([]),
  ],
  providers:[
    LeadDetailsManager
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class LeadDetailsModule { }
