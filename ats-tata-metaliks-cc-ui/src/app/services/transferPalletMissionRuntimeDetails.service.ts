import { Injectable } from '@angular/core';
import { TransferPalletMissionRuntimeDetailsModel } from '../model/TransferPalletMissionRuntimeDetailsModel.model';
import { BASE_URL } from '../util/const';
import { RegisterResponse } from '../model/responseHandler.model';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransferPalletMissionRuntimeDetailsService {

  constructor(private http: HttpClient) { 
    
  }


public fetchAllTransferMissionByStatus() {
  return this.http.get<TransferPalletMissionRuntimeDetailsModel[]>(`${BASE_URL}transferPalletmissionruntimedetails/getAllTransferPalletCurrentMissionDetailsByStatus`);
}

public updateTransferMissionRuntimeDetails(transferMissionObj: TransferPalletMissionRuntimeDetailsModel) {
 
  return this.http.put<HttpResponse<RegisterResponse>>(`${BASE_URL}transferPalletMissionRuntimeDetails/updateTransferPalletMissionRuntimeDetailsDetails`, transferMissionObj);


}


}
