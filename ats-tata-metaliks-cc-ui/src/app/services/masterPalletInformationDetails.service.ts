import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MasterPalletInformationDetailsModel } from "../model/masterPalletInformationDetails.model";
import { BASE_URL } from "../util/const";

@Injectable({
    providedIn: 'root'
})

export class MasterPalletInformationDetailsService {


    updateAfterUnloadPalletInformationDetails(userId: number, userName: string, masterPalletInformationDetailsInst: MasterPalletInformationDetailsModel, selectedAreaUnloadingStationId: number) {
        return this.http.put<MasterPalletInformationDetailsModel>(`${BASE_URL}updateAfterUnloadPalletInformationDetails/${userId}/${userName}/${selectedAreaUnloadingStationId}`, masterPalletInformationDetailsInst, { observe: 'response' });
    }
    
    constructor(private http: HttpClient) {

    }
    fetchPalletInfoDataByPalletCodeForUnloadingEngineProcess(palletCode: String) {
        return this.http.get<MasterPalletInformationDetailsModel[]>(
            `${BASE_URL}fetchPalletInfoDataByPalletCodeForUnloadingEngineProcess/${palletCode}`);
    }
    updateEngineLoadingScanPalletEngineCodeInPalletInformationTable(masterPalletInformationDetailsInstance: MasterPalletInformationDetailsModel, palletCode: String, stationId: number) {
        
          return this.http.put<MasterPalletInformationDetailsModel>(`${BASE_URL}updateEngineLoadingScanPalletEngineCodeInPalletInformationTable/${palletCode}/${stationId}`, masterPalletInformationDetailsInstance, { observe: 'response' });

    }
  

    addPalletInformationDetails(addpalletInfoDetailsInstance : MasterPalletInformationDetailsModel){
        return this.http.post<MasterPalletInformationDetailsModel>(`${BASE_URL}addMasterPalletInformationDetails`, addpalletInfoDetailsInstance, {
            observe: 'response'
        });
    }

    addPalletInformationDetailsFillData(palletCode: String,productName: String,productVariantCode:String,productVariantName:String,productVariantCodeE2:String,productVariantNameE2:String,engine1Code:String,engine2Code:String,engine1Weight:number,engine2Weight:number,
        location:String,batchNumber:String, modelNumber:String,modelNumberE2:String, quantity: number, userId: number, userName:String){
            return this.http.post<MasterPalletInformationDetailsModel>(`${BASE_URL}addMasterPalletInformationFrom2DLayout/${palletCode}/${productName}/${productVariantCode}/${productVariantName}/${productVariantCodeE2}/${productVariantNameE2}/${engine1Code}/${engine2Code}
            /${engine1Weight}/${engine2Weight}/${location}/${batchNumber}/${modelNumber}/${modelNumberE2}/${quantity}/${userId}/${userName}`,{observe:'response'});
        }





}