import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MasterFloorDetailsModel } from "../model/masterFloorDetails.model";
import { BASE_URL } from "../util/const";

@Injectable({
    providedIn:'root'
})

export class MasterFloorDetailsService {
    findByFloorName2DLayout(selectedFloorName: string) {
        return this.http.get<MasterFloorDetailsModel>(`${BASE_URL}masterFloorDetails/findByFloorName2DLayout/${selectedFloorName}`)
    }


    constructor(private http: HttpClient){

    }

    public  fetchAllMasterFloorDetails(){
        
        return this.http.get<MasterFloorDetailsModel[]>(`${BASE_URL}masterFloorDetails/fetchAllMasterFloorDetails`)
           }
}