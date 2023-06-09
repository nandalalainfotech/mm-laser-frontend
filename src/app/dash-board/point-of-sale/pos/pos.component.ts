import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GridOptions } from 'ag-grid-community';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
	selector: 'app-pos',
	templateUrl: './pos.component.html',
	styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {
	@Input() lang: any;
	public gridOptions: GridOptions | any;
	constructor(
		private translateService: TranslateService,
		private authManager: AuthManager,
	) {
		translateService.setDefaultLang(this.translateService.store.currentLang);
	}

	ngOnInit(): void {

		this.authManager.currentUserSubject.subscribe((object: any) => {
			let lang = (object.language2?.name);
			this.translateService.setDefaultLang(lang);
		})

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
				headerName: 'Customer Name',
				field: 'itemtoManufacture',
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
				headerName: 'Quantity',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			},
			{
				headerName: 'Total Amount',
				field: '',
				width: 200,
				flex: 1,
				sortable: true,
				filter: true,
				resizable: true
			}
		];
		// this.defaultColDef= {
		// 	suppressKeyboardEvent: (params) => {
		// 		if (!params.editing) {
		// 			let isBackspaceKey = params.event.keyCode === 8;
		// 			let isDeleteKey = params.event.keyCode === 46;

		// 			if (isBackspaceKey) {
		// 				// Delete all selected rows...
		// 				return true
		// 			}

		// 			if(isDeleteKey){
		// 				// Delete all selected cell ranges...
		// 				return true
		// 			}
		// 		}
		// 		return false;
		// 	}
		// };
	}
	public defaultColDef: any;


	onSelectionChange() {
	}
}
