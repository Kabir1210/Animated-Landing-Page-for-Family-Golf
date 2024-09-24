export class DispatchOrderDetailsModel{
    dispatchOrderDetailsId!:number;
    transferOrderNo!:number;
    descriptionOfCore!:string;
    coreSize!:string;
    destination!:string;
    plannedQuantity!:number;
    actualQuantity!:number;
    totalQuantity!:number;
    remaningQuantity!:number;
    dispatchScheduleCdatetime!:string;
    isDispatchStart!:number;
    isDeleted!:number;
    isForceCompleted!:number;
    dispatchStatus!:string;
    userId!: number;
    userName!:string;
}