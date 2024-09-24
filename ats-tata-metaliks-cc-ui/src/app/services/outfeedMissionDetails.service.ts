import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { BASE_URL } from "../util/const";
import { OutfeedMissionDetailsModel } from "../model/OutfeedMissionDetails.model";
import { RegisterResponse } from "../model/responseHandler.model";

@Injectable({
    providedIn: "root",
})
export class OutfeedMissionDetailsService {
    constructor(private http: HttpClient) {

    }


    public addOutfeedMissionDetails(outfeedDetails: OutfeedMissionDetailsModel) {
        return this.http.post<OutfeedMissionDetailsModel>(`${BASE_URL}outfeedmissiondetails/addOutfeedMissionDetails`, outfeedDetails, { observe: 'response' });
      }
    public findAllOutfeedMissionDetails(): Observable<OutfeedMissionDetailsModel[]> {
        return this.http.get<OutfeedMissionDetailsModel[]>(`${BASE_URL}outfeedmissiondetails/findAllOutfeedMissionDetails`);
    }

    public fetchAllOutfeedMissionByCurrentDate(): Observable<OutfeedMissionDetailsModel[]> {

        
        console.log("in service")
        return this.http.get<OutfeedMissionDetailsModel[]>(`${BASE_URL}outfeedmissiondetails/getAllOutfeedMissionRuntimeDetails`).pipe(map(data => data));
    }

    public fetchOutfeedMissionRuntimeDetailsByAllFilters(coreSize:string, outfeedMissionStartCdatetime:string,
        outfeedMissionEndCdatetime:string, outfeedMissionStatus:string, palletCode:string,destination:string,shiftName:string): Observable<OutfeedMissionDetailsModel[]> {
        return this.http.get<OutfeedMissionDetailsModel[]>(`${BASE_URL}outfeedmissiondetails/fetchOutfeedMissionDetailsByAllFilters/${coreSize}/${outfeedMissionStartCdatetime}/${outfeedMissionEndCdatetime}/${outfeedMissionStatus}/${palletCode}/${destination}/${shiftName}`).pipe(map(data => data));
    }

    public fetchAllOutfeedMissionByStatus() {
        return this.http.get<OutfeedMissionDetailsModel[]>(`${BASE_URL}outfeedmissiondetails/fetchAllOutfeedMissionRuntimeDetailsByStatus`);
      }

      public updateOutfeedDetails(updateOutfeedDetailsStatusInstance:OutfeedMissionDetailsModel) {
        return this.http.put<OutfeedMissionDetailsModel>(`${BASE_URL}outfeedmissiondetails/updateOutfeedMissionRuntimeDetailsDetails`, updateOutfeedDetailsStatusInstance, { observe: 'response'})
    }

    public updateOutfeedMissionRuntimeDetails(outfeedMissionObj: OutfeedMissionDetailsModel) {
 
        return this.http.put<HttpResponse<RegisterResponse>>(`${BASE_URL}infeedMissionRuntimeDetails/updateInfeedMissionRuntimeDetailsDetails`, outfeedMissionObj);

     
    }
}