import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DepartmentsComponent } from './departments.component';

const routes: Routes = [ {
  path: '',
  component: DepartmentsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})
export class DepartmentsRoutingModule { }
