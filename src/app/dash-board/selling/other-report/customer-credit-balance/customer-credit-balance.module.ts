import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerCreditBalanceRoutingModule } from './customer-credit-balance-routing.module';
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
    declarations: [],
    imports: [
        CommonModule,
        CustomerCreditBalanceRoutingModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient],
            },
            defaultLanguage: 'en-US',
          }),
    ]
})
export class CustomerCreditBalanceModule { }
