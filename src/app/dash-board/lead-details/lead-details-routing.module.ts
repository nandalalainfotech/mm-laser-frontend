import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LeadDetailsComponent } from './lead-details.component';

const routes: Routes = [
  {
    path:"",
    component:LeadDetailsComponent,
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class LeadDetailsRoutingModule { }
