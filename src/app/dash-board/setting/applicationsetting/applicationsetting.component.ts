import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AppSettingManager } from 'src/app/shared/services/restcontroller/bizservice/applicationsetting.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Appsetting001mb } from 'src/app/shared/services/restcontroller/entities/Appsetting001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-applicationsetting',
  templateUrl: './applicationsetting.component.html',
  styleUrls: ['./applicationsetting.component.css']
})
export class ApplicationsettingComponent implements OnInit {

  frameworkComponents: any;
  appId: number | any;
  property: string = "";
  ProductionOrder: boolean = false;
  link: string = "";
  loginUser: string = "";
  status: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  appsetting: any = [];
  setting: any = [];
  submitted = false;
  appForm: FormGroup | any;
  appsetting001mbs: Appsetting001mb[] = [];
  public gridOptions: GridOptions | any;
  user?: User001mb;
  parentMenuString: string = '';
  childMenuString: string = '';

  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;
  constructor(private calloutService: CalloutService,
      private appSettingManager: AppSettingManager,
      private formBuilder: FormBuilder,
      private authManager: AuthManager,
      private dataSharedService: DataSharedService
  ) {
      this.frameworkComponents = {
          iconRenderer: IconRendererComponent,
      };
  }
  ngOnInit() {
      this.user = this.authManager.getcurrentUser;
      this.dataSharedService.currentMenuObject.subscribe((object: any) => {
          this.parentMenuString = object.parentMenuString;
          this.childMenuString = object.childMenuString;
      });
      this.authManager.currentUserSubject.subscribe((object: any) => {
          let rgb = Utils.hexToRgb(object.theme);

          this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

          this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

          this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

          this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
      });

      this.appForm = this.formBuilder.group({
          ProductionOrder: true,
          ProductionPlanningTool: false,
          ProductStockEntry: false,
          ProductTimeSheet: false,
          BillOfMaterials: false,
          ItemStatus: false,
          WorkStation: false,
          BOMOperation: false,
          Tools: false,
          ManufactureSettings: false,
          OpenProductionOrder: false,
          ProductionOrderinProgress: false,
          CompletedProductionOrder: false,
          BOMType: false,
          IssueItem: false,
          AccountsReceivable: false,
          AccountsReceivableSummary: false,
          DeliveredItemsToBeBilled: false,
          OrderedItemsToBeBilled: false,
          AccountsPayable: false,
          AccountsPayableSummary: false,
          ReceivedItemsToBeBilled: false,
          ItemWisePurchaseRegister: false,
          PurchaseOrderItemsToBeBilled: false,
          PaymentRequest: false,
          WisePurchaseRegister: false,
          GeneralLedger: false,
          JournalEntery: false,
          ChartOfAccounts: false,
          CompanyAndAccounts: false,
          Asset: false,
          Customer: false,
          Supplier: false,
          Item: false,
          TrialBalance: false,
          BalanceSheet: false,
          CashFlow: false,
          ProfitAndLossStatement: false,
          UpdateBankTransactionDates: false,
          MatchPaymentsWithInvoices: false,
          BankReconciliationStatment: false,
          BankClearenceSummary: false,
          SalesTaxesAndCharges: false,
          PurchaseTaxesAndCharges: false,
          TaxRule: false,
          SalesRegister: false,
          PurchaseRegister: false,
          CostCenterChart: false,
          BudgetAccountType: false,
          Budget: false,
          BudgetVarianceReport: false,
          PeriodClosingVoucher: false,
          AssetMovement: false,
          ChequePrintTemplate: false,
          AccountsSettings: false,
          FiscalYear: false,
          Currency: false,
          CurrencyExchange: false,
          PaymentGatewayAccount: false,
          PointOfSaleProfile: false,
          TermsAndConditions: false,
          ModeOfPayment: false,
          GrossProfit: false,
          PurchaseInvoice: false,
          SalesInvoice: false,
          PurchaseMaterialRequest: false,
          PurchaseQuotationRequest: false,
          PurchaseOrder: false,
          SupplierQuotation: false,
          Type: false,
          Status: false,
          ItemGroup: false,
          ItemPrice: false,
          ProductBundle: false,
          PricingRule: false,
          ShippingRule: false,
          PUAnalytics: false,
          SupplierWiseAnalytics: false,
          OrderTrend: false,
          ItemRequest: false,
          ItemOrdered: false,
          MaterialRequestSupplyWise: false,
          ItemPUHistory: false,
          QuotationTrends: false,
          SalesOrder: false,
          CustomerGroup: false,
          Contact: false,
          Address: false,
          SalesAnalytics: false,
          SalesFunnel: false,
          CustomerAcqustionAndLoyalty: false,
          SalesOrderTrends: false,
          Territory: false,
          SalesPartner: false,
          SalesPerson: false,
          TerritoryTargetVarianceItem: false,
          SalesPersonTargetVarianceItem: false,
       

      });

      this.createDataGrid001();
      this.appSettingManager.allappsettings().subscribe((response) => {

          this.appsetting001mbs = deserialize<Appsetting001mb[]>(

              Appsetting001mb,
              response
          );
          console.log("appsetting001mbs", this.appsetting001mbs);
          for (let i = 0; i < this.appsetting001mbs.length; i++) {
              if (this.appsetting001mbs[i].property == "ProductionOrder") {
                  this.appForm.controls['ProductionOrder'].setValue(true)
                  console.log("test", this.appsetting001mbs[i].property);
              }
          }

//           for (let i = 0; i < this.appsetting001mbs.length; i++) {
//             if (this.appsetting001mbs[i].property == "ProductionOrder") {
//                 this.appForm.controls['ProductionOrder'].setValue(true)
//                 console.log("test", this.appsetting001mbs[i].property);
//             }
//         }

//         for (let i = 0; i < this.appsetting001mbs.length; i++) {
//           if (this.appsetting001mbs[i].property == "ProductionOrder") {
//               this.appForm.controls['ProductionOrder'].setValue(true)
//               console.log("test", this.appsetting001mbs[i].property);
//           }
//       }

//       for (let i = 0; i < this.appsetting001mbs.length; i++) {
//         if (this.appsetting001mbs[i].property == "ProductionOrder") {
//             this.appForm.controls['ProductionOrder'].setValue(true)
//             console.log("test", this.appsetting001mbs[i].property);
//         }
//     }    for (let i = 0; i < this.appsetting001mbs.length; i++) {
//       if (this.appsetting001mbs[i].property == "ProductionOrder") {
//           this.appForm.controls['ProductionOrder'].setValue(true)
//           console.log("test", this.appsetting001mbs[i].property);
//       }
//   }
//   for (let i = 0; i < this.appsetting001mbs.length; i++) {
//     if (this.appsetting001mbs[i].property == "ProductionOrder") {
//         this.appForm.controls['ProductionOrder'].setValue(true)
//         console.log("test", this.appsetting001mbs[i].property);
//     }
// }
// for (let i = 0; i < this.appsetting001mbs.length; i++) {
//   if (this.appsetting001mbs[i].property == "ProductionOrder") {
//       this.appForm.controls['ProductionOrder'].setValue(true)
//       console.log("test", this.appsetting001mbs[i].property);
//   }
// }
// for (let i = 0; i < this.appsetting001mbs.length; i++) {
//   if (this.appsetting001mbs[i].property == "ProductionOrder") {
//       this.appForm.controls['ProductionOrder'].setValue(true)
//       console.log("test", this.appsetting001mbs[i].property);
//   }
// }
// for (let i = 0; i < this.appsetting001mbs.length; i++) {
//   if (this.appsetting001mbs[i].property == "ProductionOrder") {
//       this.appForm.controls['ProductionOrder'].setValue(true)
//       console.log("test", this.appsetting001mbs[i].property);
//   }
// }
// for (let i = 0; i < this.appsetting001mbs.length; i++) {
//   if (this.appsetting001mbs[i].property == "ProductionOrder") {
//       this.appForm.controls['ProductionOrder'].setValue(true)
//       console.log("test", this.appsetting001mbs[i].property);
//   }
// }
// for (let i = 0; i < this.appsetting001mbs.length; i++) {
//   if (this.appsetting001mbs[i].property == "ProductionOrder") {
//       this.appForm.controls['ProductionOrder'].setValue(true)
//       console.log("test", this.appsetting001mbs[i].property);
//   }
// }
// for (let i = 0; i < this.appsetting001mbs.length; i++) {
//   if (this.appsetting001mbs[i].property == "ProductionOrder") {
//       this.appForm.controls['ProductionOrder'].setValue(true)
//       console.log("test", this.appsetting001mbs[i].property);
//   }
// }
// for (let i = 0; i < this.appsetting001mbs.length; i++) {
//   if (this.appsetting001mbs[i].property == "ProductionOrder") {
//       this.appForm.controls['ProductionOrder'].setValue(true)
//       console.log("test", this.appsetting001mbs[i].property);
//   }
// }
// for (let i = 0; i < this.appsetting001mbs.length; i++) {
//   if (this.appsetting001mbs[i].property == "ProductionOrder") {
//       this.appForm.controls['ProductionOrder'].setValue(true)
//       console.log("test", this.appsetting001mbs[i].property);
//   }
// }
// for (let i = 0; i < this.appsetting001mbs.length; i++) {
//   if (this.appsetting001mbs[i].property == "ProductionOrder") {
//       this.appForm.controls['ProductionOrder'].setValue(true)
//       console.log("test", this.appsetting001mbs[i].property);
//   }
// }
// for (let i = 0; i < this.appsetting001mbs.length; i++) {
//   if (this.appsetting001mbs[i].property == "ProductionOrder") {
//       this.appForm.controls['ProductionOrder'].setValue(true)
//       console.log("test", this.appsetting001mbs[i].property);
//   }
// }
// for (let i = 0; i < this.appsetting001mbs.length; i++) {
//   if (this.appsetting001mbs[i].property == "ProductionOrder") {
//       this.appForm.controls['ProductionOrder'].setValue(true)
//       console.log("test", this.appsetting001mbs[i].property);
//   }
// }
// for (let i = 0; i < this.appsetting001mbs.length; i++) {
//   if (this.appsetting001mbs[i].property == "ProductionOrder") {
//       this.appForm.controls['ProductionOrder'].setValue(true)
//       console.log("test", this.appsetting001mbs[i].property);
//   }
// }
// for (let i = 0; i < this.appsetting001mbs.length; i++) {
//   if (this.appsetting001mbs[i].property == "ProductionOrder") {
//       this.appForm.controls['ProductionOrder'].setValue(true)
//       console.log("test", this.appsetting001mbs[i].property);
//   }
// }
// for (let i = 0; i < this.appsetting001mbs.length; i++) {
//   if (this.appsetting001mbs[i].property == "ProductionOrder") {
//       this.appForm.controls['ProductionOrder'].setValue(true)
//       console.log("test", this.appsetting001mbs[i].property);
//   }
// }


      });
  }
  get f() {
      return this.appForm.controls;
  }
  createDataGrid001(): void { }

