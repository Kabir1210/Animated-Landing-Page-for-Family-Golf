import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MappingFloorAreaDetailsModel } from "../model/mappingFloorAreaDetails.model";
import { BASE_URL } from "../util/const";


@Injectable({
    providedIn: "root"
})
export class MappingFloorAreaDetailsService {
    fetchMappingFloorAreaDetailsByAreaIdAndFloorName( areaId: number,floorName: string) {
        return this.http.get<MappingFloorAreaDetailsModel>(`${BASE_URL}mappingFloorAreaDetails/fetchMappingFloorAreaDetailsByAreaIdAndFloorName/${areaId}/${floorName}`)

    }
    fetchMappingFloorAreaDetailsByAreaIdAndFloorName2DLayout( areaId: number,floorId: number) {
        return this.http.get<MappingFloorAreaDetailsModel>(`${BASE_URL}mappingFloorAreaDetails/fetchMappingFloorAreaDetailsByAreaIdAndFloorName2DLayout/${areaId}/${floorId}`)

    }
    constructor(private http: HttpClient) { }

    public fetchMappingFloorAreaDetails() {
        return this.http.get<MappingFloorAreaDetailsModel[]>(`${BASE_URL}mappingFloorAreaDetails/fetchAllMappingFloorAreaDetails`)

    }
    public fetchMappingFloorAreaDetailsByAreaId(areaId: number) {
        return this.http.get<MappingFloorAreaDetailsModel[]>(`${BASE_URL}mappingFloorAreaDetails/fetchMappingFloorAreaByAreaId/${areaId}`)
    }

    public updatAllMappingFloorAreaDetails(mappingObj: MappingFloorAreaDetailsModel,infeedOutfeedStatus:string) {
        return this.http.put<MappingFloorAreaDetailsModel[]>(`${BASE_URL}mappingFloorAreaDetails/updateMappingFloorAreaDetails/${infeedOutfeedStatus}`, mappingObj,{observe:'response'})
    }
    public updatAllMappingFloorAreaDetailsByareaId(infeedIsActive: number, outfeedIsActive: number, areaId: number) {
        return this.http.put<MappingFloorAreaDetailsModel[]>(`${BASE_URL}mappingFloorAreaDetails/updateMappingFloorAreaDetailsByareaId/${infeedIsActive}/${outfeedIsActive}/${areaId}`, {

        });
    }

    public updatAllMappingFloorAreaDetailsByareaIdandfloorId(infeedIsActive: number, outfeedIsActive: number, areaId: number,floorId:number) {
        return this.http.put<MappingFloorAreaDetailsModel[]>(`${BASE_URL}mappingFloorAreaDetails/updateMappingFloorAreaDetailsByareaIdandfloorId/${infeedIsActive}/${outfeedIsActive}/${areaId}/${floorId}`, {

        });
    }

    public updatAllInfeedMappingFloorAreaDetailsByareaId(infeedIsActive: number, areaId: number) {
        return this.http.put<MappingFloorAreaDetailsModel[]>(`${BASE_URL}mappingFloorAreaDetails/updateInfeedMappingFloorAreaDetailsByareaId/${infeedIsActive}/${areaId}`, {

        });
    }

    public updatAllOutfeedMappingFloorAreaDetailsByareaId(outfeedIsActive: number, areaId: number) {
        return this.http.put<MappingFloorAreaDetailsModel[]>(`${BASE_URL}mappingFloorAreaDetails/updateOutfeedMappingFloorAreaDetailsByareaId/${outfeedIsActive}/${areaId}`, {

        });
    }

    public updateMappingFloorDetails() {
        return this.http.get<MappingFloorAreaDetailsModel[]>(`${BASE_URL}mappingFloorAreaDetails/updateMappingFloorDetails`);
    }




}