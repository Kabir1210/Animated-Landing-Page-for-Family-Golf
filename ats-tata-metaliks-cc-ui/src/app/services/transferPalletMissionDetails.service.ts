import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";



import { TransferPalletMissionDetailsModel } from "../model/transferMissionDetails.model";
import { BASE_URL } from "../util/const";

@Injectable({
  providedIn: 'root'
})
export class TransferPalletMissiontDetailsService {


  constructor(private http: HttpClient) { }

  // public addAllPalletMovementDetailsInTransferPalletMissionDetails(palletMovementMissionDetailsInstance:TransferPalletMissionDetailsModel){
  //     return this.http.post<TransferPalletMissionDetailsModel>(`${BASE_URL}transferPalletMissionDetails/addPalletMovementDetailsInTransferPalletMissionDetails`,palletMovementMissionDetailsInstance,{observe:'response'});

  // }

  public addAllPalletMovementDetailsInTransferPalletMissionDetails(currentPositionName: string, destinationPositionName: string, userId: number, userName: string) {
    console.log("in service");
    console.log(currentPositionName);
    console.log(destinationPositionName);
    console.log(userId);

    return this.http.post<TransferPalletMissionDetailsModel[]>(
      `${BASE_URL}transferPalletMissionDetails/addPalletMovementDetailsInTransferPalletMissionDetails/${currentPositionName}/${destinationPositionName}/${userId}/${userName}`,
      { observe: 'response' }
    );
  }

  public fetchTransferPalletMissionDetails() {
    return this.http.get<TransferPalletMissionDetailsModel[]>(`${BASE_URL}transferPalletMissionDetails/findByCdatetime`);
  }

  public fetchAllTransferPalletMissionDetails() {
    return this.http.get<TransferPalletMissionDetailsModel[]>(`${BASE_URL}transferPalletMissionDetails/fetchTransferPalletMissionRuntimeDetails`);
  }

  public fetchTransferPalletDetailsByAllFilters(startDateTime: string, endDateTime: string) {
    return this.http.get<TransferPalletMissionDetailsModel[]>(`${BASE_URL}transferPalletMissionDetails/findByAllFilters/${startDateTime}/${endDateTime}`);
  }

  public generatePdf(transferPalletMissionDetailsObj: TransferPalletMissionDetailsModel[]) {
    return this.http.post<any[]>(`${BASE_URL}transferPalletMissionDetails/generatePdf`, transferPalletMissionDetailsObj, { observe: 'response' });
  }
}