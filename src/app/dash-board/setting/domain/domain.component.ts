import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { DomainManager } from 'src/app/shared/services/restcontroller/bizservice/domain.service';
import { Domain001mb } from 'src/app/shared/services/restcontroller/entities/Domain001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {
  @Input() lang:any;
  frameworkComponents: any;
  insertUser: string = '';
  insertDatetime: Date | any;
  domainId: number | any;
  domainname: string = '';
  description: string = '';
  domain: Domain001mb[] = [];
  public gridOptions: GridOptions | any;
  domainForm: FormGroup | any;
  submitted = false;
  user?: User001mb;
  parentMenuString: string = '';
  childMenuString: string = '';

  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;
  constructor(
    private domainManager: DomainManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private authManager: AuthManager,
    private translateService: TranslateService,
    private modalService: NgbModal,
    private router: Router,
    private dataSharedService: DataSharedService
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent,
    };
    translateService.setDefaultLang(this.translateService.store.currentLang);
  }
  ngOnInit() {

    this.authManager.currentUserSubject.subscribe((object: any) => {
      let lang = (object.language2?.name);
      this.translateService.setDefaultLang(lang); 
  })

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

    this.domainForm = this.formBuilder.group({
      domainname: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.createDataGrid001();
    this.domainManager.alldomain().subscribe((response: any) => {
      this.domain = deserialize<Domain001mb[]>(Domain001mb,response);
      if (this.domain.length > 0) {
        this.gridOptions?.api?.setRowData(this.domain);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() {
    return this.domainForm.controls;
  }
  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',
      onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
        headerName: '#ID',
        field: 'domainId',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Domain Name',
        field: 'domainname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Domain Description',
        field: 'description',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 200,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: 'Edit',
        },
      },
      {
        headerName: 'Delete',
        cellRenderer: 'iconRenderer',
        width: 200,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete',
        },
      },
      {
        headerName: 'Audit',
        cellRenderer: 'iconRenderer',
        width: 200,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onAuditButtonClick.bind(this),
          label: 'Audit',
        },
      },
    ];
  }
  onEditButtonClick(params: any) {
    this.domainId = params.data.domainId;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.domainForm.patchValue({
      domainname: params.data.domainname,
      description: params.data.description,
    });
  }

  onDeleteButtonClick(params: any) {
    this.domainManager.domaindelete(params.data.domainId).subscribe((response: any) => {
      for (let i = 0; i < this.domain.length; i++) {
        if (this.domain[i].domainId == params.data.domainId) {
          this.domain?.splice(i, 1);
          break;
        }
      }
      const selectedRows = params.api.getSelectedRows();
      params.api.applyTransaction({ remove: selectedRows });
      this.calloutService.showSuccess('Order Removed Successfully');
    }
    );
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = 'Domain';
    modalRef.componentInstance.details = params.data;
  }

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
  onOrderClick(event: any, domainForm: any) {
    // console.log("event,domainForm",event, domainForm);
    this.markFormGroupTouched(this.domainForm);
    this.submitted = true;
    if (this.domainForm.invalid) {
      return;
    }

    let domain001mb = new Domain001mb();
    domain001mb.domainname = this.f.domainname.value ? this.f.domainname.value : '';
    domain001mb.description = this.f.description.value ? this.f.description.value : '';

    if (this.domainId) {
      domain001mb.domainId = this.domainId;
      domain001mb.insertUser = this.insertUser;
      domain001mb.insertDatetime = this.insertDatetime;
      domain001mb.updatedUser = this.authManager.getcurrentUser.username;
      domain001mb.updatedDatetime = new Date();
      this.domainManager.domainupdate(domain001mb).subscribe(
        (response: any) => {
          this.calloutService.showSuccess('Order Updated Successfully');
          let domain001mb = deserialize<Domain001mb>(Domain001mb, response);
          for (let domains of this.domain) {
            if (domains.domainId == domain001mb.domainId) {
              domains.domainname = domain001mb.domainname;
              domains.description = domain001mb.description;
              domains.insertUser = this.insertUser;
              domains.insertDatetime = this.insertDatetime;
              domains.updatedUser =
                this.authManager.getcurrentUser.username;
                domains.updatedDatetime = new Date();
            }
          }
          this.gridOptions.api.setRowData(this.domain);
          this.gridOptions.api.refreshView();
          this.gridOptions.api.deselectAll();
          this.domainForm.reset();
          this.submitted = false;
          this.domainId = null;
        }
      );
    } else {
      domain001mb.insertUser = this.authManager.getcurrentUser.username;
      domain001mb.insertDatetime = new Date();
      this.domainManager.domainsave(domain001mb).subscribe(
        (response: any) => {
        
          this.calloutService.showSuccess('Order Saved Successfully');
          let domain001mb = deserialize<Domain001mb>(Domain001mb, response);
          this.domain?.push(domain001mb);
          const newItems = [
            JSON.parse(JSON.stringify(domain001mb)),
          ];
          this.gridOptions.api.applyTransaction({ add: newItems });
          this.domainForm.reset();
          this.submitted = false;
        }
      );
    }
  }
  onReset() {
    this.domainForm.reset();
    this.submitted = false;
  }
}