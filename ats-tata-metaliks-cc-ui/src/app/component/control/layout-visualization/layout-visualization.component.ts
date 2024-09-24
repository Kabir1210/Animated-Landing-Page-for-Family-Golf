import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ControlComponent } from '../control.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MasterPositionDetailsModel } from '../../../model/masterPositionDetails.model';
import { MasterRackPositionModel } from '../../../model/masterRackPosition.model';
import { MasterRackDetailsModel } from '../../../model/masterRackDetails.model';
import { MasterFloorDetailsModel } from '../../../model/masterFloorDetails.model';
import { MasterAreaDetailsModel } from '../../../model/masterAreaDetails.model';


import { AuditTrailReportModel } from '../../../model/auditTrailReport.model';
import { MasterAreaDetailsService } from '../../../services/masterAreaDetails.service';
import { MasterPositionDetailsService } from '../../../services/masterPositionDetails.service';
import { MappingFloorAreaDetailsService } from '../../../services/mappingFloorAreaDetails.service';
import { AuthenticationService } from '../../../services/auth.service';
import { MasterPalletInformationDetailsService } from '../../../services/masterPalletInformationDetails.service';

import { MasterCCLoggerDetailsService } from '../../../services/masterCCLoggerDetails.service';
import { AuditTrailDetailsService } from '../../../services/auditTrailDetails.service';
import { MasterTruckPositionDetailsService } from '../../../services/masterTruckPositionDetails.service';
import { MasterRackDetailsService } from '../../../services/masterRackDetails.service';

import { ManualPalletDirectDispatchDetailsService } from '../../../services/manualPalletDirectDispatchDetails.service';
import { CurrentStockDetailsModel } from '../../../model/currentStockDetails.model';
import { CurrentStockDetailsService } from '../../../services/currentStockDetails.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImportsModule } from '../../../import';
import { ManualOutfeedMissionDetailsService } from '../../../services/manualOutfeedMissionDetails.service';
import { ManualOutfeedMissionDetailsModel } from '../../../model/manualOutfeedMissionDetails.model';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-layout-visualization',
  standalone: true,
  imports: [ImportsModule, ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './layout-visualization.component.html',
  styleUrl: './layout-visualization.component.css'
})
export class LayoutVisualizationComponent implements OnInit {
  dispatchForm!: FormGroup;
  @ViewChild('coreSizeInput', { static: false }) coreSizeInput: ElementRef | undefined;
  modalVisibility: { [key: string]: boolean } = {};
  selectedFloorId!: number
  selectedAreaId!: number
  isPositionIsLock!: boolean;
  productDialog: boolean = false;
  positionId!: number;
  trolleyNo!: string;
  quantityModal!: string
  skuCodeModal!: string
  skuNameModal!: string
  batchNumberModal!: string
  productName!: string
  selectAreaId!: number;
  selectAreaName!: string;
  quantity!: number;
  coreSize: string = '';
  isRackPositionIsLock: boolean = false;
  isEmptypalletPosition: boolean = false;
  positionLockUnLockDeleteDetails!: string;
  loading: boolean = true;

  // positionIdLockUnLockDeleteDetails!: number;
  positionIdLockUnLockDeleteDetails!: string;
  positionNameLockUnLockDeleteDetails!: string;
  transactionDetails!: string;
  positionIdAndNameLockUnLockDeleteDetails!: String;
  positionIdAndNameUserIdLockUnLockDeleteDetails!: String;
  positionByUserIdLockUnLockDeleteDetails!: String;
  by!: String;
  masterposition!: MasterPositionDetailsModel;
  positionIsAllocated: boolean = false;
  isPositionIsEmpty: boolean = false;
  isManualDispatch: boolean = false;
  isPositionIsAllocated: boolean = false;
  isMaterialLoaded: boolean = false;
  palletId!: number;
  // coreSize!: string;
  binLocation!: any;
  nomenclature!: any;
  positionId2!: number;
  rackDataSelected!: any
  selectedPositionId!: number;
  // palletCode: string = "";
  // palletCode: string = "";
  palletCode!: string;
  userName!: string;
  materialCode!: string;
  materialName!: string;
  userId: any;
  selectedButton: any;
  addReasonName!: string;
  reason!: any;
  field!: any;
  DestinationList: any[] = ['CCM-6', 'CCM-7', 'CCM-8', 'CCM-9', 'CCM-10', 'REWORK'];
  selectedDestination!: string;
  operatorsAction!: any;

