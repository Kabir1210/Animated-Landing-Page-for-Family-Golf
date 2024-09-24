import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingSidePlcTagDetailsModel } from "../model/loadingSidePlcTagDetails.model";
import { BASE_URL } from "../util/const";

@Injectable({
    providedIn:"root"
})
export class LoadingSidePlcTagDetailsService{

    constructor(private http:HttpClient){}
    
    public findAllLoadingSideDetails() {
        return this.http.get<LoadingSidePlcTagDetailsModel[]>(`${BASE_URL}loadingSideDetails/findAllLoadingSideDetails`);
      }

      public fetchByLoadingSidePlcId(loadingSidePlcId:number){
        return this.http.get<LoadingSidePlcTagDetailsModel[]>(`${BASE_URL}loadingSideDetails/fetchByLoadingSidePlcId/${loadingSidePlcId}`);
    }
}