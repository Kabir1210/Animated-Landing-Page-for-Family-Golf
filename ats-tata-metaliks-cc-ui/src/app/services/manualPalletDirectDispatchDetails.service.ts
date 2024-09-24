import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ManualPalletDirectDispatchDetailsModel } from "../model/manualPalletDirectDispatchDetails.model";
import { BASE_URL } from "../util/const";
import { ViewPositionRackPalletInformationDetailsModel } from "./viewPositionRackPalletInformationDetails.model";

@Injectable({
    providedIn: 'root'
})
export class ManualPalletDirectDispatchDetailsService {
    addPositionIdDetailsInmanualPalletDirectDispatchDetails2DLayout(manualPalletDirectDispatchDetailsModelInstance: ManualPalletDirectDispatchDetailsModel) {
        return this.http.post<ManualPalletDirectDispatchDetailsModel>(`${BASE_URL}manualPalletDirectDetails/addPositionIdDetailsInmanualPalletDirectDispatchDetails2DLayout`,manualPalletDirectDispatchDetailsModelInstance,{observe:'response'});
  }
    constructor(private http: HttpClient) {}

    public fetchAllManualPalletDirectDetails() {
        return this.http.get<ManualPalletDirectDispatchDetailsModel[]>(`${BASE_URL}manualPalletDirectDetails/fetchAllManualPalletDirectDetails`);
    }



    //  public addManualPalletDetails(manualPalletDirectDispatchDetailsModelObject: ManualPalletDirectDispatchDetailsModel) {
       
    //     return this.http.post<ManualPalletDirectDispatchDetailsModel>(`${BASE_URL}manualPalletDirectDetails/addManualPalletDeatils`,manualPalletDirectDispatchDetailsModelObject,{observe:'response'});
    // }

    addManualPalletDeatilsCurrentStock(addPositionRackPalletInformationDetails:ViewPositionRackPalletInformationDetailsModel[], selectLoadingBay: number, truckNumber: string, obdNumber: string) {
        return this.http.post<ManualPalletDirectDispatchDetailsModel[]>(`${BASE_URL}manualPalletDirectDetails/addManualPalletDeatilsCurrentStock/${selectLoadingBay}/${truckNumber}/${obdNumber}`,addPositionRackPalletInformationDetails,{observe:'response'});
    }
}