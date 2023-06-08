import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Appsetting001mb } from "../entities/Appsetting001mb";



@Injectable()
export class AppSettingManager extends BaseService {

    private appsettingUrl: string = `${environment.apiUrl}/applicationsettings`;

    allappsettings() {
        return this.getCallService(`${this.appsettingUrl}` + "/findAll");
    }

    saveappsettings(appsetting001mbs: Appsetting001mb[] = []) {
        // console.log("appsetting001mbs.......>>>>>>",appsetting001mbs);
        return this.postCallService(`${this.appsettingUrl}` + "/save", {}, appsetting001mbs);
    }
}