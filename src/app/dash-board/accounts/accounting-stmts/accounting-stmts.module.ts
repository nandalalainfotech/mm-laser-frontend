import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingStmtsRoutingModule } from './accounting-stmts-routing.module';
import { AccountingStmtsComponent } from './accounting-stmts.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { TrialBalanceComponent } from './trial-balance/trial-balance.component';
import { ProfitLossComponent } from './profit-loss/profit-loss.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { BalanceSheetManager } from 'src/app/shared/services/restcontroller/bizservice/balancesheet.service';
import { CashFlowManager } from 'src/app/shared/services/restcontroller/bizservice/cashflow.service';
import { ProfitLossManager } from 'src/app/shared/services/restcontroller/bizservice/profitloss.service';
import { TrailBalanceManager } from 'src/app/shared/services/restcontroller/bizservice/trail-balance.service';
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
        AccountingStmtsComponent,
        TrialBalanceComponent,
        ProfitLossComponent,
        CashFlowComponent,
        BalanceSheetComponent
    ],
    imports: [
        CommonModule,
        AccountingStmtsRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([]),
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
        BalanceSheetManager,
        CashFlowManager,
        ProfitLossManager,
        TrailBalanceManager
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AccountingStmtsModule { }
