import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AccessMatrixModel } from "../model/accessMatrix.model";
import { Observable } from "rxjs";
import { BASE_URL } from "../util/const";



@Injectable({
    providedIn: 'root',
})
export class AccessMatrixService {
   
    constructor(private http: HttpClient) { }


    public getAllAccessMatrixDetails() {
        return this.http.get<AccessMatrixModel[]>(`${BASE_URL}accessMatrix/fetchAllAccessMatrixDetails`);
    }
  

    updateAccessMatrix(accessMatrix: AccessMatrixModel): Observable<any> {
        return this.http.put<any>(`${BASE_URL}accessMatrix/update`, accessMatrix);
      }
}