  onFirstDataRendered(params: any) {
      params.api.sizeColumnsToFit();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
      (<any>Object).values(formGroup.controls).forEach((control: any) => {
          control.markAsTouched();
          if (control.controls) {
              this.markFormGroupTouched(control);
          }
      });
  }
  onClick(event: any, property: string = "") {
      if (event.target.checked && this.appsetting.length < 10) {
          let setting: any = { property: property, link: event.target.value };
          this.appsetting.push(setting);
      } else if (event.target.checked) {
          for (let i = 0; i < this.appsetting.length; i++) {
              if (this.appsetting[i].link == event.target.value) {
                  this.appsetting.splice(i, 1);
                  break;

              }
          }
      }
      else {
          event.target.checked = false;
          this.calloutService.showWarning("please select maximum 10 components");
      }
  }


  onSubmitClick(event: any, property: string = "") {
      let appsetting001mbs: Appsetting001mb[] = [];
      for (let i = 0; i < this.appsetting.length; i++) {
          let appsetting001mb = new Appsetting001mb();
          appsetting001mb.property = this.appsetting[i].property;
          appsetting001mb.link = this.appsetting[i].link;
          appsetting001mb.status = "Y";
          appsetting001mb.loginUser = this.authManager.getcurrentUser.username;
          appsetting001mb.insertUser = this.authManager.getcurrentUser.username;
          appsetting001mb.insertDatetime = new Date();

          appsetting001mbs.push(appsetting001mb);
      }

      this.appSettingManager.saveappsettings(appsetting001mbs).subscribe((response) => {
          this.calloutService.showSuccess("Application Settings  Saved Successfully");
          // this.appForm.reset();
          this.submitted = false;

      })

  }

  onReset() {
		this.submitted = false;
		this.appForm.reset();
	}
}
