import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MappingFloorAreaDetailsModel } from "../model/mappingFloorAreaDetails.model";
import { BASE_URL } from "../util/const";


@Injectable({
    providedIn: "root"
})
export class MappingFloorAreaDetailsService {
    fetchMappingFloorAreaDetailsByAreaIdAndFloorName( areaId: number,floorName: string) {
        return this.http.get<MappingFloorAreaDetailsModel>(`${BASE_URL}fetchMappingFloorAreaDetailsByAreaIdAndFloorName/${areaId}/${floorName}`)

    }
   
    constructor(private http: HttpClient) {

    }
    public updatAllMappingFloorAreaDetailsByareaId(infeedIsActive: number, outfeedIsActive: number, areaId: number) {
        return this.http.put<MappingFloorAreaDetailsModel[]>(`${BASE_URL}updateMappingFloorAreaDetailsByareaId/${infeedIsActive}/${outfeedIsActive}/${areaId}`, {

        });
    }
    public fetchMappingFloorAreaDetails() {
        return this.http.get<MappingFloorAreaDetailsModel[]>(`${BASE_URL}fetchAllMappingFloorAreaDetails`)

    }
    public fetchMappingFloorAreaDetailsByAreaId(areaId: number) {
        return this.http.get<MappingFloorAreaDetailsModel[]>(`${BASE_URL}fetchMappingFloorAreaByAreaId/${areaId}`)
    }
    public updateMappinFloorAreaDetails(mappingObj: MappingFloorAreaDetailsModel) {
        return this.http.put<MappingFloorAreaDetailsModel[]>(`${BASE_URL}updateMappingFloorAreaDetails`, mappingObj)
    }
}