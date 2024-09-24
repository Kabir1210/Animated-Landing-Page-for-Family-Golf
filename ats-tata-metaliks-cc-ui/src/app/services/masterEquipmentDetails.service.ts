import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MasterEquipmentDetailsModel } from "../model/masterEquipmentDetails.model";
import { BASE_URL } from "../util/const";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class MasterEquipmentDetailsService{

    constructor(private http:HttpClient){}

    public fetchAllEquipmentDetails(){
        return this.http.get<MasterEquipmentDetailsModel[]>(`${BASE_URL}masterEquipmentDetails/fetchByEquipmentDetailsIsDeleted`);
    }
    // public updateAllMasterEquipmentDetailsS1(equipmentObj: MasterEquipmentDetailsModel) {
    //     return this.http.put<any>(`${BASE_URL}masterEquipmentDetails/updateMasterEquipmentDetailsS1`, equipmentObj)
    // }

  
 public updateAllMasterEquipmentDetailsS1S2(equipmentObj: MasterEquipmentDetailsModel) {
  // console.log("000000000000000000000000updateee ");
        return this.http.put<MasterEquipmentDetailsModel[]>(`${BASE_URL}masterEquipmentDetails/updateMasterEquipmentDetailsS1S2`, equipmentObj)
    }
 

    // public fetchMasterEquipmentDetails(){
    //     return this.http.get<MasterEquipmentDetailsModel[]>(`${BASE_URL}masterEquipmentDetails/fetchAllMasterEquipmentDetails`);
    // }
 

  public fetchMasterEquipmentDetails(): Observable<MasterEquipmentDetailsModel[]> {
    // console.log("000000000000000000000fetch 0");
    return this.http.get<MasterEquipmentDetailsModel[]>(`${BASE_URL}masterEquipmentDetails/fetchAllMasterEquipmentDetails`);
  }

  public updateAllMasterEquipmentDetails(equipment: MasterEquipmentDetailsModel): Observable<any> {
    // console.log("000000000000000000000000000 ");
    return this.http.put<MasterEquipmentDetailsModel[]>(`${BASE_URL}masterEquipmentDetails/updateMasterEquipmentDetails`, equipment);
    }

}

