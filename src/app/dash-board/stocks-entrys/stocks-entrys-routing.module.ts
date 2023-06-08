import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StocksEntrysComponent } from './stocks-entrys.component';

const routes: Routes = [
    {
        path: '',
        component: StocksEntrysComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule,TranslateModule]
})
export class StocksEntrysRoutingModule { }
