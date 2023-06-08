import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportExportRoutingModule } from './import-export-routing.module';
import { ImportExportComponent } from './import-export.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export const environment = {
	production: true,
	appRootPrefix: '/<>'
	};

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

@NgModule({
  declarations: [ ImportExportComponent ],
  imports: [
    CommonModule,
    ImportExportRoutingModule,
    BreadcrumbModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: (createTranslateLoader),
    //     deps: [HttpClient],
    //   },
    //   defaultLanguage: 'en-US',
    // }),
  ]
})
export class ImportExportModule { }
