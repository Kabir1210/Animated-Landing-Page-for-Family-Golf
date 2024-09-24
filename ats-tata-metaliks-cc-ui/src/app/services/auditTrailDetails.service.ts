import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BASE_URL } from "../util/const";
import { AuditTrailReportModel } from "../model/auditTrailReport.model";
import { MasterLoggerActivityModel } from "../model/masterLoggerActivity.model";

@Injectable({
    providedIn: 'root'
})

export class AuditTrailDetailsService {
    constructor(private http: HttpClient) { }
    public addUserAuditTrailDetails(operatorsAction:any,positionId:number,reason:string,field:string,userName:string){
        alert("insdie")
        return this.http.post<AuditTrailReportModel[]>(`${BASE_URL}auditTrailDetails/addPositionLockUnLockDeleteReasonInUserAuditTrailReport/${operatorsAction}/${positionId}/${reason}/${field}/${userName}`,{observe:'response'});
    
    }
    addRackLockUnLockDeleteReasonInUserAuditTrailReport(auditTrailReportDetails: AuditTrailReportModel) {
        return this.http.post<AuditTrailReportModel>(`${BASE_URL}auditTrailDetails/addPositionLockUnLockDeleteReasonInUserAuditTrailReport`,auditTrailReportDetails,{observe:'response'});
   
    }
    
    public fetchAuditTrailDetailsByAllFilters(startDateTime: string, endDateTime: string, username: string) {
        return this.http.get<AuditTrailReportModel[]>(`${BASE_URL}auditTrailDetails/findByAllFilters/${startDateTime}/${endDateTime}/${username}`);
    }

  

    public fetchAllUserDetails(){
        return this.http.get<AuditTrailReportModel[]>(`${BASE_URL}auditTrailDetails/fetchAllByCurrentDate`);
    }
    
  

  
 
    public fetchAllAuditTrailDetails() {
        return this.http.get<AuditTrailReportModel[]>(`${BASE_URL}auditTrailDetails/findByCdatetime`);
    }

 

    
    public generatePdf(auditTrailDetailsObj:MasterLoggerActivityModel[]) {
        return this.http.post<any[]>(`${BASE_URL}auditTrailDetails/generatePdf`,auditTrailDetailsObj,{observe:'response'});
    }
   

}