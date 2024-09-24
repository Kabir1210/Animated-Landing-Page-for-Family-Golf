import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MasterRackDetailsModel } from "../model/masterRackDetails.model";
import { BASE_URL } from "../util/const";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})

export class MasterRackDetailsService {
    findByRackIdList2DLayout(areaId: number, floorId: number, rackSide: string) {
        return this.http.get<MasterRackDetailsModel[]>(`${BASE_URL}masterRackDetails/findByRackIdList2DLayout/${areaId}/${floorId}/${rackSide}`);
    }
    // findByRackIdList2DLayout(rackData: number[]) {
    //     return this.http.get<MasterRackDetailsModel[]>(`${BASE_URL}masterRackDetails/findByRackIdList2DLayout/${rackData}`);
 
    // }
    // findByRackIdList2DLayout(rackData: number[]) {
    //     // Convert the array of rack IDs into a comma-separated string
    //     const rackIdsString = rackData.join(',');
      
    //     // Make the HTTP GET request with the comma-separated string of rack IDs
    //     return this.http.get<MasterRackDetailsModel[]>(`${BASE_URL}masterRackDetails/findByRackIdList2DLayout/${rackIdsString}`)
          
    //   }
    unlockSelectedMultipleRackNofrom2DLayout(selectedStartMultipleunLockRackIdsName: number, selectedEndMultipleunLockRackIdsName: number) {
        return this.http.put<MasterRackDetailsModel>(`${BASE_URL}masterRackDetails/unlockSelectedMultipleRackNofrom2DLayout/${selectedStartMultipleunLockRackIdsName}/${selectedEndMultipleunLockRackIdsName}`
        ,
        { observe: 'response'}); 
    }
    lockSelectedMultipleRackNofrom2DLayout(selectedStartMultipleLockRackIdsName: number, selectedEndMultipleLockRackIdsName: number) {
        return this.http.put<MasterRackDetailsModel>(`${BASE_URL}masterRackDetails/lockSelectedMultipleRackNofrom2DLayout/${selectedStartMultipleLockRackIdsName}/${selectedEndMultipleLockRackIdsName}`
        ,
        { observe: 'response'}); 
    }
    unlockSelectedRackNofrom2DLayout(unLockRackId: number) {
        return this.http.put<MasterRackDetailsModel>(`${BASE_URL}masterRackDetails/unlockSelectedRackNofrom2DLayout/${unLockRackId}`
        ,
        { observe: 'response'}); 
    }
    lockSelectedRackNofrom2DLayout(lockrackId:number) {
       
        return this.http.put<MasterRackDetailsModel>(`${BASE_URL}masterRackDetails/lockSelectedRackNofrom2DLayout/${lockrackId}`
    ,
    { observe: 'response'}); 
          }



    constructor(private http: HttpClient) { }

    public fetchAllRackDetailsByAreaIdAndFloorId(areaId: number,floorId:number ) {
        console.log("positionIdData2 ser");
        return this.http.get<MasterRackDetailsModel[]>(`${BASE_URL}masterRackDetails/fetchByRackDetailsByAreaIdAndFloorId/${areaId}/${floorId}`);
    }

}