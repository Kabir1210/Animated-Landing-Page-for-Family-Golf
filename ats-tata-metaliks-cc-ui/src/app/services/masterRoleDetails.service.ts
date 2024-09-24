import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MasterRoleDetailsModel } from "../model/masterRoleDetails.model";


@Injectable({
    providedIn: 'root'
})
export class MasterRoleDetailsService {
    constructor(private Http: HttpClient) {

    }

    public fetchAllMasterRoleDetails() {
        return this.Http.get<MasterRoleDetailsModel[]>('http://localhost:8080/masterRoleDetails/fetchAllMasterRoleDetails');
    }
    public addRoleDetails(roleObject: MasterRoleDetailsModel) {
        return this.Http.post<MasterRoleDetailsModel>('http://localhost:8080/addMasterRoleDetails', roleObject, {
            observe: 'response'
        });
    }

    public deleteRoleDetails(roleId: number) {
        return this.Http.put<MasterRoleDetailsModel>(`http://localhost:8080/deleteMasterRoleDetailsByRoleId/${roleId}`, {
            observe: 'response'
        })

    }

    public editRoletDetails(roleObject2: MasterRoleDetailsModel) {

        return this.Http.put<MasterRoleDetailsModel>('http://localhost:8080/updateMasterRoleDetails', roleObject2, {
            observe: 'response'
        })
    }

}