import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SettingComponent } from './setting.component';

const routes: Routes = [
    {
        path: "",
        component: SettingComponent,
        children: [
            {
                path: 'app-profile',
                loadChildren: () => import("./profile/profile.module").then(m => m.ProfileModule)
            },
            {
                path: 'app-domain',
                loadChildren: () => import("./domain/domain.module").then(m => m.DomainModule)
            },
            {
                path: 'app-departments',
                loadChildren: () => import("./departments/departments.module").then(m => m.DepartmentsModule)
            },
            {
                path: 'app-settings',
                loadChildren: () => import("./settings/settings.module").then(m => m.SettingsModule)
            },
            {
                path: 'app-favourites',
                loadChildren: () => import("./favourites/favourites.module").then(m => m.FavouritesModule)
            },
            {
                path: 'app-about',
                loadChildren: () => import("./about/about.module").then(m => m.AboutModule)
            },
            {
                path: 'app-import-export',
                loadChildren: () => import("./import-export/import-export.module").then(m => m.ImportExportModule)
            },
            {
                path: 'app-app-language-setting',
                loadChildren: () => import("./app-language-setting/app-language-setting.module").then(m => m.AppLanguageSettingModule)
            },
            {
                path: 'app-user-theme',
                loadChildren: () => import("./user-theme/user-theme.module").then(m => m.UserThemeModule)
            },
            {
                path: 'app-application-logo-setting',
                loadChildren: () => import("./application-logo-setting/application-logo-setting.module").then(m => m.ApplicationlogoSettingModule)
            },
            {
                path: 'app-applicationsetting',
                loadChildren: () => import("./applicationsetting/applicationsetting.module").then(m => m.ApplicationSettingModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, TranslateModule]
})
export class SettingRoutingModule { }
