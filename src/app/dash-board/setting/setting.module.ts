import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FavouritesManager } from 'src/app/shared/services/restcontroller/bizservice/favourites.service';
import { FavouritesComponent } from './favourites/favourites.component';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';



export const environment = {
  production: true,
  appRootPrefix: '/<>'
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [SettingComponent, FavouritesComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    NgxFileDropModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      defaultLanguage: 'en-US',
    }),

  ],
  providers: [FavouritesManager,]
})

export class SettingModule { }
