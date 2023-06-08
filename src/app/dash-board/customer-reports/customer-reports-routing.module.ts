import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerDtComponent } from './customer-dt/customer-dt.component';
import { CustomerReportsComponent } from './customer-reports.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerReportsComponent,
        children: [
            {
                path: 'app-customer-dt',
                component: CustomerDtComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, TranslateModule]
})
export class CustomerReportsRoutingModule { }
