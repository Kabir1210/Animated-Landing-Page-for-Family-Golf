import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MasterPositionDetailsModel } from "../model/masterPositionDetails.model";
import { BASE_URL } from "../util/const";
import { MasterRackPositionModel } from "../model/masterRackPosition.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MasterPositionDetailsService{
  BASE_URL: any;
  
 
    constructor(private http: HttpClient) {

    }
    public findByAreaIdAndFloorIdAndPositionIsDeleted() {
      return this.http.get<MasterPositionDetailsModel[]>(`${BASE_URL}findByAreaIdAndFloorIdAndPositionIsDeleted`);
    }

    fetchPositionListByRackId(rackId: number) {
      return this.http.get<MasterPositionDetailsModel[]>(`${BASE_URL}masterPositionDetails/fetchMasterPositionDetailsByRackId/${rackId}`);
    }

    
  // public findbyAreaIdAndFloorId(areaId : number, floorId: number){
  //   return this.http.get<MasterPositionDetailsModel[]>(`${BASE_URL}fetchMasterPositionDetailsByAreaIdAndFloorId/${areaId}/${floorId}`);
  // }

  public fetchMasterPositionDetails(){
    return this.http.get<MasterPositionDetailsModel[]>(`${BASE_URL}masterPositionDetails/fetchAllMasterPositionDetailsByPositionName`);
  }

  public fetchLeftMasterPositionDetails(){
    return this.http.get<MasterPositionDetailsModel[]>(`${BASE_URL}masterPositionDetails/findTopPositionDetailsFor2`);
  }

  public fetchRightMasterPositionDetails(){
    return this.http.get<MasterPositionDetailsModel[]>(`${BASE_URL}masterPositionDetails/findTopPositionDetailsFor1`);
  }

  fetchMasterPositionDetailsByFloorId(floorId:number){
    return this.http.get<MasterPositionDetailsModel[]>(`${BASE_URL}fetchMasterPositionDetailsByFloorId/${floorId}`);
  }

  // public updateMasterPositionIsActive(masterPositionObj : MasterPositionDetailsModel){
  //   return this.http.put<MasterPositionDetailsModel[]>(`${BASE_URL}updatePositionIsActive`, masterPositionObj)
  // }


  // public lockSelectedPositionIsActive(positionId: number) {
 
  //   return this.http.put<MasterPositionDetailsModel[]>(`${BASE_URL}lockSelectedPositionIsActive/${positionId}`,{observe:'response'});
  // }
  lockSelectedPositionIsActive(positionId: number, masterPositionDetailsEntity: MasterPositionDetailsModel): Observable<MasterPositionDetailsModel> {
    return this.http.put<MasterPositionDetailsModel>(`${BASE_URL}masterPositionDetails/lockSelectedPositionIsActive/${positionId}`, masterPositionDetailsEntity);
  }



  unlockSelectedPositionIsActive(positionId: number, masterPositionDetailsEntity: MasterPositionDetailsModel): Observable<MasterPositionDetailsModel> {
    return this.http.put<MasterPositionDetailsModel>(`${BASE_URL}masterPositionDetails/unlockSelectedPositionIsActive/${positionId}`, masterPositionDetailsEntity);
  }


  SelectedPositionFreeAllocate(positionId: number, masterPositionDetailsEntity: MasterPositionDetailsModel): Observable<MasterPositionDetailsModel> {
    return this.http.put<MasterPositionDetailsModel>(`${BASE_URL}masterPositionDetails/updatePositionDetailsIsAllocated/${positionId}`, masterPositionDetailsEntity);
  }

  // public unlockSelectedPositionIsActive(positionId: number){
  //   return this.http.put<MasterPositionDetailsModel[]>(`${BASE_URL}unlockSelectedPositionIsActive/${positionId}`,{observe:'response'});
  // }

  public UpdatePositionIsAllocated(positionId: number) {
    return this.http.put<MasterPositionDetailsModel>(`${BASE_URL}UpdatePositionIsAllocated/${positionId}`,{observe:'response'});
  }

  public updatePositionDetailsIsAllocatedAndEmpty(positionId: number){
    console.log("positionId");
    console.log(positionId);
    return this.http.put<MasterPositionDetailsModel>(`${BASE_URL}updatePositionDetailsIsAllocated/${positionId}`,{observe:'response'});
  }

  public updateIsManualDispatchInPositionDetails(positionId : number){
    return this.http.put<MasterPositionDetailsModel[]>(`${BASE_URL}updatePositonDetailsIsManualDispatch/${positionId}`,{observe:'response'});
  }

  public updateIsPositionAllocatedInPositionDetails(positionId : number){
    return this.http.put<MasterPositionDetailsModel[]>(`${BASE_URL}editIsAllocated/${positionId}`,{observe:'response'});
  }

  public fetchMasterPositionDetailsByNomeneclature(positionName: string) {
    return this.http.get<MasterPositionDetailsModel[]>(`${BASE_URL}masterPositionDetails/fetchAllMasterPositionDetailsByPositionName/${positionName}`)
}
public fetchMasterPositionDetailsByNomeneclatureAndPositionIsAllocatedAndEmptyPalletPositionAndPositionIsActive(positionName: string,positionIsAllocated:number,emptyPalletPosition:number,positionIsActive:number) {
       
  return this.http.get<MasterPositionDetailsModel>(`${BASE_URL}masterPositionDetails/fetchAllMasterPositionDetailsByPositionNameAndPositionIsAllocatedAndEmptyPalletPositionAndPositionIsActive/${positionName}/${positionIsAllocated}/${emptyPalletPosition}/${positionIsActive}`)
}
   
// public fetchMasterPositionDetailsByPositionId(positionId: number) {
//   return this.http.get<MasterPositionDetailsModel[]>(`${BASE_URL}masterPositionDetails/fetchAllMasterPositionDetailsByPositionId/${positionId}`)
// }
// public fetchMasterPositionDetailsByPositionIdAndPositionName(positionId: number,positionName:string) {
//   return this.http.get<MasterPositionDetailsModel[]>(`${BASE_URL}masterPositionDetails/fetchAllMasterPositionDetailsByPositionIdAndPositionName/${positionId}/${positionName}`)
// }
}