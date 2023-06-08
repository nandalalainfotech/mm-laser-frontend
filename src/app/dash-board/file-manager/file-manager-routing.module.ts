import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FileManagerComponent } from './file-manager.component';

const routes: Routes = [
    {
        path: "",
        component: FileManagerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule,TranslateModule]
})
export class FileManagerRoutingModule { }
