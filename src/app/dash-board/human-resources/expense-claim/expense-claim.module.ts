import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseClaimRoutingModule } from './expense-claim-routing.module';
import { ExpensesClaimsComponent } from './expenses-claims/expenses-claims.component';
import { ExpenseClaimComponent } from './expense-claim.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ExpensesclmManager } from 'src/app/shared/services/restcontroller/bizservice/expenses.claims.service';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/','.json');
  }
@NgModule({
    declarations: [
        ExpenseClaimComponent,
        ExpensesClaimsComponent

    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatSidenavModule,
        FlexLayoutModule,
        ExpenseClaimRoutingModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient],
            },
            defaultLanguage: 'en-US',
          }),
        AgGridModule.withComponents([]),
        NgxMaskModule.forRoot()
    ],
    providers:[ ExpensesclmManager],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ExpenseClaimModule { }
