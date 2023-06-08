import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ItemsPricingRoutingModule } from './items-pricing-routing.module';
import { ItemGroupComponent } from './item-group/item-group.component';
import { ItemPriceComponent } from './item-price/item-price.component';
import { ProductBundleComponent } from './product-bundle/product-bundle.component';
import { PricingRuleComponent } from './pricing-rule/pricing-rule.component';
import { ItemComponent } from './item/item.component';
import { ShippingRuleComponent } from './shipping-rule/shipping-rule.component';
import { ItemsPricingComponent } from './items-pricing.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ItemGroupManager } from 'src/app/shared/services/restcontroller/bizservice/item-group.service';
import { ItemPriceManager } from 'src/app/shared/services/restcontroller/bizservice/item-price.service';
import { ProdBundleManager } from 'src/app/shared/services/restcontroller/bizservice/product-bundle.service';
import { PricingRuleManager } from 'src/app/shared/services/restcontroller/bizservice/pricing-rule.service';
import { ShippingRuleManager } from 'src/app/shared/services/restcontroller/bizservice/shipping-rule.service';
import { SalesItemManager } from 'src/app/shared/services/restcontroller/bizservice/sales-item.service';
import { CalendarModule } from 'primeng/calendar';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/','.json');
  }
@NgModule({
    declarations: [
        ItemsPricingComponent,
        ItemGroupComponent,
        ItemPriceComponent,
        ProductBundleComponent,
        PricingRuleComponent,
        ItemComponent,
        ShippingRuleComponent
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        ItemsPricingRoutingModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient],
            },
            defaultLanguage: 'en-US',
          }),
        AgGridModule.withComponents([]),
        CalendarModule,
        NgxMaskModule.forRoot()
    ],
    providers: [
        ItemGroupManager,
        ItemPriceManager,
        ProdBundleManager,
        PricingRuleManager,
        ShippingRuleManager,
        SalesItemManager,
        SalesItemManager,
        DatePipe
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class ItemsPricingModule { }
