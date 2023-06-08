import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GridOptions } from 'ag-grid-community';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
    selector: 'app-delivered-items',
    templateUrl: './delivered-items.component.html',
    styleUrls: ['./delivered-items.component.css']
})
export class DeliveredItemsComponent implements OnInit {
    @Input() lang:any;
    public gridOptions: GridOptions | any;
    constructor(
        private translateService: TranslateService, 
        private authManager:AuthManager
    ) { 
        translateService.setDefaultLang(this.translateService.store.currentLang);
    }
    ngOnInit() {
        this.authManager.currentUserSubject.subscribe((object: any) => {
            let lang = (object.language2?.name);
            this.translateService.setDefaultLang(lang);})

        
        this.createDataGrid001mb();
        setTimeout(() => {
            this.gridOptions?.api?.setRowData([]);
        }, 100);
    }
    createDataGrid001mb(): void {
        this.gridOptions = {
            pagintionPageSize: 10,
            rowSelection: 'single'
        }
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        this.gridOptions.animateRows = true;
        this.gridOptions.columnDefs = [
            {
                headerName: '#ID',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilterOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Delivery Note',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Customer',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Customer Name',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Date',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Project',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Item',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Pending Amount',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Item Name',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Description',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
            {
                headerName: 'Company',
                field: '',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizabla: true,
            },
        ];
    }
    onSelectionChange() {
    }
}