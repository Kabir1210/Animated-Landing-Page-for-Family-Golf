import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "../util/const";

@Injectable({
    providedIn: "root",
})
export class MasterCCMDetailsService {
    constructor(
        private http: HttpClient
    ) {}


    public getMasterCCMDetails() {
        return this.http.get<any>(`${BASE_URL}masterccmdetails/getCCMDetails`);
    }
}
