import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BankingPaymentsRoutingModule } from './banking-payments-routing.module';
import { UpdateBankComponent } from './update-bank/update-bank.component';
import { MatchPaymentsComponent } from './match-payments/match-payments.component';
import { BankReconciliationComponent } from './bank-reconciliation/bank-reconciliation.component';
import { BankClearanceComponent } from './bank-clearance/bank-clearance.component';
import { BankingPaymentsComponent } from './banking-payments.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BankClearenceManager } from 'src/app/shared/services/restcontroller/bizservice/bankclearence.service';
import { BankreconcillationManager } from 'src/app/shared/services/restcontroller/bizservice/bankreconcillation.servicesa';
import { matchPaymentsManager } from 'src/app/shared/services/restcontroller/bizservice/matchpayments.service';
import { updatebankManager } from 'src/app/shared/services/restcontroller/bizservice/updatebank.service';
import { CalendarModule } from 'primeng/calendar';
import { PayementEntryManager } from 'src/app/shared/services/restcontroller/bizservice/payement-entry.service';
import { NgxMaskModule } from 'ngx-mask';
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
        UpdateBankComponent,
        MatchPaymentsComponent,
        BankReconciliationComponent,
        BankClearanceComponent,
        BankingPaymentsComponent
    ],
    imports: [
        CommonModule,
        BankingPaymentsRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule, 
        AgGridModule.withComponents([]),
        CalendarModule,
        NgxMaskModule.forRoot(),
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
    providers:[
        BankClearenceManager,
        BankreconcillationManager,
        matchPaymentsManager,
        updatebankManager,
        DatePipe,
        PayementEntryManager

    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class BankingPaymentsModule { }
