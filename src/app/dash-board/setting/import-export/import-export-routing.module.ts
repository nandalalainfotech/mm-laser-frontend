import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ImportExportComponent } from './import-export.component';

const routes: Routes = [
  {
    path: "",
    component: ImportExportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule]
})
export class ImportExportRoutingModule { }
