import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Brandmaster001mb } from "../entities/Brandmaster001mb";

@Injectable()

export class BrandmasterManager extends BaseService {

    private brandmasterUrl: string = `${environment.apiUrl}/brandmaster`


    allbrandmaster() {

        return this.getCallService(`${this.brandmasterUrl}` + "/findAll");
    }

    brandmastersave(brandmaster001mb: Brandmaster001mb) {
        // console.log("departments001mb", brands001mb);
        return this.postCallService(`${this.brandmasterUrl}` + "/save", {}, brandmaster001mb);
    }
    brandmasterupdate(brandmaster001mb: Brandmaster001mb) {
        return this.putCallService(`${this.brandmasterUrl}` + "/update", {}, brandmaster001mb);
    }

    brandmasterdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.brandmasterUrl}` + "/delete", data);
    }
}