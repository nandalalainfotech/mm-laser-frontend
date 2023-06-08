import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css']
})
export class ImportExportComponent implements OnInit {
  @Input() lang:any;

   constructor( private translateService: TranslateService,) { 
    // translateService.setDefaultLang(this.translateService.store.currentLang);
  }

  ngOnInit(): void {
    // this.translateService.setDefaultLang('English');
  }

}
