import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CaseEntryManager } from 'src/app/shared/services/restcontroller/bizservice/case-entry.service';
import { CaseMachineManager } from 'src/app/shared/services/restcontroller/bizservice/cashmacine.service';
import { DoctormasterManager } from 'src/app/shared/services/restcontroller/bizservice/doctormaster.service';
import { MachinemasterManager } from 'src/app/shared/services/restcontroller/bizservice/machinemaster.service';
import { Caseentry001mb } from 'src/app/shared/services/restcontroller/entities/Caseentry001mb';
import { Casemachine001wb } from 'src/app/shared/services/restcontroller/entities/Casemachine001wb';
import { Doctormaster001mb } from 'src/app/shared/services/restcontroller/entities/Doctormaster001mb';
import { Machinemaster001mb } from 'src/app/shared/services/restcontroller/entities/Machinemaster001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-caseentryy',
  templateUrl: './caseentryy.component.html',
  styleUrls: ['./caseentryy.component.css']
})
export class CaseentryyComponent implements OnInit {
  myForm: FormArray | any;
  @Input() title: any;
  @Input() lang: any;
  params: any;
  caseentryForm: FormGroup | any;
  submitted = false;
  caseentryId: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser?: string | null;
  updatedDatetime?: Date | null;
  frameworkComponents: any;
  hospname: string = "";
  doctorname: string = "";
  status: boolean = false;
  add: any = [];
  numberofcase: Caseentry001mb[] = [];
  Casemachine001wbs: Casemachine001wb[] = [];
  casemachine001wb?: Casemachine001wb | any;
  slNo: any[] = []
  cslNo: any[] = []
  mname?: string;
  numofcase?: string;
  charge?: string;
  caseentry001mb?: Caseentry001mb;
  machiness: Machinemaster001mb[] = [];
  Doctormaster: Doctormaster001mb[] = [];
  casemachine: Casemachine001wb[] = [];
  public systemproperties: Systemproperties001mb[] = [];
  public gridOptions: GridOptions | any;

  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;


