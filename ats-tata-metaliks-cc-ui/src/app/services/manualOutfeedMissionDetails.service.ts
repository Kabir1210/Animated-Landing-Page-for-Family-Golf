import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "../util/const";
import { ManualOutfeedMissionDetailsModel } from "../model/manualOutfeedMissionDetails.model";
import { CurrentStockDetailsModel } from "../model/currentStockDetails.model";
import { RegisterResponse } from "../model/responseHandler.model";

@Injectable({
    providedIn:"root"
})
export class ManualOutfeedMissionDetailsService{

    constructor(private http:HttpClient){}
    addManualOutfeedMissionDetailsCurrentStock(manualOutfeed:ManualOutfeedMissionDetailsModel) {
        return this.http.post<RegisterResponse[]>(`${BASE_URL}manualOutfeedDetails/addManualOutfeedMissionDetailsCurrentStock`,manualOutfeed,{observe:'response'});
    }


    public addCurrentPalletStockdetailsInManualOutfeedMissionDetails(addCurrentPalletStockDetailsInstance:ManualOutfeedMissionDetailsModel){
        return this.http.post<ManualOutfeedMissionDetailsModel>(`${BASE_URL}manualOutfeedDetails/addCurrentPalletStockdetailsInManualOutfeedMissionDetails1`,addCurrentPalletStockDetailsInstance ,{observe:'response'});
    
    }

}