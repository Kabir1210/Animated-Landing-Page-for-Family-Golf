import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StackerLiveDataDetailsModel } from "../model/stackerLiveDataDetailsModel.model";
import { BASE_URL } from "../util/const";

@Injectable({
    providedIn: 'root'
  })
export class StackerLiveDataDetailsService {

    constructor(private http: HttpClient) {

    }
    public fetchLiveStackerDetails(stackerId:number) {
        console.log("0.....")
        return this.http.get<StackerLiveDataDetailsModel[]>(`${BASE_URL}StackerLiveDataDetails/fetchByStackerId/${stackerId}`);
    }
}