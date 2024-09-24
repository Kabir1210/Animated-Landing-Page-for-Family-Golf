import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MasterAreaDetailsModel } from "../model/masterAreaDetails.model";
import { BASE_URL } from "../util/const";

@Injectable({
    providedIn:'root'
})
export class MasterAreaDetailsService {
    findByAreaName2DLayout(selectedAreaName: string) {
        return this.http.get<MasterAreaDetailsModel>(`${BASE_URL}masterAreaDetails/findByAreaName2DLayout/${selectedAreaName}`)
    }


    constructor(private http: HttpClient){

    }

    public  fetchAllMasterAreaDetails(){
        return this.http.get<MasterAreaDetailsModel[]>(`${BASE_URL}masterAreaDetails/fetchAllAreaDetails`)
    }

    public updateAreaDetails(areaObj: MasterAreaDetailsModel) {
        return this.http.put<MasterAreaDetailsModel[]>(`${BASE_URL}masterAreaDetails/updateMasterAreaDetails`, areaObj)
    }

}
