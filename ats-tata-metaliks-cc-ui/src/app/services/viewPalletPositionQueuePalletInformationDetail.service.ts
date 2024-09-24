import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ViewPalletPositionQueuePalletInformationDetailsModel } from "../model/viewPalletPositionQueuePalletInformationDetailsmodel";
import { BASE_URL } from "../util/const";


@Injectable({
    providedIn: 'root'
})

export class ViewPalletPositionQueuePalletInformationDetailService{
    fetchRackIdForLockMultipleRackid2DLayout(areaId: number, floorId: number, rackSide: string) {
        return this.http.get<ViewPalletPositionQueuePalletInformationDetailsModel[]>(`${BASE_URL}viewPalletPositionQueuePalletInformationDetails/fetchRackIdForLockMultipleRackid2DLayout/${areaId}/${floorId}/${rackSide}`);
       
    }
    updateViewPalletPositionQueuePalletInformationDetailByPositionId(palletPositionQueuePalletInformationDetails: ViewPalletPositionQueuePalletInformationDetailsModel) {
        return this.http.put<ViewPalletPositionQueuePalletInformationDetailsModel>(`${BASE_URL}illViewPalletPositionQueuePalletInformationDetailByPositionId`,palletPositionQueuePalletInformationDetails,{observe:'response'});

    }
    deletePalletPositionQueuePalletInformationDetailByPositionId(positionId: number) {
        return this.http.put<ViewPalletPositionQueuePalletInformationDetailsModel>(`${BASE_URL}viewPalletPositionQueuePalletInformationDetails/deletePalletPositionQueuePalletInformationDetailsByPositionId/${positionId}`, {
            observe: 'response'
          });
    }

    constructor (private http: HttpClient) { }


    fetchPalletPositionQueuePalletInformationDetails() {
        return this.http.get<ViewPalletPositionQueuePalletInformationDetailsModel[]>(`${BASE_URL}viewPalletPositionQueuePalletInformationDetails/findAllPalletPositionDetails`);
        
    }

    fetchPalletPositionQueuePalletInformationDetailsByPositionIdBy2DLayout(positionId:number) {
       
        return this.http.get<ViewPalletPositionQueuePalletInformationDetailsModel[]> (`${BASE_URL}viewPalletPositionQueuePalletInformationDetails/fetchPalletPositionQueuePalletInformationDetailsByPositionIdBy2DLayout/${positionId}`); 
       
    }
    
}