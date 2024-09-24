import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "../util/const";
import { DispatchOrderDetailsModel } from "../model/dispatchOrderDetailsModel.model";





@Injectable({
    providedIn: 'root',
})

export class DispatchOrderDeatilsService {


    constructor(private http: HttpClient) { }


    public findAllGenerateManualRetrievalOrder() {
        return this.http.get<DispatchOrderDetailsModel[]>(`${BASE_URL}dispatchOrderDetails/findAllGenerateManualRetrievalOrder`);
    }


    public fetchGenerateManualRetrivalOrderDetailsByAllFilters(dispatchScheduleCdatetimeStart:string, dispatchScheduleCdatetimeEnd:string,
        coreSize:string, destination:string,dispatchStatus:string){
          
       return this.http.get<DispatchOrderDetailsModel[]>(`${BASE_URL}dispatchOrderDetails/fetchGenerateManualRetrivalOrderDetailsByAllFilters/${dispatchScheduleCdatetimeStart}/${dispatchScheduleCdatetimeEnd}/${coreSize}/${destination}/${dispatchStatus}`);
    }

    public  fetchAllManualRetrivalOrderDetailsByCurrentDate(){
        return this.http.get<DispatchOrderDetailsModel[]>(`${BASE_URL}dispatchOrderDetails/fetchAllGenerateManualRetrivalOrderDetailsByCurrentDate`)
    }

 public updateGenerateManualRetrivalIsDispatchStart(dispatchOrderDetailsModelobject: DispatchOrderDetailsModel) {

        console.log("in dispatch order details servie ")
        return this.http.put<DispatchOrderDetailsModel>(`${BASE_URL}dispatchOrderDetails/updateGenerateManualRetrivalIsDispatchStart`,
         dispatchOrderDetailsModelobject,{observe:'response'});

    }

    //  public addPalletQuantity(dispatchOrderDetailsModelobject: DispatchOrderDetailsModel[],newPlannedQuantity:number) {

    //     console.log("in dispatch order details servie1 ")
    //     return this.http.put<DispatchOrderDetailsModel>(`${BASE_URL}dispatchOrderDetails/updateManualRetrivalPalletQuantity/${newPlannedQuantity}`,
    //      dispatchOrderDetailsModelobject,{observe:'response'});

    // }


      public addPalletQuantity(dispatchOrderDetailsModelobject: DispatchOrderDetailsModel) {

        console.log("in dispatch order details servie1 ")
        return this.http.put<DispatchOrderDetailsModel>(`${BASE_URL}dispatchOrderDetails/updatePalletQuantity`,
         dispatchOrderDetailsModelobject,{observe:'response'});

    }
    

    public addPalletQuantity1(dispatchOrderDetailsModelobject: DispatchOrderDetailsModel) {

        console.log("in dispatch order details servie1 ")
        return this.http.put<DispatchOrderDetailsModel>(`${BASE_URL}dispatchOrderDetails/updatePalletQuantity`,
         dispatchOrderDetailsModelobject,{observe:'response'});

    }

    public addGenerateRetrivalManualDetails(DispatchOrderDetails: DispatchOrderDetailsModel) {
        return this.http.post<DispatchOrderDetailsModel>(`${BASE_URL}dispatchOrderDetails/addGenerateRetrivalManualDetails`, DispatchOrderDetails, { observe: 'response' });
    }

    

    public updateOrderDetailsIsDeleted(dispatchOrderDetailsId: number) {
        return this.http.put<DispatchOrderDetailsModel>(`${BASE_URL}dispatchOrderDetails/updateOrderDetailsIsDeleted/${dispatchOrderDetailsId}`, { observe: 'response' });
    }

}