  stackerPositionListA1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4]

  currentStockDetailsList: CurrentStockDetailsModel[] = [];

  masterpositionIdList: MasterPositionDetailsModel[] = [];
  fetchAllMasterPositionDetailsList: MasterPositionDetailsModel[] = [];
  positionList!: MasterPositionDetailsModel;
  masterPosition!: MasterPositionDetailsModel;
  masterPositionDetailsEntity: MasterPositionDetailsModel = new MasterPositionDetailsModel();
  addManualOutfeedMissionInstance: ManualOutfeedMissionDetailsModel = new ManualOutfeedMissionDetailsModel();
  dispatchCurrentStockDetailsInstance: CurrentStockDetailsModel = new CurrentStockDetailsModel();
  currentStock!: CurrentStockDetailsModel;

  masterRackPositionList: MasterRackPositionModel[] = [];
  masterRackPositionListLSIDE: MasterRackPositionModel[] = [];
  masterRackPositionListRSIDE: MasterRackPositionModel[] = [];


  masterPositionListLSIDE1: MasterPositionDetailsModel[] = [];
  masterPositionListLSIDE2: MasterPositionDetailsModel[] = [];
  masterPositionListLSIDE3: MasterPositionDetailsModel[] = [];
  masterPositionListLSIDE4: MasterPositionDetailsModel[] = [];
  masterPositionListLSIDE5: MasterPositionDetailsModel[] = [];
  masterPositionListLSIDE6: MasterPositionDetailsModel[] = [];

  masterPositionListRSIDE1: MasterPositionDetailsModel[] = [];
  masterPositionListRSIDE2: MasterPositionDetailsModel[] = [];
  masterPositionListRSIDE3: MasterPositionDetailsModel[] = [];
  masterPositionListRSIDE4: MasterPositionDetailsModel[] = [];
  masterPositionListRSIDE5: MasterPositionDetailsModel[] = [];
  masterPositionListRSIDE6: MasterPositionDetailsModel[] = [];
  updateInstance: CurrentStockDetailsModel = new CurrentStockDetailsModel();

  floorNameDropDownList: MasterFloorDetailsModel[] = []
  areaNameDropDownList: MasterAreaDetailsModel[] = []

  floorIdDetails: MasterFloorDetailsModel[] = [];
  areaIdDetails: MasterAreaDetailsModel[] = [];

  // :MasterRackPositionModel=new MasterRackPositionModel();
  selectedRackIdButton!: number;
  selectLoadingBay!: number;
  isOutfeedInactiveDisable: boolean = false;
  unlockRackReason!: String;
  fillDataReason!: string
  lockRackReason!: String;
  lastPalletPresentIdForDispatch!: number;
  enableManualDispatchButton: boolean = false;
  lockSelectedRackNumber!: number;
  truckNumber!: string;
  odbNumber!: string;
  submitted: boolean = false;
  selectedEndMultipleLockRackId!: number
  selectedStartMultipleLockRackId!: number
  showConfirmationDialog: boolean = false;
  selectedEndMultipleUnLockRackId!: number
  selectedStartMultipleUnLockRackId!: number

  selectedStartMultipleLockRackIdsName!: number;
  selectedEndMultipleLockRackIdsName!: number;
  selectedStartMultipleunLockRackIdsName!: number;
  selectedEndMultipleunLockRackIdsName!: number;

  editCurrentStockDetailsForSelectedIdInstance: CurrentStockDetailsModel = new CurrentStockDetailsModel();
  deleteCurrentStockDetailsForSelectedIdInstance: CurrentStockDetailsModel = new CurrentStockDetailsModel();
  manualOutFeedMissionDetailsInstance: ManualOutfeedMissionDetailsModel = new ManualOutfeedMissionDetailsModel();
  selectedStartrackIdForLock!: number;
  selectedEndrackIdForLock!: number;

  uniquelockAndUnlockMultipleRackDataList: number[] = [];
  rackIdList: number[] = [];
  greaterthanRackIdForLock!: number;
  lessthanRackIdForLock!: number;
  intervalId: any;
  floorAreaIsActivateInActive!: boolean;
  disableModalFormforIsEmpty!: boolean;
  disableModalFormforIsLock!: boolean;
  disableModalFormforIsdeadCell!: boolean;
  disableModalFormforIsPalletCodeIsEmpty!: boolean;
  isFillEnable!: boolean;
  floorId!: number;
  areaId!: number;
  editReasonidname!: string
  disableFloorAreafloorAreaIsActive: boolean = false;
  columnCount: any;
  auditTrailReportDetails: AuditTrailReportModel = new AuditTrailReportModel();
  createRange: any;
  rackColumnCount = [1]
  displayModal: boolean = false;
  currentStockPositionId!: number;
  currentStockCoreSize!: string;
  productDetailsTableList: MasterAreaDetailsModel[] = [];
  masterRackDetailsList: MasterRackDetailsModel[] = [];
  validationMessage: string = '';
  isValidated: boolean = false;
  isValidated1: boolean = false;





  //showConfirmationDialog: boolean = false;
  openDialog(id: string) {
    this.modalVisibility[id] = true;
    this.displayModal = false;
  }
  ngOnInit(): void {
    this.dispatchForm = this.fb.group({
      palletCode: ['', Validators.required],
      coreSize: ['', Validators.required],
      quantity: ['', Validators.required]
    });
    this.fetchAllLeftMasterpositionDetails();
    this.fetchAllRightMasterpositionDetails()
    //   this.fetchMasterPositionDetails();
    // }, 8 * 1000);
    // this.checkMappingFloorAreaActive();
    // this.fetchMasterFloorDetails();
    // this.fetchMasterAreaDetails();

    // // this.fetchMasterPositionDetails();

    // this.fetchAllLoadingBayData();

  }

  // private masterFloorDetailsService: MasterFloorDetailsService,


  constructor(
    private currentStockDetailsService: CurrentStockDetailsService,
    private masterAreaDetailsService: MasterAreaDetailsService,
    private masterPositionDetailsService: MasterPositionDetailsService,
    private mappingFloorAreaDetailsService: MappingFloorAreaDetailsService,
    private authService: AuthenticationService,

    private masterRackDetailsService: MasterRackDetailsService,
    private masterTruckPositionDetailsService: MasterTruckPositionDetailsService,
    private manualPalletDirectDispatchDetailsService: ManualPalletDirectDispatchDetailsService,
    private masterPalletInformationService: MasterPalletInformationDetailsService,
    private userAuditTrailReportDetailsService: AuditTrailDetailsService,
    private masterCCLoggerDetailsService: MasterCCLoggerDetailsService,
    private manualOutfeedMissionDetailsService: ManualOutfeedMissionDetailsService,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) {

  }

  checkMappingFloorAreaActive() {
    console.log(" *disableFloorAreafloorAreaIsActive* 2");
    console.log(this.disableFloorAreafloorAreaIsActive);
    this.disableFloorAreafloorAreaIsActive = false



    // this.mappingFloorAreaDetailsService.fetchMappingFloorAreaDetailsByAreaIdAndFloorName2DLayout(this.areaId, this.floorId).subscribe(mappingFloorAreaDetails => {
    // this.mappingFloorAreaDetails = mappingFloorAreaDetails;
    // console.log(" $$  this.mappingFloorAreaDetails ");
    // console.log(this.mappingFloorAreaDetails);

    // if (this.mappingFloorAreaDetails.floorAreaIsActive == 0) {
    //   this.disableFloorAreafloorAreaIsActive = true
    //   console.log(" *disableFloorAreafloorAreaIsActive* 22");
    //   console.log(this.disableFloorAreafloorAreaIsActive);

    // }
  }


  public fetchAllLeftMasterpositionDetails() {

    this.masterPositionDetailsService.fetchLeftMasterPositionDetails().subscribe(masterPositionList => {
      this.fetchAllMasterPositionDetailsList = masterPositionList;
      console.log(masterPositionList.length);
      console.log("masterPositionList :: " + this.fetchAllMasterPositionDetailsList.length);

      this.masterPositionListRSIDE1 = this.fetchAllMasterPositionDetailsList.slice(0, 26);
      console.log("List1" + this.masterPositionListRSIDE1[0].positionId);
      this.masterPositionListRSIDE2 = this.fetchAllMasterPositionDetailsList.slice(26, 52);
      console.log("List2" + this.masterPositionListRSIDE2[0].positionId);
      this.masterPositionListRSIDE3 = this.fetchAllMasterPositionDetailsList.slice(52, 78);
      console.log("List3" + this.masterPositionListRSIDE3[0].positionId);
      this.masterPositionListRSIDE4 = this.fetchAllMasterPositionDetailsList.slice(78, 104);
      console.log("List4" + this.masterPositionListRSIDE4[0].positionId);
      this.masterPositionListRSIDE5 = this.fetchAllMasterPositionDetailsList.slice(104, 130);
      console.log("List5" + this.masterPositionListRSIDE5[0].positionId);
      this.masterPositionListLSIDE6 = this.fetchAllMasterPositionDetailsList.slice(130, 156)
      console.log("List6" + this.masterPositionListLSIDE6[0].positionId);

    })
  }

  public fetchAllRightMasterpositionDetails() {
    this.masterPositionDetailsService.fetchRightMasterPositionDetails().subscribe(masterPositionList => {
      this.fetchAllMasterPositionDetailsList = masterPositionList;
      console.log("count!!!!" + masterPositionList.length);
      this.masterPositionListLSIDE1 = this.fetchAllMasterPositionDetailsList.slice(0, 26);
      this.masterPositionListLSIDE2 = this.fetchAllMasterPositionDetailsList.slice(26, 52);
      this.masterPositionListLSIDE3 = this.fetchAllMasterPositionDetailsList.slice(52, 78);
      this.masterPositionListLSIDE4 = this.fetchAllMasterPositionDetailsList.slice(78, 104);
      this.masterPositionListLSIDE5 = this.fetchAllMasterPositionDetailsList.slice(104, 130);
    })
  }
  public editCurrentStockDetailsRow(editCurrentStockDetailsRowInstance: CurrentStockDetailsModel) {
    this.dispatchCurrentStockDetailsInstance = Object.assign({}, editCurrentStockDetailsRowInstance);
    this.displayModal = false;
    this.modalVisibility['editPositionModalId'] = true; 
  }
  public deleteCurrentStockDetailsRow(deleteCurrentStockDetailsRowInstance: CurrentStockDetailsModel) {


    this.deleteCurrentStockDetailsForSelectedIdInstance = Object.assign({}, deleteCurrentStockDetailsRowInstance);
  }

  fetchCurrentPalletStockDetailsByPositionId(event: any,nomenclature: any, positionId: number, positionName: any, isLock: boolean, isEmpty: boolean, isAllocated: boolean,
     isManualDispatch: boolean) {
    event.stopPropagation();


    this.isPositionIsLock = isLock;
    this.isEmptypalletPosition = isEmpty;
    this.positionIsAllocated = isAllocated;
    this.isManualDispatch = isManualDispatch;

    console.log(" this.isPositionIsLock = isLock :: " + this.isPositionIsLock);
    console.log(" this.isPositionIsLock = isLock :: " + isLock);
    this.binLocation = positionName;
    this.nomenclature = nomenclature;
    this.positionId2 = positionId;
    console.log("pos..." + this.positionId2)
    this.trolleyNo = "";

    this.currentStockDetailsService.findByPositionId(positionId).subscribe(CurrentStockDetailsByPositionIdList => {
      if (CurrentStockDetailsByPositionIdList.length > 0) {
        this.currentStockDetailsList = CurrentStockDetailsByPositionIdList;
        console.log("in cuurentStock::" + JSON.stringify(this.currentStockDetailsList));
        console.log("currentStockDetailsList length::" + this.currentStockDetailsList.length);
        console.log("positionId:" + positionId);
        this.trolleyNo = this.currentStockDetailsList[0].palletCode;
        this.materialName = this.currentStockDetailsList[0].productVariantName;
        this.materialCode = this.currentStockDetailsList[0].productVariantCode;
        this.palletCode = this.currentStockDetailsList[0].palletCode;
        this.coreSize = this.currentStockDetailsList[0].coreSize;

        // this.fetchAllMasterpositionDetails()
        this.showDialog();

      }
    });
  }



  showDialog() {
    this.displayModal = true;
  }

  cancel() {
    this.displayModal = false;
  }

  save() {
    // Save logic here
    this.displayModal = false;
  }
  // public fetchAllMasterpositionDetails() {
  //   this.masterPositionDetailsService.fetchMasterPositionDetails().subscribe(masterPositionList => {
  //     this.fetchAllMasterPositionDetailsList = masterPositionList;
  //     console.log("**** ::"+masterPositionList)
  //   })
  // }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.displayModal = false;

  }
  closeDialog(id: string) {
    this.modalVisibility[id] = false;
  }




  lockSelectedPosition() {
    console.log("condn ::" + this.isPositionIsLock);
    console.log('positionId:', this.positionId2);
    this.positionLockUnLockDeleteDetails = "Position Locked :" + " ";
    this.positionIdLockUnLockDeleteDetails = this.positionId2.toString();
    this.positionNameLockUnLockDeleteDetails = " " + this.binLocation;
    this.positionIdAndNameLockUnLockDeleteDetails = this.positionIdLockUnLockDeleteDetails.toString().concat(this.positionNameLockUnLockDeleteDetails.toString());
    this.by = " " + "by" + "  ";
    this.positionByUserIdLockUnLockDeleteDetails = this.by.concat(this.authService.currentUserValue.userName.toString())
    this.positionIdAndNameUserIdLockUnLockDeleteDetails = this.positionIdAndNameLockUnLockDeleteDetails.concat(this.positionByUserIdLockUnLockDeleteDetails.toString())
    this.operatorsAction = this.positionLockUnLockDeleteDetails.concat(this.positionIdAndNameUserIdLockUnLockDeleteDetails.toString());
    this.operatorsAction = this.positionLockUnLockDeleteDetails.concat(this.positionIdAndNameUserIdLockUnLockDeleteDetails.toString());
    this.reason = this.addReasonName;
    this.field = this.addReasonName;

    this.userAuditTrailReportDetailsService.addUserAuditTrailDetails(this.operatorsAction, this.positionId2, this.reason, this.field, this.authService.currentUserValue.userName).subscribe(reasonData => {

    })
    console.log('positionId2:', this.positionId2);
    this.masterPositionDetailsService.lockSelectedPositionIsActive(this.positionId2, this.masterPositionDetailsEntity).subscribe(lockPositionData1 => {

      
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Position Locked Succesfully.', life: 3000 });
      this.isPositionIsLock = false;
      console.log(" this.isPositionIsLock::" + this.isPositionIsLock)
      this.closeDialog('lockPositionModalId');

      this.fetchAllLeftMasterpositionDetails();
      this.fetchAllRightMasterpositionDetails();

    })

  }




  unlockSelectedPosition() {
    console.log("condn ::" + this.isPositionIsLock);
    console.log('positionId:', this.positionId2);
    this.positionLockUnLockDeleteDetails = "Position unlocked :" + " ";
    this.positionIdLockUnLockDeleteDetails = this.positionId2.toString();
    this.positionNameLockUnLockDeleteDetails = " " + this.binLocation;
    this.positionIdAndNameLockUnLockDeleteDetails = this.positionIdLockUnLockDeleteDetails.toString().concat(this.positionNameLockUnLockDeleteDetails.toString());
    this.by = " " + "by" + "  ";
    this.positionByUserIdLockUnLockDeleteDetails = this.by.concat(this.authService.currentUserValue.userName.toString())
    this.positionIdAndNameUserIdLockUnLockDeleteDetails = this.positionIdAndNameLockUnLockDeleteDetails.concat(this.positionByUserIdLockUnLockDeleteDetails.toString())
    this.operatorsAction = this.positionLockUnLockDeleteDetails.concat(this.positionIdAndNameUserIdLockUnLockDeleteDetails.toString());
    this.operatorsAction = this.positionLockUnLockDeleteDetails.concat(this.positionIdAndNameUserIdLockUnLockDeleteDetails.toString());
    this.reason = this.addReasonName;
    this.field = this.addReasonName;

    this.userAuditTrailReportDetailsService.addUserAuditTrailDetails(this.operatorsAction, this.positionId2, this.reason, this.field, this.authService.currentUserValue.userName).subscribe(reasonData => {

    })
    console.log('positionId:', this.positionId2);
    this.masterPositionDetailsService.unlockSelectedPositionIsActive(this.positionId2, this.masterPositionDetailsEntity).subscribe(lockPositionData1 => {

      
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Position Unlocked Succesfully', life: 3000 });
      this.isPositionIsLock = true;
      console.log(" this.isPositionIsLock::" + this.isPositionIsLock)
      this.closeDialog('unlockPositionModalId');

      this.fetchAllLeftMasterpositionDetails();
      this.fetchAllRightMasterpositionDetails();

    })

  }


  freeAllocateSelectedPosition() {
    console.log("condn ::" + this.isPositionIsLock);
    console.log('positionId:', this.positionId2);
    this.positionLockUnLockDeleteDetails = "Position Free Allocated :" + " ";
    this.positionIdLockUnLockDeleteDetails = this.positionId2.toString();
    this.positionNameLockUnLockDeleteDetails = " " + this.binLocation;
    this.positionIdAndNameLockUnLockDeleteDetails = this.positionIdLockUnLockDeleteDetails.toString().concat(this.positionNameLockUnLockDeleteDetails.toString());
    this.by = " " + "by" + "  ";
    this.positionByUserIdLockUnLockDeleteDetails = this.by.concat(this.authService.currentUserValue.userName.toString())
    this.positionIdAndNameUserIdLockUnLockDeleteDetails = this.positionIdAndNameLockUnLockDeleteDetails.concat(this.positionByUserIdLockUnLockDeleteDetails.toString())
    this.operatorsAction = this.positionLockUnLockDeleteDetails.concat(this.positionIdAndNameUserIdLockUnLockDeleteDetails.toString());
    this.operatorsAction = this.positionLockUnLockDeleteDetails.concat(this.positionIdAndNameUserIdLockUnLockDeleteDetails.toString());
    this.reason = this.addReasonName;
    this.field = this.addReasonName;

    this.userAuditTrailReportDetailsService.addUserAuditTrailDetails(this.operatorsAction, this.positionId2, this.reason, this.field, this.authService.currentUserValue.userName).subscribe(reasonData => {

    })
    console.log('positionId:', this.positionId2);
    this.masterPositionDetailsService.SelectedPositionFreeAllocate(this.positionId2, this.masterPositionDetailsEntity).subscribe(lockPositionData1 => {

    
      this.messageService.add({ severity: 'warning', summary: 'Successful', detail: 'Position free Allocated Succesfully', life: 3000 });
      this.isPositionIsLock = false;
      console.log(" this.isPositionIsLock::" + this.isPositionIsLock)
      this.closeDialog('freeAllocatedPositionModalId');

      this.fetchAllLeftMasterpositionDetails();
      this.fetchAllRightMasterpositionDetails();

    })

  }


  addCurrentStockDetailsInManualOutFeed(allCurrentPalletStockDetailsList: CurrentStockDetailsModel) {
    this.manualOutFeedMissionDetailsInstance.isMissionGenerated = 0;
    this.manualOutFeedMissionDetailsInstance.palletInformationId = this.currentStockDetailsList[0].palletInformationId
    this.manualOutFeedMissionDetailsInstance.palletCode = this.currentStockDetailsList[0].palletCode;
    this.addManualOutfeedMissionInstance.positionName = this.currentStockDetailsList[0].positionName;
    this.addManualOutfeedMissionInstance.positionId = this.currentStockDetailsList[0].positionId;
    // this.manualOutFeedMissionDetailsInstance.userName = this.currentStockDetailsList[0].userName;
    // this.manualOutFeedMissionDetailsInstance.userId = this.currentStockDetailsList[0].userId;
    this.manualOutFeedMissionDetailsInstance.userName = this.authService.currentUserValue.userName;
    this.manualOutFeedMissionDetailsInstance.userId = this.authService.currentUserValue.userId;

    this.manualOutFeedMissionDetailsInstance.destination = this.selectedDestination;


    this.manualOutfeedMissionDetailsService.addCurrentPalletStockdetailsInManualOutfeedMissionDetails(this.manualOutFeedMissionDetailsInstance).subscribe((outfeedMissionDetails) => {
      if (outfeedMissionDetails.status == 200) {
        console.log("Dispatch Current Stock Detail added Successfully")
        this.fetchAllLeftMasterpositionDetails();
        this.fetchAllRightMasterpositionDetails();
       
        this.messageService.add({ severity: 'info', summary: 'Successful', detail: 'Dispatch Current Stock Detail added Successfully', life: 3000 });
        this.closeDialog('mannualDispatchPositionModalId');


      } else if (outfeedMissionDetails.status == 208) {
        
        this.messageService.add({ severity: 'info', summary: 'Successful', detail: 'Outfeed Mission is already generated', life: 3000 });
      } else if (outfeedMissionDetails.status == 203) {
        this.messageService.add({ severity: 'info', summary: 'Successful', detail: 'This Area is Lock Outfeed Mission cannot be generated', life: 3000 });
        
      } else if (outfeedMissionDetails.status == 204) {
        this.messageService.add({ severity: 'info', summary: 'Successful', detail: 'Position is not active', life: 3000 });
       
      } else if (outfeedMissionDetails.status == 205) {
        this.messageService.add({ severity: 'info', summary: 'Successful', detail: 'Position is empty', life: 3000 });
       
      }
    },
      (error) => {
        this.messageService.add({ severity: 'info', summary: 'Successful', detail: 'Position is empty', life: 3000 });
        console.error(error);
      }
    )
  }





  deleteCurrentStockDetailsPositionId() {



    this.currentStockDetailsService.deleteCurrentStockDetailsByPositionId(this.positionId2).subscribe(deletePositionDataById => {
      this.deleteCurrentStockDetailsForSelectedIdInstance = deletePositionDataById;
      
      this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Data deleted successfully', life: 3000 });
      console.log("CurrentStock Details deleted Successfully");
      this.fetchAllLeftMasterpositionDetails();
      this.fetchAllRightMasterpositionDetails();
      this.closeDialog('deletePositionModalId');


    })


  }


  validatePalletCode(dispatchCurrentStockDetailsInstance: CurrentStockDetailsModel) {
    const palletCode = this.dispatchForm.get('palletCode')?.value;
    // const palletCode = dispatchCurrentStockDetailsInstance.palletCode;

    if (!palletCode) {
     
      this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Pallet Code is empty', life: 3000 });
      return;
    }

    this.currentStockDetailsService.validatePalletCode(palletCode).subscribe(
      (response) => {
        console.log("Pallet Code:", palletCode);

        if (response.status === 200) {
          console.log("Validated.....");
          this.isValidated = true;
          this.validationMessage = ""; // Clear validation message if needed
          this.fetchAllLeftMasterpositionDetails();
          this.fetchAllRightMasterpositionDetails();
        } else if (response.status === 204) {
          this.isValidated = false;
          this.validationMessage = " Pallet code is duplicate.";
        }
      },
      (error) => {
        this.isValidated = false;
        this.validationMessage = "Position is empty";
        console.error(error);
      }
    );
  }


  onPalletCodeChange1() {
    this.isValidated = false;
    this.validationMessage = "Please validate pallet code using the icon.";
  }
  onPalletCodeChange() {
    this.isValidated = false;
    this.validationMessage = "Please validate pallet code using the icon.";
  }




  addupdateCurrentStockDetailsByPosition(dispatchCurrentStockDetailsInstance: CurrentStockDetailsModel) {
    // Assign properties to updateInstance as needed for the API call
    this.updateInstance.palletCode = dispatchCurrentStockDetailsInstance.palletCode;
    this.updateInstance.coreSize = dispatchCurrentStockDetailsInstance.coreSize;
    this.updateInstance.quantity = dispatchCurrentStockDetailsInstance.quantity;
  
    
  
    dispatchCurrentStockDetailsInstance.positionId = this.positionId2;
  
    this.currentStockDetailsService.addOrUpdateMasterPalletInformation(dispatchCurrentStockDetailsInstance).subscribe(
      () => {
     
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Data added successfully', life: 3000 });
        console.log("......"+ this.updateInstance.palletCode);
        this.closeDialog('addPositionModalId');
        this.fetchAllLeftMasterpositionDetails();
        this.fetchAllRightMasterpositionDetails();
        if (this.dispatchForm) {
          this.dispatchForm.reset();
        }
      },
      error => {
        console.error("Error updating CurrentStock Details", error);
      }
    );
  }



  updateCurrentStockDetailsByPosition(dispatchCurrentStockDetailsInstance: CurrentStockDetailsModel) {
    // Assign properties to updateInstance as needed for the API call
    this.updateInstance.palletCode = dispatchCurrentStockDetailsInstance.palletCode;
    this.updateInstance.coreSize = dispatchCurrentStockDetailsInstance.coreSize;
    this.updateInstance.quantity = dispatchCurrentStockDetailsInstance.quantity;
  
    
  
    dispatchCurrentStockDetailsInstance.positionId = this.positionId2;
  
    this.currentStockDetailsService.updateCurrentStock(dispatchCurrentStockDetailsInstance).subscribe(
      () => {
      
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Data added successfully', life: 3000 });
        console.log("......"+ this.updateInstance.palletCode);
        this.closeDialog('editPositionModalId');
        this.fetchAllLeftMasterpositionDetails();
        this.fetchAllRightMasterpositionDetails();
        if (this.dispatchForm) {
          this.dispatchForm.reset();
        }
      },
      error => {
        console.error("Error updating CurrentStock Details", error);
      }
    );
  }
  
}










