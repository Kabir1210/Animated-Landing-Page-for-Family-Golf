
import { Injectable } from "@angular/core";
import { MasterUserDetailsModel } from "../model/masterUserDetails.model";
import { BASE_URL } from "../util/const";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MasterUserDetailsService {

  constructor(private http: HttpClient) { }

  public fetchAllMasterUserDetails() {
    return this.http.get<MasterUserDetailsModel[]>(`${BASE_URL}masterUserDetails/fetchAllMasterUserDetails`);
}

// public addMasterUserDetails(masterUserDetails: MasterUserDetailsModel) {
//     return this.http.post<MasterUserDetailsModel>(`${BASE_URL}masterUserDetails/addMasterUserDetails`, masterUserDetails, { observe: 'response' });
// }



public addMasterUserDetails(data: MasterUserDetailsModel, file: File) {


  const formData: FormData = new FormData();

  formData.append('file', file);

  let param = new HttpParams();

  param = param.append('firstName', data.firstName);
  param = param.append('lastName', data.lastName);
  param = param.append('userTitle', data.userTitle);
  param = param.append('userName', data.userName);
  param = param.append('userPassword', data.userPassword);
  param = param.append('contactNumber', data.contactNumber);
  param = param.append('emailId', data.emailId);
  param = param.append('personalId', data.personalId);

  param = param.append('roleName', data.roleName);
param = param.append('userIsDeleted', data.userIsDeleted);

  return this.http.post<MasterUserDetailsModel>(`${BASE_URL}masterUserDetails/addMasterUserDetails`, formData, {
    params: param
  });
}



public updateMasterUserDetails(userId: number, data: MasterUserDetailsModel, file: File) {
  const formData: FormData = new FormData();

  formData.append('file', file);

  let param = new HttpParams();
  param = param.append('userId', data.userId)
  param = param.append('firstName', data.firstName);
  param = param.append('lastName', data.lastName);
  param = param.append('userTitle', data.userTitle);
  param = param.append('userName', data.userName);
 // param = param.append('userPassword', data.userPassword);
  param = param.append('contactNumber', data.contactNumber);

  param = param.append('emailId', data.emailId);
  

  param = param.append('roleName', data.roleName);
  param = param.append('user', data.userIsDeleted);

  console.log(data);
  // console.log("file: " + file);
  return this.http.put<MasterUserDetailsModel>(`${BASE_URL}masterUserDetails/updateMasterUserDetails/${userId}`, formData, {
    params: param
  });
}




// public updateMasterUserDetails(masterUserDetails: MasterUserDetailsModel) {
//     return this.http.put<MasterUserDetailsModel>(`${BASE_URL}masterUserDetails/updateMasterUserDetails`,masterUserDetails, { observe: 'response' });
// }

public deleteUserDetails(userId: number) {
    return this.http.put<MasterUserDetailsModel>(`${BASE_URL}masterUserDetails/deleteUserDetails/${userId}`, { observe: 'response' });
}
}





 
 
