import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppraisalTemplateComponent } from './appraisal-template/appraisal-template.component';
import { AppraisalComponent } from './appraisal/appraisal.component';
import { AppraisalsComponent } from './appraisals.component';

const routes: Routes = [
    {
        path: "",
        component: AppraisalsComponent,
        children: [
            {
                path: "app-appraisal",
                component: AppraisalComponent,
            },
            {
                path: "app-appraisal-template",
                component: AppraisalTemplateComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule,TranslateModule]
})
export class AppraisalsRoutingModule { }
