import { Component, HostBinding, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
    selector: 'app-item-price-details',
    templateUrl: './item-price-details.component.html',
    styleUrls: ['./item-price-details.component.css'],
})
export class ItemPriceDetailsComponent implements OnInit {
    hexToRgb: any;
    rgbToHex: any;
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    constructor(private authManager: AuthManager,public translateService: TranslateService,) {
        translateService.setDefaultLang(this.translateService.store.currentLang);
    }

    ngOnInit(): void {
        this.authManager.currentUserSubject.subscribe((object: any) => {
            let lang = (object.language2?.name);
            this.translateService.setDefaultLang(lang); 
        })
        this.authManager.currentUserSubject.subscribe((object: any) => {
            let rgb = Utils.hexToRgb(object.theme);
            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.1);
            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);
            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.3);
        });
    }
}
