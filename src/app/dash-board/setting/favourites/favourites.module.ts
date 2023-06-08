import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouritesRoutingModule } from './favourites-routing.module';
import { FormsModule } from '@angular/forms';
import { FavouritesManager } from 'src/app/shared/services/restcontroller/bizservice/favourites.service';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FavouritesRoutingModule,
        FormsModule
    ],
    providers: [
        FavouritesManager
    ],
})
export class FavouritesModule { }