  constructor(
    private caseEntryManager: CaseEntryManager,
    private calloutService: CalloutService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private authManager: AuthManager,
    private datepipe: DatePipe,
    private caseMachineManager: CaseMachineManager,
    private doctormasterManager: DoctormasterManager,
    private machinemasterManager: MachinemasterManager,
    private translateService: TranslateService,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      //  linkRenderer: LinkRendererComponent,
      iconRenderer: IconRendererComponent
    }
    translateService.setDefaultLang(this.translateService.store.currentLang);
  }

  ngOnInit() {
    this.username = this.authManager.getcurrentUser.username;
    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);

      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });


    this.caseentryForm = this.formBuilder.group({
      hospname: ['', Validators.required],
      doctorname: ['', Validators.required],
      status: ['',],
    })

    this.loaddata();
    this.createDataGrid001();
    this.machinemasterManager.allmachinemaster(this.username).subscribe((response: any) => {

      this.machiness = deserialize<Machinemaster001mb[]>(Machinemaster001mb, response);
    })
    this.doctormasterManager.alldoctormaster(this.username).subscribe((response: any) => {
      // console.log(response);
      this.Doctormaster = deserialize<Doctormaster001mb[]>(Doctormaster001mb, response);
    });
    this.caseMachineManager.allcasemachine(this.username).subscribe((response: any) => {
      this.casemachine = deserialize<Casemachine001wb[]>(Casemachine001wb, response);
    });

    this.myForm = this.fb.group({
      times: this.fb.array([
        this.initTimes()
      ])
    });

    this.fa.valueChanges.subscribe(value => {
      console.log("values-------->", value);

      // this.caseentryadd = value
    });
  }

  get fa() { return this.myForm.get('times') as FormArray; }



  addGroup() {
    this.fa.push(this.initTimes());
  }

  initTimes() {
    return this.fb.group({
      mname: this.fb.control('', Validators.required),
      numofcase: this.fb.control("", Validators.required),
      charge: this.fb.control("", Validators.required)
    });
  }

  trackByFn(index: number, item: any) {
    return item.trackingId;
  }

  generateUniqueId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  removeGroup(i: number) {
    if (i != 0) {
      this.fa.removeAt(i);
    }
  }
  username = this.authManager.getcurrentUser.username;
  loaddata() {
    this.caseEntryManager.allorders(this.username).subscribe(response => {

      this.numberofcase = deserialize<Caseentry001mb[]>(Caseentry001mb, response);
      if (this.numberofcase.length > 0) {
        this.gridOptions?.api?.setRowData(this.numberofcase);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

  }


  get f() { return this.caseentryForm.controls; }

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
        field: 'caseentryId',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Doctor Name ',
        // field: 'doctorname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        cellClass: "grid-cell-centered",
        suppressSizeToFit: true,
        valueGetter: this.setDoctor.bind(this)
      },
      {
        headerName: 'Hospital Name',
        // field: 'hospname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setHospital.bind(this)
      },
      {
        headerName: 'Machine Name',
        // field: 'machinename',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        cellClass: "grid-cell-centered",
        suppressSizeToFit: true,
        valueGetter: this.setMachine.bind(this)
      },
      {
        headerName: 'Total Cases',
        field: 'numofcase',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setNumofcase.bind(this)
      },
      {
        headerName: 'Charges',
        field: 'charge',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setCharge.bind(this)
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
        headerName: 'Pdf',
        cellRenderer: 'iconRenderer',
        width: 60,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onPdfButtonClick.bind(this),
          label: 'Pdf',
        },
        // cellRenderer: (params: any, event: any) => {
        //   // console.log("params----------", params);
        //   if (params.data.status == 1) {
        //     return `<i class="fa fa-file-pdf-o" (click)="onPdfButtonClick("${this.params}")"></i>`;
        //   } else {
        //     return '';
        //   }
        // },
      },
      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 80,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: 'Edit'
        },
      },
      {
        headerName: 'Delete',
        cellRenderer: 'iconRenderer',
        width: 85,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },
      {
        headerName: 'Audit',
        cellRenderer: 'iconRenderer',
        width: 80,
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

  setNumofcase(params: any): string {
    let array = 0;
    for (let i = 0; i < params.data.casemachine001wbs.length; i++) {
      array += parseInt(params.data.casemachine001wbs[i].numofcase)
    }
    return array.toString();
  }

  setCharge(params: any): string {
    let array = 0;
    for (let i = 0; i < params.data.casemachine001wbs.length; i++) {
      array += parseInt(params.data.casemachine001wbs[i].charge)
    }
    return array.toString();
  }

  setMachine(params: any): string {
    let array = []
    for (let i = 0; i < params.data.casemachine001wbs.length; i++) {
      array.push(params.data.casemachine001wbs[i].mname)
    }
    return array.toString();
  }

  setDoctor(params: any): string {
    return params.data.doctorname2 ? params.data.doctorname2.doctorname : null;
  }
  setHospital(params: any): string {
    return params.data.hospname2 ? params.data.hospname2.hospitalname : null;
  }

  onEditButtonClick(params: any) {
    console.log('params-------------edit----->>>>', params);
    // this.myForm.controls.times.controls = [];
    this.myForm.reset()
    // this.fa.push(this.initTimes());
    this.caseentryId = params.data.caseentryId;
    // this.caseentryadd = params.data.Casemachine001wbs;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.caseentryForm.patchValue({
      'hospname': params.data.hospname,
      'doctorname': params.data.doctorname,
      'status': params.data.status
    });

    // this.myForm.get('times') as FormArray;

    // this.fa.push(this.initTimes());

    for (let i = 0; i < params.data.casemachine001wbs.length; i++) {
      this.myForm.get('times') as FormArray;
      console.log('myForm-------------edit----->>>>', this.myForm);

      // this.fa.push(this.initTimes());
      if (i < (params.data.casemachine001wbs.length) - 1) {
        this.fa.push(this.initTimes());
      }
      this.slNo.push(params.data.casemachine001wbs[i].slno)
      this.cslNo.push(params.data.casemachine001wbs[i].cslno)
      this.myForm.controls.times.controls[i].controls['mname'].setValue(params.data.casemachine001wbs[i].mname);
      this.myForm.controls.times.controls[i].controls['numofcase'].setValue(params.data.casemachine001wbs[i].numofcase);
      this.myForm.controls.times.controls[i].controls['charge'].setValue(params.data.casemachine001wbs[i].charge);
    }

  }


  onDeleteButtonClick(params: any) {
    params.isActive = false;
    this.caseEntryManager.casedelete(params.data.caseentryId).subscribe((response) => {
      for (let i = 0; i < this.numberofcase.length; i++) {
        if (this.numberofcase[i].caseentryId == params.data.caseentryId) {
          this.numberofcase?.splice(i, 1);
          break;
        }
      }
      const selectedRows = params.api.getSelectedRows();
      params.api.applyTransaction({ remove: selectedRows });
      this.gridOptions.api.deselectAll();
      this.calloutService.showSuccess("Order Removed Successfully");
    });
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Production Order";
    modalRef.componentInstance.details = params.data
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

  onOrderClick(event: any, caseentryForm: any) {
    // console.log("myForm", this.myForm.value.times);

    this.markFormGroupTouched(this.caseentryForm);
    this.submitted = true;
    if (this.caseentryForm.invalid) {
      return;
    }
    let casemachine001wbs: Casemachine001wb[] = [];
    // console.log('casemachine001wbs=====================>>>>', casemachine001wbs);
    for (let i = 0; i < this.myForm.value.times.length; i++) {
      console.log("myForm------------.", this.myForm.value.times[i]);
      let casemachine001wb = new Casemachine001wb();
      // casemachine001wb.slno = casemachine001wb
      if (this.slNo.length > 0) {
        casemachine001wb.slno = this.slNo.length ? this.slNo[i] : ""
        casemachine001wb.cslno = this.cslNo.length ? this.cslNo[i] : ""
        casemachine001wb.mname = this.myForm.value.times[i].mname
        casemachine001wb.numofcase = this.myForm.value.times[i].numofcase
        casemachine001wb.charge = this.myForm.value.times[i].charge
      } else {
        casemachine001wb.mname = this.myForm.value.times[i].mname
        casemachine001wb.numofcase = this.myForm.value.times[i].numofcase
        casemachine001wb.charge = this.myForm.value.times[i].charge
      }
      casemachine001wbs.push(casemachine001wb)

    }
    let caseentry001mb = new Caseentry001mb();
    caseentry001mb.hospname = this.f.hospname.value ? this.f.hospname.value : "";
    caseentry001mb.doctorname = this.f.doctorname.value ? this.f.doctorname.value : "";
    caseentry001mb.status = this.f.status.value ? this.f.status.value : false;
    // console.log("caseentryadd-----------------", this.caseentryadd);
    caseentry001mb.Casemachine001wbs = casemachine001wbs ? casemachine001wbs : 0;
    if (this.caseentryId) {
      // caseentry001mb.Casemachine001wbs = this.add ? this.add : 0;
      caseentry001mb.caseentryId = this.caseentryId;
      caseentry001mb.insertUser = this.insertUser;
      caseentry001mb.insertDatetime = this.insertDatetime;
      caseentry001mb.updatedUser = this.authManager.getcurrentUser.username;
      caseentry001mb.updatedDatetime = new Date();
      console.log("Caseentry001mb", caseentry001mb);
      this.caseEntryManager.caseupdate(caseentry001mb).subscribe((response) => {
        this.calloutService.showSuccess("Order Updated Successfully");
        let caseentry001mbResp = deserialize<Caseentry001mb>(Caseentry001mb, response);
        for (let caseEntry of this.numberofcase) {
          if (caseEntry.caseentryId == caseentry001mbResp.caseentryId) {
            caseEntry.hospname = caseentry001mbResp.hospname;
            caseEntry.doctorname = caseentry001mbResp.doctorname;
            caseEntry.insertUser = this.insertUser;
            caseEntry.insertDatetime = this.insertDatetime;
            caseEntry.updatedUser = this.authManager.getcurrentUser.username;
            caseEntry.updatedDatetime = new Date();
          }
        }
        this.gridOptions.api.setRowData(this.numberofcase);
        this.gridOptions.api.refreshView();
        this.gridOptions.api.deselectAll();
        this.loaddata();
        this.caseentryForm.reset();
        this.myForm.reset();
        this.caseentryId = null;
        this.submitted = false;
      });
    } else {
      // caseentry001mb.Casemachine001wbs = this.caseentryadd ? this.caseentryadd : 0;

      caseentry001mb.insertUser = this.authManager.getcurrentUser.username;
      caseentry001mb.insertDatetime = new Date();
      console.log("Caseentry001mb", caseentry001mb);

      this.caseEntryManager.casesave(caseentry001mb).subscribe((response) => {
        this.calloutService.showSuccess("Order Saved Successfully");
        let caseentry001mb = deserialize<Caseentry001mb>(Caseentry001mb, response);
        this.numberofcase?.push(caseentry001mb);
        const newItems = [JSON.parse(JSON.stringify(caseentry001mb))];
        this.gridOptions.api.applyTransaction({ add: newItems });
        this.gridOptions.api.deselectAll();
        this.loaddata();
        this.caseentryForm.reset();
        this.myForm.reset();
        this.submitted = false;
      });
    }
  }
  onReset() {
    this.submitted = false;
    this.caseentryForm.reset();
    this.myForm.reset();
  }

  onPdfButtonClick(params: any) {
    if (params.data.status == true) {
      this.caseEntryManager.pdfId(params.data.caseentryId).subscribe((response) => {
        let date = new Date();
        let newDate = this.datepipe.transform(date, 'dd-MM-yyyy');
        saveAs(response, " CaseEntryList " + newDate);
      })
    } else {
      `<i class="fa fa-file-pdf-o" disable></i>`;
    }

  }
}
