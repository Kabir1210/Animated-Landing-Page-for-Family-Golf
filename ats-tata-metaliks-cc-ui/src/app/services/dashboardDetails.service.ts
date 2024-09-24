import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DashboardDetailsModel } from "../model/dashboardDetails.model";
import { BASE_URL } from "../util/const";
import { Observable } from "rxjs/internal/Observable";


@Injectable({
  providedIn: 'root',
})

export class DashboardDeatilsService {
  constructor(private http: HttpClient) { }

  public getAllDayDashboardCount() {
    return this.http.get<DashboardDetailsModel>(`${BASE_URL}dashboardDetails/getAllDayDashboardCount`);
  }
  public fetch7DayInfeedandoutfeedCount() {
    return this.http.get<DashboardDetailsModel[]>(`${BASE_URL}dashboardDetails/fetch7DayInfeedandoutfeedCount`);
  }

 
}