import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EquipmentAlarmHistoryDetailsModel } from "../model/equipmentAlarmHistoryDetails.model";

import { Observable } from "rxjs";
import { BASE_URL } from "../util/const";

@Injectable({
    providedIn: 'root'
})
export class EquipmentlAarmHistoryDetailsService{
    constructor(private http: HttpClient){

    }
    // public fetchAllEquipmentAlarmHistoryDetails() {
    //     return this.http.get<EquipmentAlarmHistoryDetailsModel[]>(`${BASE_URL}findByEquipmentAlarmName`);
    // }

    public fetchEquipmentAlarmHistoryDetailsByAllFilters(startDateTime: string, endDateTime: string, equipmentName: string) {
        return this.http.get<EquipmentAlarmHistoryDetailsModel[]>(`${BASE_URL}equipmentAlarmHistory/findByAllFiltersDetails/${startDateTime}/${endDateTime}/${equipmentName}`);
    }



    public fetchAllEquipmentAlarmHistoryDetails() {
        return this.http.get<EquipmentAlarmHistoryDetailsModel[]>(`${BASE_URL}findByEquipmentAlarmName`);
    }
    public findAllEquipmentByAlarmOccuredAndResolvedDateIsNull() {
        return this.http.get<EquipmentAlarmHistoryDetailsModel[]>(`${BASE_URL}/equipmentAlarmHistory/findAllEquipmentByAlarmOccuredAndResolvedDateIsNull`);
    }
    public findResolveDateEmptyList() {
        return this.http.get<EquipmentAlarmHistoryDetailsModel[]>(`${BASE_URL}equipmentAlarmHistory/findResolveDate`);
    }

    

    public fetchAllByCurrentDate() {
        return this.http.get<EquipmentAlarmHistoryDetailsModel[]>(`${BASE_URL}equipmentAlarmHistory/fetchAllByCurrentDate`);
    }
}
