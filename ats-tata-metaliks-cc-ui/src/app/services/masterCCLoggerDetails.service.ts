import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MasterLoggerActivityModel } from "../model/masterLoggerActivity.model";
import { BASE_URL } from "../util/const";
import { AuditTrailReportModel } from "../model/auditTrailReport.model";

@Injectable({
    providedIn: 'root'
})

export class MasterCCLoggerDetailsService {

  

    constructor(private http: HttpClient) {}
    
    public getMasterLoggerActivity() {
        return this.http.get<MasterLoggerActivityModel[]>(`${BASE_URL}masterLoggerActivity/findLoggerActivityByCurrentDate`);
    }

    public fetchLoggerDetailsByAllFilters( startDateString:string, 
        startTimeString:string, endDateString:string, endTimeString:string){
       return this.http.get<MasterLoggerActivityModel[]>(`${BASE_URL}masterLoggerActivity/findLoggerActivityByDateRange/${startDateString}/${startTimeString}/${endDateString}/${endTimeString}`);
   }

   addSingleAndMultipleDispatchInUserMasterCCLoggerReport(masterCCLoggerDetails: MasterLoggerActivityModel) {
    return this.http.post<MasterLoggerActivityModel>(`${BASE_URL}masterLoggerActivity/addSingleAndMultipleDispatchInUserMasterCCLoggerReport`,masterCCLoggerDetails,{observe:'response'});

}

//    public addLoggerActivity(logModule : String, logMessage : String,userId : Number, userName : String){

//        return this.http.post<MasterLoggerActivityModel>(`${BASE_URL}masterLoggerActivity/addloggerActivityDetails/${logModule}/${logMessage}/${userId}/${userName}`, { observe: 'response' });
       
//    }
addLoggerActivity(masterCCLoggerDetails: MasterLoggerActivityModel) {
    return this.http.post<MasterLoggerActivityModel>(`${BASE_URL}masterLoggerActivity/addloggerActivityDetails`,masterCCLoggerDetails,{observe:'response'});

  }
}