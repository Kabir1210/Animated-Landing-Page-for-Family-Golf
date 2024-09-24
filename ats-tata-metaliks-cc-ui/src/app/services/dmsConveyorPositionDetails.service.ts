import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DmsConveyorPositionDetailsModel } from "../model/dmsConveyorPositionDetails.model";
import { BASE_URL } from "../util/const";

@Injectable({
    providedIn: 'root',
})

export class DmsConveyorPositionDetailsService{

    constructor(private http: HttpClient) { }
   
    public findAllDmsConveyor() {
        return this.http.get<DmsConveyorPositionDetailsModel[]>(`${BASE_URL}dmsConveyor/findAllDmsConveyor`);
    }

   
    public  findAllLineNumberOne() {
        return this.http.get<DmsConveyorPositionDetailsModel[]>(`${BASE_URL}dmsConveyor/findAllLineNumberOne`);
    }
}