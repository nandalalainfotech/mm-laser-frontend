import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SupplierComponent } from './supplier.component';

const routes: Routes = [
    {
        path: "",
        component: SupplierComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule,TranslateModule]
})
export class SupplierRoutingModule { }
