import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MasterSKUDetailsModel } from "../model/masterSKUDetails.model";
import { BASE_URL } from "../util/const";
@Injectable({
    providedIn : 'root',
})

export class MasterSKUDetailsService {
  fetchAllMasterSKUCodeDetails() {
    return this.http.get<MasterSKUDetailsModel[]>(`${BASE_URL}masterSkudetails/findAllMasterSKUDetails`);
   
  }
  fetchMasterSkuDetailsBySkucode(skuCodeModal: string) {
    return this.http.get<MasterSKUDetailsModel>(`${BASE_URL}masterSkudetails/fetchMasterSkuDetailsBySkucode/${skuCodeModal}`)
  }

    constructor (private http: HttpClient) { }

fetchAllMasterSKUDetails() {
    return this.http.get<MasterSKUDetailsModel[]>(`${BASE_URL}masterSkudetails/findAllMasterSKUDetailsPogo`);
    
}

// fetchAllSKUDetailsPOJO() {
   
//     return this.http.get<MasterSKUDetailsPOJOModel[]>(`${BASE_URL}masterSkudetails/findAllMasterSKUDetailsPogo`);
// }

public updateSkuIsDeleted(skuId: number) {
    return this.http.put<MasterSKUDetailsModel>(`${BASE_URL}masterSkudetails/deleteMaskterSkuDetails/${skuId}`
    ,
    { observe: 'response'});
}

// public editSkuDetails(skuDetailsobject: MasterSKUDetailsModel) {
//     console.log("in service gdhzrtjrt");
//     return this.http.put<MasterSKUDetailsModel>(`${BASE_URL}api/v1/resource/updateMasterSKUDetails`, skuDetailsobject, {
//         observe: 'response'
//     });
    
// }

public editSkuDetails(skuDetailsobject: MasterSKUDetailsModel,selectedEditProductName:string) {
    console.log("in service gdhzrtjrt");
    return this.http.put<MasterSKUDetailsModel>(`${BASE_URL}masterSkudetails/editMasterSKUDetails/${selectedEditProductName}`, skuDetailsobject, {
        observe: 'response'
    });
    
}

public addSkuDetails(skuDetails: MasterSKUDetailsModel) {

    console.log("in service");
    return this.http.post<MasterSKUDetailsModel>(`${BASE_URL}masterSkudetails/addMasterSKUDetails`, skuDetails, {
        observe: 'response'
    });    
}

}
