import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { BASE_URL } from "../util/const";
import { InfeedMissionRuntimeDetailsModel } from "../model/InfeedMissionRuntimeDetails.model";
import { RegisterResponse } from "../model/responseHandler.model";
import { OutfeedMissionRuntimeDetailsModel } from "../model/outfeedMissionRuntimeDetails.model";
 
@Injectable({
    providedIn:"root"
})
export class InfeedMissionRuntimeDetailsService{

    constructor(private http:HttpClient){
 
    }

    
    public fetchAllInfeedMissionByStatus() {
        return this.http.get<InfeedMissionRuntimeDetailsModel[]>(`${BASE_URL}infeedMissionRuntimeDetails/getAllInfeedCurrentMissionByStatus`);
      }

     

      
  

    public fetchAllInfeedMissionByCurrentDate(): Observable<InfeedMissionRuntimeDetailsModel[]> {

        
        console.log("in service")
        return this.http.get<InfeedMissionRuntimeDetailsModel[]>(`${BASE_URL}infeedMissionRuntimeDetails/getAllInfeedMissionRuntimeDetails`).pipe(map(data => data));
     
    }

    public updateInfeedDetails(updateInfeedDetailsStatusInstance:InfeedMissionRuntimeDetailsModel) {
        return this.http.put<InfeedMissionRuntimeDetailsModel>(`${BASE_URL}infeedMissionRuntimeDetails/updateInfeedMissionRuntimeDetails`, updateInfeedDetailsStatusInstance, { observe: 'response'})
    }


 
    public fetchInfeedMissionRuntimeDetailsByAllFilters(coreSize:string, infeedMissionStartCdatetime:string,
        infeedMissionEndCdatetime:string, infeedMissionStatus:string, palletCode:string,coreShooter:string,shiftName:string): Observable<InfeedMissionRuntimeDetailsModel[]> {
        return this.http.get<InfeedMissionRuntimeDetailsModel[]>(`${BASE_URL}infeedMissionRuntimeDetails/fetchInfeedMissionDetailsByAllFilters/${coreSize}/${infeedMissionStartCdatetime}/${infeedMissionEndCdatetime}/${infeedMissionStatus}/${palletCode}/${coreShooter}/${shiftName}`).pipe(map(data => data));
    }

    public updateInfeedMissionRuntimeDetailsDetails(infeedMissionObj: InfeedMissionRuntimeDetailsModel) {
 
        return this.http.put<HttpResponse<RegisterResponse>>(`${BASE_URL}infeedMissionRuntimeDetails/updateInfeedMissionRuntimeDetailsDetails`, infeedMissionObj);

     
    }
 
}