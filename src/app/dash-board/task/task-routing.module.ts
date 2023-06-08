import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TaskComponent } from './task.component';

const routes: Routes = [{
    path: "",
    component: TaskComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule,TranslateModule]
})
export class TaskRoutingModule { }
