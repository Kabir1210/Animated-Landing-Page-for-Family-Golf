import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BASE_URL } from '../util/const';
import { CurrentStockDetailsModel } from '../model/currentStockDetails.model';

// import { CurrentStockProductCountDetailsModel } from '../model/currentStockProductCountDetails.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CurrentStockDetailsService {

  constructor(private http: HttpClient) { }



  public findAllCurrentStockDetails() {
    return this.http.get<CurrentStockDetailsModel[]>(`${BASE_URL}currentStockDetails/findAllCurrentStockDetails`);
  }

  public findByPositionId(positionId: number): Observable<CurrentStockDetailsModel[]> {
    console.log("in service positionID");
    return this.http.get<CurrentStockDetailsModel[]>(`${BASE_URL}currentStockDetails/fetchByPositionId/${positionId}`);
  }


  public deleteCurrentStockDetailsByPositionId(positionId: number) {


    return this.http.put<CurrentStockDetailsModel>(`${BASE_URL}currentStockDetails/deleteCurrentStockDetailsByPositionId/${positionId}`, {
      observe: 'response'
    });
  }


  public validatePalletCode(palletCode: string) {
    return this.http.get<CurrentStockDetailsModel[]>(`${BASE_URL}currentStockDetails/getPalletCode/${palletCode}`, { observe: 'response' });
  }

  

  public validatePalletCode10(palletCode: string) {
    return this.http.get<CurrentStockDetailsModel[]>(`${BASE_URL}currentStockDetails/getPalletCode2/${palletCode}`, { observe: 'response' });
  }

  public validatePalletCode3(palletCode1: string) {
    return this.http.get<CurrentStockDetailsModel[]>(`${BASE_URL}currentStockDetails/getPalletCode/${palletCode1}`, { observe: 'response' });
  }
  // public validatePalletCode1(palletCode: string) {
  //   return this.http.get<CurrentStockDetailsModel[]>(`${BASE_URL}currentStockDetails/getPalletCode1/${palletCode}`, { observe: 'response' });
  // }


  validatePalletCode1(currentStockDetailsModel: CurrentStockDetailsModel): Observable<any> {
  
    return this.http.put<CurrentStockDetailsModel>(`${BASE_URL}currentStockDetails/getPalletCode1`, currentStockDetailsModel, {observe: 'response' });
  }
  
  addOrUpdateMasterPalletInformation(dispatchCurrentStockDetailsInstance: CurrentStockDetailsModel): Observable<any> {
    return this.http.post(`${BASE_URL}currentStockDetails/addOrUpdateMasterPalletInformation`, dispatchCurrentStockDetailsInstance);
  }

  updateCurrentStock(dispatchCurrentStockDetailsInstance: CurrentStockDetailsModel): Observable<any> {
    return this.http.post(`${BASE_URL}currentStockDetails/updateCurrentStock`, dispatchCurrentStockDetailsInstance);
  }

  
  // public fetchProductCountFromCurrentStockDetails(){
  //   return this.http.get<CurrentStockProductCountDetailsModel>(`${BASE_URL}fetchProductCountCurrentStockDetails`);
  // }

  // public fetchCountOfCurrentStockDetails(){
  //   return this.http.get<CurrentStockProductCountDetailsModel[]>(`${BASE_URL}fetchCountOfCurrentStockDetails`);
  // }


  // public findByAllFiltersDetails(currentstartDateTime: string, currentEndDateTime: string,
  //   coreSize: string , coreShop:string) {
  //   return this.http.get<CurrentStockDetailsModel[]>(`${BASE_URL}dispatchOrderDetails/fetchGenerateManualRetrivalOrderDetailsByAllFilters/${currentstartDateTime}/${currentEndDateTime}/${coreSize}/${coreShop}`);
  // }



  public findByAllFiltersDetails(currentstartDateTime: string, currentEndDateTime: string,
    coreSize: string, coreShop: string,palletCode:string) {
    return this.http.get<CurrentStockDetailsModel[]>(`${BASE_URL}currentStockDetails/findByAllFiltersDetails/${currentstartDateTime}/${currentEndDateTime}/${coreSize}/${coreShop}/${palletCode}`);
  }

  public fetchCurrentPalletStockDetailsByPalletCode(palletCode: string) {
    return this.http.get<CurrentStockDetailsModel[]>(
        `${BASE_URL}currentStockDetails/fetchAllCurrentPalletStockDetailsByPalletCode/${palletCode}`);
     
  }

}
















