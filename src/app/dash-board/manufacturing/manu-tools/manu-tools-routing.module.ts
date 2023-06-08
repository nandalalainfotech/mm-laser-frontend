import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ManuToolsComponent } from './manu-tools.component';
import { ToolsComponent } from './tools/tools.component';

const routes: Routes = [
    {
        path: "",
        component: ManuToolsComponent,

        children: [{
            path: "app-tools",
            component: ToolsComponent
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule,TranslateModule]
})
export class ManuToolsRoutingModule { }
