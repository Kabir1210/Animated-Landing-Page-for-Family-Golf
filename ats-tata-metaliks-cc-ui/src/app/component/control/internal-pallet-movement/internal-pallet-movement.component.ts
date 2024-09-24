import { Component, OnInit, ViewChild } from "@angular/core";
import { ImportsModule } from "../../../import";
import { CurrentStockDetailsModel } from "../../../model/currentStockDetails.model";
import { MasterPositionDetailsModel } from "../../../model/masterPositionDetails.model";
import { CurrentStockDetailsService } from "../../../services/currentStockDetails.service";
import { MasterPositionDetailsService } from "../../../services/masterPositionDetails.service";
import { AuthenticationService } from "../../../services/auth.service";
import { Table } from "primeng/table";
import { MessageService } from "primeng/api";
import { TransferPalletMissionDetailsModel } from "../../../model/transferMissionDetails.model";
import { TransferPalletMissiontDetailsService } from "../../../services/transferPalletMissionDetails.service";

@Component({
  selector: 'app-internal-pallet-movement',
  standalone: true,
  imports: [ImportsModule],
  providers: [CurrentStockDetailsService,MasterPositionDetailsService,MessageService],
  templateUrl: './internal-pallet-movement.component.html',
  styleUrl: './internal-pallet-movement.component.css'
})


export class InternalPalletMovementComponent implements OnInit{

  @ViewChild('dt') dt!: Table;
  
  currentPalletStockDetailsTableList: CurrentStockDetailsModel[] = [];
  positionNameDetailsList: CurrentStockDetailsModel[] = [];
  positionNameForDestinationList: MasterPositionDetailsModel[] = [];
  positionNameList: MasterPositionDetailsModel[] = [];
  positionNameForDestinationList1: MasterPositionDetailsModel[] = [];
  positionNameForDestinationList2: TransferPalletMissionDetailsModel[] = [];
  positionIdSearchList: MasterPositionDetailsModel[] = [];
 palletMovementMissionDetailsInstance: TransferPalletMissionDetailsModel = new TransferPalletMissionDetailsModel();
  addPalletMovementDetails: CurrentStockDetailsModel = new CurrentStockDetailsModel();
  addPalletMovementDetailsInstance: CurrentStockDetailsModel = new CurrentStockDetailsModel();
  dispatchAlareadyGenerated : boolean = false;





  palletCode!: string;
  location!: string;
  positionName!: string;
  destinationName!: string;
  positionId!: number;
  positionIsActive: number = 1;
  positionISAllocated: number = 0;
  emptyPalletPosition: number = 1;
  transferPositionId!: number;
  checkDestinationNameExist: boolean=false;
  destinationPositionName!: string;
  currentPositionName!: string;
  userId!: number;
  userName!: string;
   startPosition!:string;
   destinationPosition!:string;




  constructor(private currentStockDetailsService: CurrentStockDetailsService,
    private masterPositionDetailsService: MasterPositionDetailsService,
    private transferPalletMissiontDetailsService: TransferPalletMissiontDetailsService,
    private authservice: AuthenticationService,
    private messageService: MessageService,) {

  }
  ngOnInit(): void {
    //this.fetchMasterPositionDetailsIdByPositionName();
  //   this.internalPalletMovementDtOptions = {
  //     pagingType: 'simple_numbers'      
  //  };
  }

  getSeverity(infeedMissionStatus: string) {
    switch (infeedMissionStatus) {
      case 'READY':
        return 'info';
      case 'IN_PROGRESS':
        return 'warning';
      case 'COMPLETED':
        return 'success';
      case 'ABORT':
        return 'danger';
      default:
        return undefined; // Change this line
    }
  }

  applyGlobalFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    this.dt.filterGlobal(target.value, 'contains');
  }

  // public fetchPalletOrderDetailsfromCurrentPalletStockdetails() {

  //   console.log(" in method palletCode" + this.palletCode);
  //   this.currentStockDetailsService.fetchCurrentPalletStockDetailsByPalletCode(this.palletCode).subscribe(fetchPalletCodeData => {
    

  //     this.currentPalletStockDetailsTableList = fetchPalletCodeData;
  //     this.positionName = this.currentPalletStockDetailsTableList[0].nomenclature;
  //     console.log(" positionName " + this.positionName);
  //     ;
      
      

  //   });
  // }

  public fetchPalletOrderDetailsfromCurrentPalletStockdetails() {
    console.log(" in method palletCode" + this.palletCode);
    this.currentStockDetailsService.fetchCurrentPalletStockDetailsByPalletCode(this.palletCode).subscribe(
      fetchPalletCodeData => {
        if (fetchPalletCodeData.length === 0) {
          // No pallet code found, display an error message
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No pallet code found',
            life: 3000
            
          })
          
        } else {
          this.currentPalletStockDetailsTableList = fetchPalletCodeData;
          this.positionName = this.currentPalletStockDetailsTableList[0].nomenclature;
          console.log(" positionName " + this.positionName);
        }
      },
      error => {
        // Handle any potential errors from the service
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while fetching pallet details',
          life: 3000
        });
      }
    );
  }
  

  

  // checkEnteredDestination() {
 
  //   console.log("1")
  //   console.log("this.checkEnteredDestination  :: " + this.destinationName);
  //   this.masterPositionDetailsService.fetchMasterPositionDetailsByNomeneclature(this.destinationName).subscribe(data => {
  //     this.positionNameList = data;

  
   
  //     console.log("data");
  //     console.log(data);

  //     if (this.positionNameList != null) {
      
  //       this.checkDestinationNameExist = true;

  //       this.transferPalletMissiontDetailsService.fetchAllTransferPalletMissionDetails().subscribe(data1 => {

  //         this.positionNameForDestinationList2 = data1;
  //         if(this.positionNameForDestinationList2.map(data=>data.transferPositionName).includes(this.destinationName) &&
  //       this.positionNameForDestinationList2.map(data=>data.isMissionGenerated).includes(0)){
    
  //         console.log("manual dispatch1%%%%%%%%%%%%%%%");
  //         this.dispatchAlareadyGenerated = true;
            
  //         }
  //       });

  //       console.log("manual dispatch1111111111111");

  //     }

  //   });

  // }

  checkEnteredDestination(): Promise<void> {
    return new Promise((resolve, reject) => {

      console.log("1444444444444444")
      console.log("this.checkEnteredDestination  :: " + this.destinationName);
   
      this.masterPositionDetailsService.fetchMasterPositionDetailsByNomeneclature(this.destinationName).subscribe(data => {
        this.positionNameList = data;
  
        if (this.positionNameList != null) {
          this.checkDestinationNameExist = true;
  
          this.transferPalletMissiontDetailsService.fetchAllTransferPalletMissionDetails().subscribe(data1 => {
            this.positionNameForDestinationList2 = data1;
            this.positionNameForDestinationList2.forEach(element => {

              console.log("element.isMissionGenerated  :: " + element.transferPositionName != this.destinationName);
              if(element.transferPositionName != this.destinationName){

              }
            })
            if(this.positionNameForDestinationList2.map(data=>data.transferPositionName).includes(this.destinationName) &&
              this.positionNameForDestinationList2.map(data=>data.isMissionGenerated).includes(0) &&
            this.positionNameForDestinationList2.map(data=>data.palletCode).includes(this.palletCode)){

              console.log("manual dispatch1dispatchAlareadyGenerated  befor true :: " + this.dispatchAlareadyGenerated);
              this.dispatchAlareadyGenerated = true;
            }
            resolve();
          });
        } else {
          resolve();
        }
      });
    });
  }
  

  public fetchAllMasterPositionDetailsByPositionNameAndPositionIsAllocatedAndEmptyPalletPositionAndPositionIsActive() {
   
    console.log("2")
    console.log("this.destinationName  :: " + this.destinationName);
    console.log("this. positionName " + this.positionName);
    this.startPosition= this.positionName.trim();
    this.destinationPosition=this.destinationName.trim();
    if(this.startPosition != this.destinationPosition){

    
    this.masterPositionDetailsService.fetchMasterPositionDetailsByNomeneclature(this.destinationName).subscribe(existDestinamtionList=>{
     if(existDestinamtionList!=null && existDestinamtionList.length>0){
    //   this.emptyPalletPosition = 1;
    // this.positionISAllocated = 0;
    // this.positionIsActive = 1;
 
    this.masterPositionDetailsService.fetchMasterPositionDetailsByNomeneclatureAndPositionIsAllocatedAndEmptyPalletPositionAndPositionIsActive(this.destinationName, this.positionISAllocated, this.emptyPalletPosition, this.positionIsActive).subscribe(positionNameList => {
      this.positionNameForDestinationList[0] = positionNameList;

      console.log("positionNameForDestinationList :: " + this.positionNameForDestinationList.length);

      if (this.positionNameForDestinationList[0].emptyPalletPosition == 1 && 
        this.positionNameForDestinationList[0].positionIsActive == 1 && 
        this.positionNameForDestinationList[0].positionIsAllocated == 0) {

          // positionIsActive: number = 1;
          // positionISAllocated: number = 0;
          // emptyPalletPosition: number = 1;
   
        this.savePalletMovementDetailsInTransferPalletMissionDetails();
      
      }

      else {
        // alert("position is not empty");
        this.messageService.add({ severity: 'info', summary: 'Info', detail: ' position is not empty' });

      }

    });
     }
     else{
      // alert(" Destination location is not available");
      this.messageService.add({ severity: 'info', summary: 'Info', detail: ' Destination location is not available' });
     
     }
     
    });
   
    }else{
      // alert("Invalid position name")
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Invalid Position Name' });
    }
  }

  async validatePositionName() {
   

    console.log("validatePositionName")

    await this.checkEnteredDestination();
    console.log("this.checkDestinationNameExist  :: " + this.checkDestinationNameExist);
    console.log("this.dispatchAlareadyGenerated  :: " + this.dispatchAlareadyGenerated);

  if(this.checkDestinationNameExist == true){

    if(this.dispatchAlareadyGenerated == true){


    this.masterPositionDetailsService.fetchMasterPositionDetailsByNomeneclatureAndPositionIsAllocatedAndEmptyPalletPositionAndPositionIsActive(this.destinationName, this.positionISAllocated, this.emptyPalletPosition, this.positionIsActive).subscribe(positionNameList => {
      this.positionNameForDestinationList[0] = positionNameList;

      console.log(
        "positionNameForDestinationList :: " + this.positionNameForDestinationList.length
      )
      console.log("positionNameForDestinationList :: " + JSON.stringify(this.positionNameForDestinationList));
      console.log("positionNameForDestinationList[0] :: " +  this.positionNameForDestinationList[0].positionIsAllocated);
      console.log("positionNameForDestinationList[0] :: " +  this.positionNameForDestinationList[0].emptyPalletPosition);
      console.log("positionNameForDestinationList[0] :: " +  this.positionNameForDestinationList[0].positionIsActive);



      if (
        this.positionNameForDestinationList[0].positionIsAllocated == 0 && this.positionNameForDestinationList[0].emptyPalletPosition == 1 && 
        this.positionNameForDestinationList[0].positionIsActive == 1  
        
      ) {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Selected Postion Is Empty', life: 3000 });
        
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Not found', detail: 'Selected Postion Is Not Empty', life: 3000 });
      }
    })
  }
  else{
    this.messageService.add({ severity: 'info', summary: 'Dispatch Alaready Generated for selected Position', detail: 'Please Enter another PositionNname', life: 3000 });
  }
   
  }
  else{
    this.messageService.add({ severity: 'error', summary: 'Incorrect Position Name', detail: 'Please Enter correct PositionNname', life: 3000 });
  }
}



  //  
  // public fetchMasterPositionDetailsIdByPositionName() {
  //   if(this.positionId!=undefined && this.positionName!=undefined){
  //     this.masterPositionDetailsService.fetchMasterPositionDetailsByPositionIdAndPositionName(this.positionId, this.positionName).subscribe
  //     (palletPositionList => {
  //       this.positionIdSearchList = palletPositionList;
  //       this.positionName = this.positionIdSearchList[0].nomenclature
  //      // console.log("palletMovement" + this.positionIdSearchList);

  //     })
  //   }
   
  // }
  currentPalletStockRow(currentPalletStockRow: CurrentStockDetailsModel) {
    this.addPalletMovementDetailsInstance = Object.assign({}, currentPalletStockRow);

  }
  savePalletMovementDetailsInTransferPalletMissionDetails() {
  
    
     this.userId = this.authservice.currentUserValue.userId;
     this.userName=this.authservice.currentUserValue.userName;
    this.palletMovementMissionDetailsInstance.transferPositionId = this.positionNameForDestinationList[0].positionId;
     this.palletMovementMissionDetailsInstance.transferPositionName = this.positionNameForDestinationList[0].nomenclature;

    this.transferPalletMissiontDetailsService.addAllPalletMovementDetailsInTransferPalletMissionDetails(this.positionName,this.destinationName,this.userId,this.userName).subscribe((palletransferMissionDetails) => {
     //alert(palletransferMissionDetails.error.text);
    
     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pallet Transfered Successfully', life: 3000 });
      

    });
    this.palletCode="";
    this.positionName="";
    this.destinationName="";
   this. currentPalletStockDetailsTableList=[];
  }
}
