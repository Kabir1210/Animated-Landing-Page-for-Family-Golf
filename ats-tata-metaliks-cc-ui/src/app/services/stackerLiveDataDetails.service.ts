import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BASE_URL } from "../util/const";
import { StackerLiveDataDetailsModel } from "../model/stackerLiveDataDetailsModel.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StackerLiveDataDetailsService {

    constructor(private http: HttpClient) {

    }
    public fetchLiveStackerDetails(stackerId: number) {
        console.log("0.....")
        return this.http.get<StackerLiveDataDetailsModel[]>(`${BASE_URL}StackerLiveDataDetails/fetchByStackerId/${stackerId}`);
    }


    updateEmergency(data: any): Observable<any> {

        return this.http.put<any>(`${BASE_URL}StackerLiveDataDetails/updateEmergency`, data);
    }
}