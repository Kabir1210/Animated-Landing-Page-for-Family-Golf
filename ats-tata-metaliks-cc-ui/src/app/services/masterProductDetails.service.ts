import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "../util/const";
import { MasterProductDetailsModel } from "../model/masterProductDetails.model";

@Injectable({
    providedIn: "root",
})
export class MasterProductDetailsService {
    constructor(private http: HttpClient) {}

    public fetchAllMasterProductDetails() {
        return this.http.get<MasterProductDetailsModel[]>(`${BASE_URL}masterproductdetails/getAllMasterProductDetails`);
    }

    public addMasterProductDetails(masterProductDetails: MasterProductDetailsModel) {
        return this.http.post<MasterProductDetailsModel>(`${BASE_URL}masterproductdetails/addMasterProductDetails`, masterProductDetails, { observe: 'response' });
    }

    public updateMasterProductDetails(masterProductDetails: MasterProductDetailsModel) {
        return this.http.put<MasterProductDetailsModel>(`${BASE_URL}masterproductdetails/updateMasterProductDetails`, masterProductDetails, { observe: 'response' });
    }

    public deleteMasterProductDetails(productId: number) {
        return this.http.put<MasterProductDetailsModel>(`${BASE_URL}masterproductdetails/updateProductIsDeleted/${productId}`, { observe: 'response' });
    }
}