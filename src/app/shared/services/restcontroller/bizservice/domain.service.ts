import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Domain001mb } from "../entities/Domain001mb";

@Injectable()

export class DomainManager extends BaseService {

    private domainUrl: string = `${environment.apiUrl}/domain`


    alldomain() {

        return this.getCallService(`${this.domainUrl}` + "/findAll");
    }

    domainsave(domain001mb: Domain001mb) {
        console.log("departments001mb", domain001mb);
        return this.postCallService(`${this.domainUrl}` + "/save", {}, domain001mb);
    }
    domainupdate(domain001mb: Domain001mb) {
        return this.putCallService(`${this.domainUrl}`+"/update", {}, domain001mb);
      }
    
      domaindelete(id: any) {
              let data: any = {};
              data['id'] = id;
              return this.deleteCallService(`${this.domainUrl}`+"/delete", data);
      }
}