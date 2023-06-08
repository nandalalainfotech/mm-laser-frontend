import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GridOptions } from 'ag-grid-community';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
	selector: 'app-deliver-item',
	templateUrl: './deliver-item.component.html',
	styleUrls: ['./deliver-item.component.css']
})
export class DeliverItemComponent implements OnInit {
	@Input() lang:any;

	public gridOptions: GridOptions | any;
	constructor(
		private translateService: TranslateService,
		private authManager:AuthManager,
	) { 
		translateService.setDefaultLang(this.translateService.store.currentLang);
	}

	ngOnInit() {
		this.authManager.currentUserSubject.subscribe((object: any) => {
            let lang = (object.language2?.name);
            this.translateService.setDefaultLang(lang);})

		this.createDataGrid001();
		setTimeout(() => {
			this.gridOptions?.api?.setRowData([]);
		}, 100);
	}
	createDataGrid001(): void {
		this.gridOptions = {
			paginationPageSize: 10,
			rowSelection: 'single'
		};
		this.gridOptions.editType = 'fullRow';
		this.gridOptions.enableRangeSelection = true;
		// this.gridOptions.domLayout = 'autoHeight';
		this.gridOptions.animateRows = true;

		this.gridOptions.columnDefs = [
			{
				headerName: '#ID',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true,
				headerCheckboxSelection: true,
				headerCheckboxSelectionFilteredOnly: true,
				checkboxSelection: true
			},
			{
				headerName: 'Delivery Note',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true

			},
			{
				headerName: 'Customer',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Customer Name',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Date',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Project',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Item',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Pending Amount',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Item Name',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Description',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Company',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
		];

	}
	public defaultColDef: any;


	onSelectionChange() {
	}

}
