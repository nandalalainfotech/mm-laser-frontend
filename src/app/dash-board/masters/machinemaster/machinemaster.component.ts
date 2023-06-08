import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BrandmasterManager } from 'src/app/shared/services/restcontroller/bizservice/brandmaster-service';
import { MachinemasterManager } from 'src/app/shared/services/restcontroller/bizservice/machinemaster.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Brandmaster001mb } from 'src/app/shared/services/restcontroller/entities/Brandmaster001mb';
import { Machinemaster001mb } from 'src/app/shared/services/restcontroller/entities/Machinemaster001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';


@Component({
  selector: 'app-machinemaster',
  templateUrl: './machinemaster.component.html',
  styleUrls: ['./machinemaster.component.css']
})
export class MachinemasterComponent implements OnInit {

  @Input() lang: any;
  frameworkComponents: any;
  slNo: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  machinename: string = "";
  status: boolean = false;
  machiness: Machinemaster001mb[] = [];
  public gridOptions: GridOptions | any;
  machineForm: FormGroup | any;
  submitted = false;
  parentMenuString: string = '';
  childMenuString: string = '';



  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  constructor(
    private formBuilder: FormBuilder,
    private machinemasterManager: MachinemasterManager,
    private calloutService: CalloutService,
    private translateService: TranslateService,
    private authManager: AuthManager,
    private dataSharedService: DataSharedService,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
    translateService.setDefaultLang(this.translateService.store.currentLang);
  }

  ngOnInit() {

    this.authManager.currentUserSubject.subscribe((object: any) => {
      let lang = (object.language2?.name);
      this.translateService.setDefaultLang(lang);
    })
    this.createDataGrid001();
    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);

      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });


    this.machineForm = this.formBuilder.group({
      machinename: ['', Validators.required],
      status: [''],
    });

    this.machinemasterManager.allmachinemaster().subscribe((response) => {
      this.machiness = deserialize<Machinemaster001mb[]>(Machinemaster001mb, response);
      if (this.machiness.length > 0) {
        this.gridOptions?.api?.setRowData(this.machiness);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    })
  }
  get f() { return this.machineForm.controls; }


  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',
      onFirstDataRendered: this.onFirstDataRendered.bind(this)
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
        headerName: '#Id',
        field: 'slNo',
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
        headerName: 'Machine Name ',
        field: 'machinename',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (param: any) => {
          return param.data.status == 1 ? true : false;
        },
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
          label: 'Edit'
        }
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
          label: 'Delete'
        }
      },
      {
        headerName: 'Audit',
        cellRenderer: 'iconRenderer',
        width: 55,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onAuditButtonClick.bind(this),
          label: 'Audit'
        },
      },
    ];
  }
  onEditButtonClick(params: any) {
    this.slNo = params.data.slNo;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.machineForm.patchValue({
      'machinename': params.data.machinename,
      'status': params.data.status
    });
  }

  onDeleteButtonClick(params: any) {
    this.machinemasterManager.machinemasterdelete(params.data.slNo).subscribe((response: any) => {
      for (let i = 0; i < this.machiness.length; i++) {
        if (this.machiness[i].slNo == params.data.slNo) {
          this.machiness?.splice(i, 1);
          break;
        }
      }
      const selectedRows = params.api.getSelectedRows();
      params.api.applyTransaction({ remove: selectedRows });
      this.calloutService.showSuccess("Order Removed Successfully");
    });
  }


  onAuditButtonClick(params: any) {
    console.log("params", params)
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Machine Master";
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

  onUserClick(event: any, machineForm: any) {
    // console.log("event,machineForm--->", event, machineForm);
    this.markFormGroupTouched(this.machineForm);
    this.submitted = true;
    if (this.machineForm.invalid) {
      return;
    }
    let machinemaster001mb = new Machinemaster001mb();
    machinemaster001mb.machinename = this.f.machinename.value ? this.f.machinename.value : "";
    machinemaster001mb.status = this.f.status.value ? this.f.status.value : false;

    if (this.slNo) {
      machinemaster001mb.slNo = this.slNo;
      machinemaster001mb.insertUser = this.insertUser;
      machinemaster001mb.insertDatetime = this.insertDatetime;
      machinemaster001mb.updatedUser = this.authManager.getcurrentUser.username;
      machinemaster001mb.updatedDatetime = new Date();
      this.machinemasterManager.updatemachinemaster(machinemaster001mb).subscribe((response: any) => {
        this.calloutService.showSuccess("Order Updated Successfully");
        this.machineForm.reset();
        this.submitted = false;
        this.slNo = null;
      })
    }
    else {
      machinemaster001mb.insertUser = this.authManager.getcurrentUser.username;
      machinemaster001mb.insertDatetime = new Date();
      this.machinemasterManager.savemachinemaster(machinemaster001mb).subscribe((response) => {
        console.log("response", response)
        this.calloutService.showSuccess("Order Saved Successfully");
        this.machineForm.reset();
        this.submitted = false;
      })
    }

  }

  onReset() {
    this.machineForm.reset();
    this.submitted = false;
  }
}
