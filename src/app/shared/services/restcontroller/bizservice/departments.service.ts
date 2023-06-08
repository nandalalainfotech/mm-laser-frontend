import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Departments001mb } from "../entities/Departments.001mb";


@Injectable()

export class DepartmentsManager extends BaseService {

    private departmentsUrl: string = `${environment.apiUrl}/departments`


    alldepartment() {

        return this.getCallService(`${this.departmentsUrl}` + "/findAll");
    }

    savedepartment(departments001mb: Departments001mb) {
        console.log("departments001mb", departments001mb);
        return this.postCallService(`${this.departmentsUrl}` + "/save", {}, departments001mb);
    }
    updatedepartment(departments001mb: Departments001mb) {
        return this.putCallService(`${this.departmentsUrl}` + "/update", {}, departments001mb);
    }

    departmentdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.departmentsUrl}` + "/delete", data);
    }
}