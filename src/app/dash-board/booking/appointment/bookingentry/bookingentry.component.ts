import { DatePipe } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BookingentryManager } from 'src/app/shared/services/restcontroller/bizservice/bookingentry.service';
import { DoctormasterManager } from 'src/app/shared/services/restcontroller/bizservice/doctormaster.service';
import { EmployeemasterManager } from 'src/app/shared/services/restcontroller/bizservice/employeemaster.service';
import { MachinemasterManager } from 'src/app/shared/services/restcontroller/bizservice/machinemaster.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Bookingentry001mb } from 'src/app/shared/services/restcontroller/entities/Bookingentry001mb';
import { Doctormaster001mb } from 'src/app/shared/services/restcontroller/entities/Doctormaster001mb';
import { Employeemaster001mb } from 'src/app/shared/services/restcontroller/entities/Employeemaster001mb';
import { Machinemaster001mb } from 'src/app/shared/services/restcontroller/entities/Machinemaster001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-bookingentry',
  templateUrl: './bookingentry.component.html',
  styleUrls: ['./bookingentry.component.css']
})
export class BookingentryComponent implements OnInit {

  @Input() lang: any;
  frameworkComponents: any;
  bookingId: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  mslno: string = "";
  dslno: string = "";
  hospital: string = "";
  staff: string = "";
  days: string = "";
  date: Date | any;
  time: string = "";
  Doctormaster: Doctormaster001mb[] = [];
  machiness: Machinemaster001mb[] = [];
  booking: Bookingentry001mb[] = [];
  employee: Employeemaster001mb[] = [];
  public gridOptions: GridOptions | any;
  bookingForm: FormGroup | any;
  submitted = false;
  parentMenuString: string = '';
  childMenuString: string = '';
  dayList: Array<any> = [];
  value: string = "";
  timeValue: string = "";


  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  constructor(
    private systemPropertiesService: SystemPropertiesService,
    private formBuilder: FormBuilder,
    private doctormasterManager: DoctormasterManager,
    private machinemasterManager: MachinemasterManager,
    private bookingentryManager: BookingentryManager,
    private datePipe: DatePipe,
    private router: Router,
    private calloutService: CalloutService,
    private authManager: AuthManager,
    private employeemasterManager: EmployeemasterManager,
    private dataSharedService: DataSharedService,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit() {

    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);

      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });


    this.bookingForm = this.formBuilder.group({
      mslno: ['', Validators.required],
      dslno: ['', Validators.required],
      hospital: ['', Validators.required],
      staff: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });

    this.loaddata();
    this.createDataGrid001();
    this.machinemasterManager.allmachinemaster().subscribe((response: any) => {
      this.machiness = deserialize<Machinemaster001mb[]>(Machinemaster001mb, response);
    })
    this.doctormasterManager.alldoctormaster().subscribe((response: any) => {
      this.Doctormaster = deserialize<Doctormaster001mb[]>(Doctormaster001mb, response);
    });
    this.employeemasterManager.allemployee().subscribe((response: any) => {
      this.employee = deserialize<Employeemaster001mb[]>(Employeemaster001mb, response);
    });

  }

  loaddata() {

    this.bookingentryManager.allbooking().subscribe((response) => {
      this.booking = deserialize<Bookingentry001mb[]>(Bookingentry001mb, response);
      if (this.booking.length > 0) {
        this.gridOptions?.api?.setRowData(this.booking);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    })

  }
  get f() { return this.bookingForm.controls; }


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
        field: 'bookingId',
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
        headerName: 'Machine',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setMachine.bind(this)
      },
      {
        headerName: 'Doctor',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setDoctor.bind(this)
      },
      {
        headerName: 'Hospital',
        field: 'hospital',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Employee',
        field: 'staff',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Date',
        field: 'date',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.date
            ? this.datePipe.transform(
              params.data.date,
              'MM/dd/yyyy'
            )
            : '';
        },
      },
      {
        headerName: 'Time',
        field: 'time',
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
  setMachine(params: any): string {
    return params.data.mslno2 ? params.data.mslno2.machinename : null;
  }
  setDoctor(params: any): string {
    return params.data.dslno2 ? params.data.dslno2.doctorname : null;
  }
  onEditButtonClick(params: any) {
    this.bookingId = params.data.bookingId;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.bookingForm.patchValue({
      'mslno': params.data.mslno,
      'dslno': params.data.dslno,
      'hospital': params.data.hospital,
      'staff': params.data.staff,
      'date': this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
      'time': params.data.time
    });
  }

  onDeleteButtonClick(params: any) {
    this.bookingentryManager.bookingdelete(params.data.bookingId).subscribe((response) => {
      for (let i = 0; i < this.booking.length; i++) {
        if (this.booking[i].bookingId == params.data.bookingId) {
          this.booking?.splice(i, 1);
          break;
        }
      }
      const selectedRows = params.api.getSelectedRows();
      params.api.applyTransaction({ remove: selectedRows });
      this.calloutService.showSuccess("Order Removed Successfully");
    });
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Booking Entry";
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

  onUserClick(event: any, bookingForm: any) {

    this.markFormGroupTouched(this.bookingForm);
    this.submitted = true;
    if (this.bookingForm.invalid) {
      return;
    }
    let bookingentry001mb = new Bookingentry001mb();
    bookingentry001mb.mslno = this.f.mslno.value ? this.f.mslno.value : "";
    bookingentry001mb.dslno = this.f.dslno.value ? this.f.dslno.value : "";
    bookingentry001mb.hospital = this.f.hospital.value ? this.f.hospital.value : "";
    bookingentry001mb.staff = this.f.staff.value ? this.f.staff.value : "";
    bookingentry001mb.date = new Date(this.f.date.value);
    bookingentry001mb.time = this.f.time.value ? this.f.time.value : "";
    if (this.bookingId) {
      bookingentry001mb.bookingId = this.bookingId;
      bookingentry001mb.insertUser = this.insertUser;
      bookingentry001mb.insertDatetime = this.insertDatetime;
      bookingentry001mb.updatedUser = this.authManager.getcurrentUser.username;
      bookingentry001mb.updatedDatetime = new Date();
      this.bookingentryManager.updatebooking(bookingentry001mb).subscribe((response: any) => {
        this.calloutService.showSuccess("Order Updated Successfully");
        this.loaddata();
        this.bookingForm.reset();
        this.submitted = false;
        this.bookingId = null;
      })
    }
    else {
      bookingentry001mb.insertUser = this.authManager.getcurrentUser.username;
      bookingentry001mb.insertDatetime = new Date();
      this.bookingentryManager.savebooking(bookingentry001mb).subscribe((response) => {
        console.log("response", response);

        this.calloutService.showSuccess("Order Saved Successfully");
        if (this.bookingForm.valid) {
          this.router.navigate(['/app-dash-board/app-booking/app-calendar-table']);
          return;
        }
        this.loaddata();
        this.bookingForm.reset();
        this.submitted = false;
      })
    }
  }

  onReset() {
    this.bookingForm.reset();
    this.submitted = false;
  }
}


