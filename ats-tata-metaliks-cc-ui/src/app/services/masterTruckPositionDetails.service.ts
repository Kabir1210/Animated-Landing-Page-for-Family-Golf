import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "../util/const";
import { MasterPalletInformationDetailsModel } from "../model/masterPalletInformationDetails.model";
import { MasterTruckPositionDetailsModel } from "../model/masterTruckPositionDetails.model";

@Injectable({
    providedIn : 'root'
})

export class MasterTruckPositionDetailsService{
    fetchDataLoadingBay2DLayout(selectLoadingBay: number) {
        return this.http.get<MasterTruckPositionDetailsModel[]>(`${BASE_URL}masterTruckPositionDetails/fetchDataLoadingBay2DLayout/${selectLoadingBay}`);
       
    }
  
    public updateLoadingBayIsActiveDetails(mappingObj: MasterTruckPositionDetailsModel) {
        return this.http.put<MasterTruckPositionDetailsModel[]>(`${BASE_URL}masterTruckPositionDetails/updateLoadingBayIsactiveDetails`, mappingObj)
    }
    public updateLoadingBayAndOBDNumber(loadingBay : number, obdNumber : string){
        return this.http.put<MasterTruckPositionDetailsModel[]>(`${BASE_URL}masterTruckPositionDetails/updateLoadingBayOBDNumber/${loadingBay}/${obdNumber}`,{ observe: 'response' });
    }

  
    public editMasterTruckPositionDetails(productObject2: MasterTruckPositionDetailsModel) {

        return this.http.put<MasterTruckPositionDetailsModel>(`${BASE_URL}masterTruckPositionDetails/updateLoadingBayDetails`, productObject2, {
            observe: 'response'
        })
    }

    public updateCCacknowedge(productObject2: MasterTruckPositionDetailsModel,loadingBay : number) {

        return this.http.put<MasterTruckPositionDetailsModel>(`${BASE_URL}masterTruckPositionDetails/updateCCaacknowaldge/${loadingBay}`, productObject2, {
            observe: 'response'
        })
    }

    constructor(private http: HttpClient) {
    }

    public fetchLoadingBayData2DLayout(){
        console.log("fetchLoadingBayData2DLayout");
        return this.http.get<MasterTruckPositionDetailsModel[]>(`${BASE_URL}masterTruckPositionDetails/fetchLoadingBayData2DLayout`);
        
    }

    public fetchLoadingBayData(){
        return this.http.get<MasterTruckPositionDetailsModel[]>(`${BASE_URL}masterTruckPositionDetails/fetchLoadingBayData`);
        
    }

  

    public fetchDataLoadingBay(loadingBay:number){
        return this.http.get<MasterTruckPositionDetailsModel[]>(`${BASE_URL}masterTruckPositionDetails/findDataByLodingBay/${loadingBay}`);
        
    }

    public updatePalletStatusInPalletInformation(palletInformationId : number, pallStatusName : string, quantity : string) {
        console.log("in service")
        return this.http.put<MasterPalletInformationDetailsModel[]>(`${BASE_URL}masterTruckPositionDetails/updatePalletInformationDetails/${palletInformationId}/${pallStatusName}/${quantity}`,{ observe: 'response' });
    }



    fetchAllMasterTruckPositionDetails() {
        return this.http.get<MasterTruckPositionDetailsModel[]>(`${BASE_URL}masterTruckPositionDetails/fetchAllMasterTruckPositionDetails`);
        
    }

    // updateStatusAndQuantity(palletInformationId : number, quantityUpdatedByOperator : number, palletStatusAfter : number){
    //     console.log("this.quantityUpdatedByOperator ====)))))))))== " + quantityUpdatedByOperator);
    //     return this.http.put<LoadingBayOperationdetailsHistoryDetailsModel[]>(`${BASE_URL}loadingBayOperation/updateStatusAndQuantity/${palletInformationId}/${quantityUpdatedByOperator}/${palletStatusAfter}`,{ observe: 'response' });
    // }
  }
