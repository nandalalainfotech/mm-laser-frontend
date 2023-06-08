import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Machinemaster001mb } from "../entities/Machinemaster001mb";


@Injectable()

export class MachinemasterManager extends BaseService {

    private machinemasterUrl: string = `${environment.apiUrl}/machinemaster`


    allmachinemaster() {
        return this.getCallService(`${this.machinemasterUrl}` + "/findAll");
    }

    savemachinemaster(machinemaster001mb: Machinemaster001mb) {
        console.log("machinemaster001mb", machinemaster001mb);
        return this.postCallService(`${this.machinemasterUrl}` + "/save", {}, machinemaster001mb);
    }
    updatemachinemaster(machinemaster001mb: Machinemaster001mb) {
        return this.putCallService(`${this.machinemasterUrl}` + "/update", {}, machinemaster001mb);
    }

    machinemasterdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.machinemasterUrl}` + "/delete", data);
    }
}