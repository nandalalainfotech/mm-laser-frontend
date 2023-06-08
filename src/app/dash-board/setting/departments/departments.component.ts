import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { DepartmentsManager } from 'src/app/shared/services/restcontroller/bizservice/departments.service';
import { DomainManager } from 'src/app/shared/services/restcontroller/bizservice/domain.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Departments001mb } from 'src/app/shared/services/restcontroller/entities/Departments.001mb';
import { Domain001mb } from 'src/app/shared/services/restcontroller/entities/Domain001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
    selector: 'app-departments',
    templateUrl: './departments.component.html',
    styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
    @Input() lang: any;
    frameworkComponents: any;
    slNo: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    domainslno: string = "";
    departmentname: string = "";
    departmentdescription: string = "";
    domains: Domain001mb[] = [];
    departmentss: Departments001mb[] = [];
    public gridOptions: GridOptions | any;
    deptForm: FormGroup | any;
    submitted = false;
    parentMenuString: string = '';
    childMenuString: string = '';

    constructor(
        private systemPropertiesService: SystemPropertiesService,
        private formBuilder: FormBuilder,
        private domainManager: DomainManager,
        private departmentsManager: DepartmentsManager,
        private calloutService: CalloutService,
        private translateService: TranslateService,
        private authManager: AuthManager,
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
        
        this.deptForm = this.formBuilder.group({
            domainslno: ['', Validators.required],
            departmentname: ['', Validators.required],
            departmentdescription: ['', Validators.required]
        });

        this.loaddata();
        this.createDataGrid001();
        this.domainManager.alldomain().subscribe((response: any) => {
            this.domains = deserialize<Domain001mb[]>(Domain001mb, response);
            console.log("domain", this.domains);

        })

    }

    loaddata() {

        this.departmentsManager.alldepartment().subscribe((response) => {
            this.departmentss = deserialize<Domain001mb[]>(Domain001mb, response);
            if (this.departmentss.length > 0) {
                this.gridOptions?.api?.setRowData(this.departmentss);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.deptForm.controls; }


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
                headerName: 'DepartmentName ',
                field: 'departmentname',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'DepartmentDescription',
                field: 'departmentdescription',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Domain',
                //   field: 'domain',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setDomainname.bind(this)
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
    setDomainname(params: any): string {
        return params.data.domainslno2 ? params.data.domainslno2.domainname : null;

    }

    onEditButtonClick(params: any) {
        this.slNo = params.data.slNo;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.deptForm.patchValue({
            'departmentdescription': params.data.departmentdescription,
            'departmentname': params.data.departmentname,
            'domainslno': params.data.domainslno,
        });
    }

    onDeleteButtonClick(params: any) {
        this.departmentsManager.departmentdelete(params.data.slNo).subscribe((response: any) => {
            for (let i = 0; i < this.departmentss.length; i++) {
                if (this.departmentss[i].slNo == params.data.slNo) {
                    this.departmentss?.splice(i, 1);
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
        modalRef.componentInstance.title = "Departments";
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

    onUserClick(event: any, deptForm: any) {
        console.log("departments001mb.domainslno--->", this.f.domainslno.value);
        this.markFormGroupTouched(this.deptForm);
        this.submitted = true;
        if (this.deptForm.invalid) {
            return;
        }
        let departments001mb = new Departments001mb();
        departments001mb.departmentdescription = this.f.departmentdescription.value ? this.f.departmentdescription.value : "";
        departments001mb.departmentname = this.f.departmentname.value ? this.f.departmentname.value : "";
        departments001mb.domainslno = this.f.domainslno.value ? this.f.domainslno.value : null;

        if (this.slNo) {
            departments001mb.slNo = this.slNo;
            departments001mb.insertUser = this.insertUser;
            departments001mb.insertDatetime = this.insertDatetime;
            departments001mb.updatedUser = this.authManager.getcurrentUser.username;
            departments001mb.updatedDatetime = new Date();
            this.departmentsManager.updatedepartment(departments001mb).subscribe((response: any) => {
                this.calloutService.showSuccess("Order Updated Successfully");
                this.loaddata();
                this.deptForm.reset();
                this.submitted = false;
                this.slNo = null;
            })
        }
        else {
            departments001mb.insertUser = this.authManager.getcurrentUser.username;
            departments001mb.insertDatetime = new Date();
            this.departmentsManager.savedepartment(departments001mb).subscribe((response) => {
                console.log("response", response)
                this.calloutService.showSuccess("Order Saved Successfully");
                this.loaddata();
                this.deptForm.reset();
                this.submitted = false;
            })
        }

    }

    onReset() {
        this.deptForm.reset();
        this.submitted = false;
    }
}
