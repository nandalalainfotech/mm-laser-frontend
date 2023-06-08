import { DatePipe } from '@angular/common';
import { ViewChild } from "@angular/core";
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BookingentryManager } from 'src/app/shared/services/restcontroller/bizservice/bookingentry.service';
import { Bookingentry001mb } from 'src/app/shared/services/restcontroller/entities/Bookingentry001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';
@Component({
  selector: 'app-bookingmanagement',
  templateUrl: './bookingmanagement.component.html',
  styleUrls: ['./bookingmanagement.component.css']
})
export class BookingmanagementComponent implements OnInit {

  booking: Bookingentry001mb[] = [];
  public gridOptions: GridOptions | any;
  frameworkComponents: any;
  bookingId: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  mslno: string = "";
  dslno: string = "";
  hospital: string = "";
  staff: string = "";
  bngmanagementForm: FormGroup | any;
  days: string = "";
  Currentdate = new Date();
  dates: Date | any;
  previewWeek: Date | any;
  datemethod: any;
  starttime: string = "";
  endtime: string = "";
  bookingForm: FormGroup | any;
  dataArray: any[] = [];
  startOfPreviousWeek = new Date()
  selectedDate = this.startOfPreviousWeek;
  // previewWeek = new FormControl(this.selectedDate);

  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;


  constructor(
    private bookingentryManager: BookingentryManager,
    private authManager: AuthManager,
    private datePipe: DatePipe,
    private calloutService: CalloutService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {

    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);

      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });

    this.bngmanagementForm = this.formBuilder.group({
      previewWeek: ['', Validators.required],
    });

    // this.bngmanagementForm.valueChanges.subscribe((response: { previewWeek: any; }) => {
    //   console.log('Picked date:', response.previewWeek);
    // });

    this.loaddata()
    this.createDataGrid001();

  }
  onSelect(event: any) {
    console.log("event", event);

    this.datemethod = this.datePipe.transform(event, 'yyyy-MM-dd')
    this.loaddata()
  }
  loaddata() {

    this.bngmanagementForm.patchValue({
      'previewWeek': this.datePipe.transform(this.Currentdate, 'MM/dd/yyyy'),
    });
    if (this.datemethod != undefined) {
      this.dataArray = []
      this.bookingentryManager.allbooking().subscribe((response) => {
        this.booking = deserialize<Bookingentry001mb[]>(Bookingentry001mb, response);

        this.booking.filter((item) => {
          return this.datePipe.transform(item.date, 'yyyy-MM-dd') == this.datemethod
        }).map((item) => {
          this.dataArray.push(item)
        })
      })

      this.bookingentryManager.allbooking().subscribe((response) => {
        this.booking = deserialize<Bookingentry001mb[]>(Bookingentry001mb, response);
        if (this.dataArray.length > 0) {
          this.gridOptions?.api?.setRowData(this.dataArray);
        } else {
          this.gridOptions?.api?.setRowData([]);
        }
      })
    } else {
      console.log(" this.datemethod", this.bngmanagementForm);

      this.dataArray = []
      this.bookingentryManager.allbooking().subscribe((response) => {
        this.booking = deserialize<Bookingentry001mb[]>(Bookingentry001mb, response);

        this.booking.filter((item) => {
          return this.datePipe.transform(item.date, 'yyyy-MM-dd') == this.datePipe.transform(this.bngmanagementForm.value.previewWeek, 'yyyy-MM-dd')
        }).map((item) => {
          this.dataArray.push(item)
        })
      })

      this.bookingentryManager.allbooking().subscribe((response) => {
        this.booking = deserialize<Bookingentry001mb[]>(Bookingentry001mb, response);
        if (this.dataArray.length > 0) {
          this.gridOptions?.api?.setRowData(this.dataArray);
        } else {
          this.gridOptions?.api?.setRowData([]);
        }
      })
    }

  }



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
        // field: 'domain',
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
        // field: 'domain',
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
        headerName: 'Staff',
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
        headerName: 'StartTime',
        field: 'starttime',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setstrtym.bind(this)
      },
      {
        headerName: 'EndTime',
        field: 'endtime',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setentym.bind(this)
      },
      // {
      //   headerName: 'Edit',
      //   cellRenderer: 'iconRenderer',
      //   width: 200,
      //   flex: 1,
      //   suppressSizeToFit: true,
      //   cellStyle: { textAlign: 'center' },
      //   cellRendererParams: {
      //     onClick: this.onEditButtonClick.bind(this),
      //     label: 'Edit'
      //   }
      // },
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
      // {
      //   headerName: 'Audit',
      //   cellRenderer: 'iconRenderer',
      //   width: 55,
      //   flex: 1,
      //   suppressSizeToFit: true,
      //   cellStyle: { textAlign: 'center' },
      //   cellRendererParams: {
      //     onClick: this.onAuditButtonClick.bind(this),
      //     label: 'Audit'
      //   },
      // },
    ];
  }
  setstrtym(params: any): string {
    console.log("params", params.data.starttime);
    const [hour, minute] = params.data.starttime.split(":")
    console.log("hour",hour);
    console.log("minute",minute);
    
    let selectedHour = hour;
    let selectedTimeType = 'AM';
    if (hour === 0) {
      selectedHour = 12;
    }
    if (hour > 12) {
      selectedHour = hour - 12;
    }
    if (hour >= 12) {
      selectedTimeType = 'PM';
    }
    console.log("selectedHour", selectedHour);
    console.log("selectedTimeType", selectedTimeType);

    let strTime = selectedHour + ':' + minute + ' ' + selectedTimeType;
    return strTime;
  }
  setentym(params: any): string {
    console.log("params", params.data.endtime);
    const [hour, minute] = params.data.endtime.split(":")
    let selectedHour = hour;
    let selectedTimeType = 'AM';
    if (hour === 0) {
      selectedHour = 12;
    }
    if (hour > 12) {
      selectedHour = hour - 12;
    }
    if (hour >= 12) {
      selectedTimeType = 'PM';
    }
    console.log("selectedHour", selectedHour);
    console.log("selectedTimeType", selectedTimeType);

    let strTime = selectedHour + ':' + minute + ' ' + selectedTimeType;
    return strTime;
  }

  setMachine(params: any): string {
    return params.data.mslno2 ? params.data.mslno2.machinename : null;
  }
  setDoctor(params: any): string {
    return params.data.dslno2 ? params.data.dslno2.doctorname : null;
  }

  // onEditButtonClick(params: any) {
  //   this.bookingId = params.data.bookingId;
  //   this.insertUser = params.data.insertUser;
  //   this.insertDatetime = params.data.insertDatetime;
  //   this.bookingForm.patchValue({
  //     'mslno': params.data.mslno,
  //     'dslno': params.data.dslno,
  //     'hospital': params.data.hospital,
  //     'staff': params.data.staff,
  //     'date': this.datePipe.transform(params.data.date, 'MM/dd/yyyy'),
  //     'previewWeek': this.datePipe.transform(params.data.previewWeek, 'MM/dd/yyyy'),
  //     'days': params.data.days,
  //     'starttime': params.data.starttime,
  //     'endtime': params.data.endtime
  //   });
  // }
  onDeleteButtonClick(params: any) {
    this.bookingentryManager.bookingdelete(params.data.bookingId).subscribe((response: any) => {
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

  // onAuditButtonClick(params: any) {
  //   console.log("params", params)
  //   const modalRef = this.modalService.open(AuditComponent);
  //   modalRef.componentInstance.title = "Booking Entry";
  //   modalRef.componentInstance.details = params.data;
  // }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
}
