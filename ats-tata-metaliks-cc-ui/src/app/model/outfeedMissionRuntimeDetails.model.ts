import { MasterPalletInformationDetailsModel } from "./masterPalletInformationDetails.model"
import { MasterPositionDetailsModel } from "./masterPositionDetails.model"
import { MasterProductDetailsModel } from "./masterProductDetails.model"
import { MasterSKUDetailsModel } from "./masterSKUDetails.model"

export class OutfeedMissionRuntimeDetailsModel {

 
    outfeedMissionId!:number
    palletInformationId!: number
	palletCode!: string
	productId!: number
	productName!: string
	productVariantId!: number
	productVariantName!: string
	productVariantNameE2!: string

	productVariantCode!: string
	productVariantCodeE2!: string
	batchNumber!: string
	modelNumber!:string
	modelNumberE2!:string
	quantity!:number
	engine1Code!: string
	engine2Code!: string
	engine1Weight!:number
	engine2Weight!:number
	location!:string
	// weight !: number
	floorId !: number
	floorName!: string
	areaId!: number
	areaName!: string
	rackId!: number
	rackSide!: string
	rackColumn!: number
	positionId!: number
	positionName!: string
	positionNumberInRack!: number
	shiftNumber!:number
	shiftName!: string
	palletStatusId!:number
	palletStatusName!:string
	outfeedMissionCdatetime!: string
	outfeedMissionStartDatetime!: string
	outfeedMissionEndDatetime!: string
	missionRuntimeOutfeedStatus!: string
	outfeedMissionIsDeleted !: number
	missionRuntimeOutfeedDetailsId ! : number
	outfeedMissionStatus!: string

	palletType!:string
	serialNoStartingChar!:string;
	stationId!:number;
	engineDispatchScheduleHistoryDetailsId!:number
	missionRouteId!: number
	missionRuntimeOutfeedStartDate!: string
	missionRuntimeOutfeedEndDate!: string
	missionRuntimeOutfeedEndTime!: string
	missionRuntimeOutfeedStartTime!: string
	skuCode!: string
	prodOrderNo!: string
	batchNo!: string
	skuName!: string
	truckNo!: string
	loadingBay!: string
    skuDescription!: string
    masterPalletInformationEntity!: MasterPalletInformationDetailsModel
    masterSKUDetailsEntity!: MasterSKUDetailsModel
    masterPositionDetailsEntity!: MasterPositionDetailsModel
	masterProductDetailsEntity!: MasterProductDetailsModel
    coreSize!:string;
    capacity!:number;
    shiftId!:number;
    cdatetime!:string;
    orderId!:number;
    wmsTransferOrderId!:number;

}