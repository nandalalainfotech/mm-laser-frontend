import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GridOptions } from 'ag-grid-community';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  public gridOptions: GridOptions | any;
  @Input() lang:any;
  constructor(
    private translateService: TranslateService,
    private authManager: AuthManager
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
            headerName: 'Customer',
            field: '',
            width: 200,
            flex: 1,
            sortable: true,
            filter: true,
            resizable: true

        },
        {
            headerName: 'Subject',
            field: '',
            width: 200,
            flex: 1,
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: 'Status',
            field: '',
            width: 200,
            flex: 1,
            sortable: true,
            filter: true,
            resizable: true
        },

        {
            headerName: 'Raised By (Email)',
            field: '',
            width: 200,
            flex: 1,
            sortable: true,
            filter: true,
            resizable: true
        },

    ];
}

}
