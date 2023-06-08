import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { ApplanguagesettingManager } from 'src/app/shared/services/restcontroller/bizservice/applanguagesetting.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PersonManager } from 'src/app/shared/services/restcontroller/bizservice/person.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { Applanguagesetting001mb } from 'src/app/shared/services/restcontroller/entities/Applanguagesetting001mb';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';


@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    @Input() lang:any;
    frameworkComponents: any;
    id: number | any;
    personId: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    domain: string = "";
    username: string = "";
    status: string = "";
    securityquestion: string = "";
    securityanswer: string = "";
    language?: Number | null;
    applanguagesetting: Applanguagesetting001mb[] = [];
    email: string = "";
    name: string = "Registration.SecurityQuestion";
    type: string = "SecurityQuestion";
    dname: string = "Login.Domain";
    dtype: string = "Domain";
    cname: string = "Register.status";
    ctype: string = "register";
    users: User001mb[] = [];
    systemproperties?: Systemproperties001mb[] = [];
    dsystemproperties?: Systemproperties001mb[] = [];
    csystemproperties?: Systemproperties001mb[] = [];
    public gridOptions: GridOptions | any;
    registerForm: FormGroup | any;
    submitted = false;

    constructor(private systemPropertiesService: SystemPropertiesService,
        private formBuilder: FormBuilder,
        private userManager: UserManager,
        public translateService: TranslateService,
        private calloutService: CalloutService,
        private applanguagesettingManager: ApplanguagesettingManager,
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
        this.registerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            domain: ['', Validators.required],
            username: ['', Validators.required],
            status: ['', Validators.required],
            securityquestion: ['', Validators.required],
            securityanswer: ['', Validators.required],
            email: ['', Validators.required],
            language: ['', Validators.required]
        });

        this.loaddata();
        this.createDataGrid001();
        this.applanguagesettingManager.allapplanguagesetting().subscribe((response: any) => {
            this.applanguagesetting = deserialize<Applanguagesetting001mb[]>(Applanguagesetting001mb, response);

        })

        this.loaddata();
        this.createDataGrid001();
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.dname, this.dtype).subscribe(response => {
            this.dsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.cname, this.ctype).subscribe(response => {
            this.csystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
    }

    // loaddata() {

    //     this.departmentsManager.alldepartment().subscribe((response) => {
    //         this.departmentss = deserialize<Domain001mb[]>(Domain001mb, response);
    //         if (this.departmentss.length > 0) {
    //             this.gridOptions?.api?.setRowData(this.departmentss);
    //         } else {
    //             this.gridOptions?.api?.setRowData([]);
    //         }
    //     })
    // }
    loaddata() {


        this.userManager.alluser().subscribe((response) => {
            this.users = deserialize<Applanguagesetting001mb[]>(Applanguagesetting001mb, response);
            if (this.users.length > 0) {
                this.gridOptions?.api?.setRowData(this.users);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        })
    }

    get f() { return this.registerForm.controls; }

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
                field: 'personId',
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
                headerName: 'Firstname',
                field: 'firstname',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Lastname ',
                field: 'lastname',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Domain ',
                field: 'domain',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Username ',
                field: 'username',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Select Your Language',
                field: 'language',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setName.bind(this)
            },
            {
                headerName: 'Securityquestion ',
                field: 'securityquestion',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Securityanswer ',
                field: 'securityanswer',
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
            },

            {
                headerName: 'Email',
                field: 'email',
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
    setName(params: any): string {
        return params.data.language2 ? params.data.language2.name : null;
    }
    onEditButtonClick(params: any) {
        this.personId = params.data.personId;
        this.insertUser = params.data.insertUser;
        this.insertDatetime = params.data.insertDatetime;
        this.registerForm.patchValue({
            'firstname': params.data.firstname,
            'lastname': params.data.lastname,
            'domain': params.data.domain,
            'username': params.data.username,
            'status': params.data.status,
            'securityquestion': params.data.securityquestion,
            'securityanswer': params.data.securityanswer,
            'email': params.data.email,
            'language': params.data.language
        });
    }

    onDeleteButtonClick(params: any) {
        this.userManager.deleteuser(params.data.personId).subscribe((response) => {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].personId == params.data.personId) {
                    this.users?.splice(i, 1);
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
        modalRef.componentInstance.title = "Registration";
        modalRef.componentInstance.details = params.data;
    }

    onFirstDataRendered(params: any) {
        params.api.sizeColumnsToFit();
    }

    // private markFormGroupTouched(formGroup: FormGroup) {
    //     (<any>Object).values(formGroup.controls).forEach((control: any) => {
    //         control.markAsTouched();
    //         if (control.controls) {
    //             this.markFormGroupTouched(control);
    //         }
    //     });
    // }

    onUserClick(event: any, registerForm: any) {
        console.log("event-->", event);
        // this.markFormGroupTouched(this.registerForm);
        this.submitted = true;
        // if (this.registerForm.invalid) {
        //     return;
        // }
        // let person001mb = new Person001mb();
        let user001mb = new User001mb();
        user001mb.firstname = this.f.firstname.value ? this.f.firstname.value : "";
        user001mb.lastname = this.f.lastname.value ? this.f.lastname.value : "";
        user001mb.domain = this.f.domain.value ? this.f.domain.value : "";
        user001mb.username = this.f.username.value ? this.f.username.value : "";
        user001mb.status = this.f.status.value ? this.f.status.value : "";
        user001mb.language = this.f.language.value ? this.f.language.value : "";
        user001mb.securityquestion = this.f.securityquestion.value ? this.f.securityquestion.value : "";
        user001mb.securityanswer = this.f.securityanswer.value ? this.f.securityanswer.value : "";
        user001mb.email = this.f.email.value ? this.f.email.value : "";
        if (this.personId) {
            user001mb.personId = this.personId;
            user001mb.insertUser = this.insertUser;
            user001mb.insertDatetime = this.insertDatetime;
            user001mb.updatedUser = this.authManager.getcurrentUser.username;
            user001mb.updatedDatetime = new Date();
            this.userManager.updateuser(user001mb).subscribe(response => {
                this.calloutService.showSuccess("Order Updated Successfully");
                this.loaddata();
                this.registerForm.reset();
                this.submitted = false;
                this.personId = null;
            })
        }
        else {
            user001mb.insertUser = this.authManager.getcurrentUser.username;
            user001mb.insertDatetime = new Date();
            this.userManager.saveuser(user001mb).subscribe((response) => {
                this.calloutService.showSuccess("Order Saved Successfully");
                this.loaddata();
                this.registerForm.reset();
                this.submitted = false;
            })
        }

    }

    onReset() {
        this.registerForm.reset();
        this.submitted = false;
    }
}