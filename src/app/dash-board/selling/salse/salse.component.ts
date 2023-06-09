import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
    selector: 'app-salse',
    templateUrl: './salse.component.html',
    styleUrls: ['./salse.component.css'],
})
export class SalseComponent implements OnInit {
    hexToRgb: any;
    rgbToHex: any;
    @Input() lang: any;
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    constructor(private authManager: AuthManager,
        private translateService: TranslateService,) {
        translateService.setDefaultLang(this.translateService.store.currentLang);
    }

    ngOnInit(): void {
        this.authManager.currentUserSubject.subscribe((object: any) => {
            let lang = (object.language2?.name);
            this.translateService.setDefaultLang(lang);
        });

        this.authManager.currentUserSubject.subscribe((object: any) => {
            let rgb = Utils.hexToRgb(object.theme);
            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.6);
            this.colorthemes_2 = Utils.rgbToHex(rgb, -0.3);
            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.2);
        });
    }
}
