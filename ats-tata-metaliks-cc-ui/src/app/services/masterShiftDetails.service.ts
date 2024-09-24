import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MasterShiftDetailsModel } from '../model/masterShiftDetails.model';
import { BASE_URL } from '../util/const';

@Injectable({
  providedIn: 'root'
})
export class MasterShiftDetailsService {


  constructor(private http: HttpClient) {

  }
  
  public fetchShiftDetails(){
    return this.http.get<MasterShiftDetailsModel[]>(`${BASE_URL}masterShiftDetails/getAllMasterShiftDetails`);
    // return this.http.get<MasterShiftDetailsModel[]>(`${BASE_URL}fetchAllMasterShiftDetails`);
}

public deleteShiftDetails(shiftId: number) {
  return this.http.post<MasterShiftDetailsModel>(`${BASE_URL}masterShiftDetails/updateShiftIsDeleted/${shiftId}`, {
              observe: 'response'
          })
    }

  //   public addProductDetails() {
  //     return this.http.post<MasterShiftDetailsModel>(`${BASE_URL}masterShiftDetails/addMasterShiftDetails`, {
  //         observe: 'response'
  //     })
  // }

  public updateShiftDetails(updateShiftDetailsInstance:MasterShiftDetailsModel) {
    return this.http.put<MasterShiftDetailsModel>(`${BASE_URL}masterShiftDetails/updateMasterShiftDetails`, updateShiftDetailsInstance, { observe: 'response'})
}

public addMasterShiftDetails(masterShiftDetails: MasterShiftDetailsModel) {
  return this.http.post<MasterShiftDetailsModel>(`${BASE_URL}masterShiftDetails/addMasterShiftDetails`, masterShiftDetails, { observe: 'response' });
}


// public addShiftDetails(addShiftDetailsInstance:MasterShiftDetailsModel){
//     //return this.http.post<MasterShiftDetailsModel>('http://localhost:8080/addMasterShiftDetails',addShiftDetailsInstance,{observe:'response'});
//     return this.http.post<MasterShiftDetailsModel>(`${BASE_URL}addMasterShiftDetails`,addShiftDetailsInstance,{observe:'response'});
// }
// public updateShiftDetails(updateShiftDetailsInstance:MasterShiftDetailsModel){
   
//   return this.http.put<MasterShiftDetailsModel>(`${BASE_URL}updateMasterShiftDetails`,updateShiftDetailsInstance,{observe:'response'});
//   // return this.http.put<MasterShiftDetailsModel>('http://localhost:8080/updateMasterShiftDetails',updateShiftDetailsInstance,{observe:'response'});
// }

// public fetchCurrentShiftDetails(){
//     return this.http.get<MasterShiftDetailsModel>(`${BASE_URL}fetchCurrentShiftDetails`);
// }

// public fetchCurrentTimeShiftDetails(){
//   // return this.http.get<MasterShiftDetailsModel[]>('http://localhost:8080/fetchCurrentShiftDetails');
//   return this.http.get<MasterShiftDetailsModel[]>(`${BASE_URL}fetchCurrentShiftDetails`);
// }


}

