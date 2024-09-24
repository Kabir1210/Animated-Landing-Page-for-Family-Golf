import { Component, ViewChild } from '@angular/core';
import { ImportsModule } from '../../../import';
declare var bootstrap: any;
import { PanelModule } from 'primeng/panel';
import { DmsConveyorPositionDetailsService } from '../../../services/dmsConveyorPositionDetails.service';
import { DmsConveyorPositionDetailsModel } from '../../../model/dmsConveyorPositionDetails.model';
import { LoadingSidePlcTagDetailsModel } from '../../../model/loadingSidePlcTagDetails.model';
import { LoadingSidePlcTagDetailsService } from '../../../services/loadingSidePlcTagDetails.service';
import { OutfeedMissionDetailsModel } from '../../../model/OutfeedMissionDetails.model';
import { OutfeedMissionDetailsService } from '../../../services/outfeedMissionDetails.service';
import { Table } from 'primeng/table/table';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-dms-layout',
  standalone: true,
  imports: [ImportsModule,],
  providers: [DmsConveyorPositionDetailsService, LoadingSidePlcTagDetailsService,
    ConfirmationService, MessageService, OutfeedMissionDetailsService],
  templateUrl: './dms-layout.component.html',
  styleUrl: './dms-layout.component.css'
})

export class DMSLayoutComponent {

  @ViewChild('dt') dt!: Table;
  selectedOutfeedMissionStatus!:string;
  outfeedMissionStatusList: any[] = ['REWORK','REJECTED']
  palletPosition: number = 0; // Initial pallet position
  displayModal: boolean = false;
  dmsConveyorDetailsTableList: DmsConveyorPositionDetailsModel[] = [];
  lineNumberOneDetailsList: DmsConveyorPositionDetailsModel[] = [];
  lineNumberTwoDetailsList: DmsConveyorPositionDetailsModel[] = [];
  lineNumberThreeDetailsList: DmsConveyorPositionDetailsModel[] = [];
  lineNumberFourDetailsList: DmsConveyorPositionDetailsModel[] = [];
  lineNumberFiveDetailsList: DmsConveyorPositionDetailsModel[] = [];
  lineNumberSixDetailsList: DmsConveyorPositionDetailsModel[] = [];
  lineNumberSevenDetailsList: DmsConveyorPositionDetailsModel[] = [];
  lineNumberEightDetailsList: DmsConveyorPositionDetailsModel[] = [];
  lineNumberNineDetailsList: DmsConveyorPositionDetailsModel[] = [];
  lineNumberTenDetailsList: DmsConveyorPositionDetailsModel[] = [];
  lineNumberElevenDetailsList: DmsConveyorPositionDetailsModel[] = [];
  lineNumberTwelveDetailsList: DmsConveyorPositionDetailsModel[] = [];
  line13DetailsList: DmsConveyorPositionDetailsModel[] = [];
  line14DetailsList: DmsConveyorPositionDetailsModel[] = [];
  addDMSLayout!: DmsConveyorPositionDetailsModel;
  loadingSidePlcDetailsList: LoadingSidePlcTagDetailsModel[] = [];
  loadingSidePlcOneDetailsList:LoadingSidePlcTagDetailsModel[] = [];
  loadingSidePlcTwoDetailsList:LoadingSidePlcTagDetailsModel[] = [];
coreShooterMachineIsActiveValue: any;
outfeedMissionRuntimeDetailsList:OutfeedMissionDetailsModel[]=[];
outfeedList!:OutfeedMissionDetailsModel;
addOutfeedDialog: boolean = false;
editOutfeedDialog: boolean = false;
  constructor(private dmsConveyorPositionDetailsService: DmsConveyorPositionDetailsService,
    private loadingSidePlcTagDetailsService: LoadingSidePlcTagDetailsService,
    private outfeedMissionDetailsService: OutfeedMissionDetailsService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
  ) {
  //  this.movePallet(); // Start the pallet movement
  }

  // movePallet() {
  //   setInterval(() => {
  //     this.palletPosition = (this.palletPosition % 11) + 1; // Move pallet from 1 to 11 and loop back to 1
  //   }, 5000); // Change pallet position every 5 seconds (adjust as needed)
  // }

  // palletPositionIndex: number = 0; // Default position
  // getPalletPosition(index: number): string {
  //   return index === this.palletPositionIndex ? '0%' : '100%';
  // }

  startPalletMovement() {
    let currentIndex = 0;
    // setInterval(() => {
    //   this.palletPositionIndex = currentIndex;
    //   currentIndex = (currentIndex + 1) % 5; // Cycle through positions 0 to 4
    // }, 2000); // Change position every 2 seconds
  }

  ngOnInit() {
    this.startPalletMovement();
    this.findAllDmsConveyor();
    this.findAllLoadingSideDetails();
    this.findAllOutfeedMissionDetails();
  
  }



  openModal() {
    this.displayModal = true;
    this.addDMSLayout = new DmsConveyorPositionDetailsModel();
    const modalElement = document.getElementById('palletFormModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();

    }
  }

  closeModal() {
    this.displayModal = false;
    const modalElement = document.getElementById('palletFormModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();

      }
    }
  }


  cancel() {
    this.displayModal = false;
  }



  public findAllDmsConveyor() {

    this.dmsConveyorPositionDetailsService.findAllDmsConveyor().subscribe(
      conveyorDetailsList => {
        this.dmsConveyorDetailsTableList = conveyorDetailsList;
        console.log(this.dmsConveyorDetailsTableList);

        this.lineNumberOneDetailsList = this.dmsConveyorDetailsTableList.filter(line => line.lineNumber == 1);
        console.log("Two number:" + JSON.stringify(this.lineNumberOneDetailsList.length));
        this.lineNumberTwoDetailsList = this.dmsConveyorDetailsTableList.filter(line => line.lineNumber == 2);
        console.log("Two number:" + JSON.stringify(this.lineNumberTwoDetailsList.length));

        this.lineNumberThreeDetailsList = this.dmsConveyorDetailsTableList.filter(line => line.lineNumber == 3);
        console.log("Three number:" + JSON.stringify(this.lineNumberThreeDetailsList.length));

        this.lineNumberFourDetailsList = this.dmsConveyorDetailsTableList.filter(line => line.lineNumber == 4);
        console.log("Four number:" + JSON.stringify(this.lineNumberFourDetailsList.length));

        this.lineNumberFiveDetailsList = this.dmsConveyorDetailsTableList.filter(line => line.lineNumber == 5);
        console.log("Five number:" + JSON.stringify(this.lineNumberFiveDetailsList.length));

        this.lineNumberSixDetailsList = this.dmsConveyorDetailsTableList.filter(line => line.lineNumber == 6);
        console.log("six number:" + JSON.stringify(this.lineNumberSixDetailsList.length));

        this.lineNumberSevenDetailsList = this.dmsConveyorDetailsTableList.filter(line => line.lineNumber == 7);
        console.log("seven number:" + JSON.stringify(this.lineNumberSevenDetailsList.length));

        this.lineNumberEightDetailsList = this.dmsConveyorDetailsTableList.filter(line => line.lineNumber == 8);
        console.log("Eight number:" + JSON.stringify(this.lineNumberEightDetailsList.length));

        this.lineNumberNineDetailsList = this.dmsConveyorDetailsTableList.filter(line => line.lineNumber == 9);
        console.log("Nine number:" + JSON.stringify(this.lineNumberNineDetailsList.length));

        this.lineNumberTenDetailsList = this.dmsConveyorDetailsTableList.filter(line => line.lineNumber == 10);
        console.log("Ten number:" + JSON.stringify(this.lineNumberTenDetailsList.length));

        this.lineNumberElevenDetailsList = this.dmsConveyorDetailsTableList.filter(line => line.lineNumber == 11);
        console.log("Ten number:" + JSON.stringify(this.lineNumberElevenDetailsList.length));

        this.lineNumberTwelveDetailsList = this.dmsConveyorDetailsTableList.filter(line => line.lineNumber == 12);
        console.log("Ten number:" + JSON.stringify(this.lineNumberTwelveDetailsList.length));

        this.line13DetailsList = this.dmsConveyorDetailsTableList.filter(line => line.lineNumber == 13);
        console.log("13 number:" + JSON.stringify(this.line13DetailsList.length));

        this.line14DetailsList = this.dmsConveyorDetailsTableList.filter(line => line.lineNumber == 14);
        console.log("14 number:" + JSON.stringify(this.line14DetailsList.length));
      }
    );
  }

  public findAllLoadingSideDetails() {
   
    this.loadingSidePlcTagDetailsService.findAllLoadingSideDetails().subscribe(
      loadingDetailsList => {

        this.loadingSidePlcDetailsList = loadingDetailsList;
        console.log("loadingSidePlcDetailsList"+JSON.stringify(this.loadingSidePlcDetailsList));

        // this.loadingSidePlcTagDetailsService.fetchByLoadingSidePlcId(this.loadingSidePlcDetailsList[0].loadingSidePlcId).subscribe(sensorEquipmentList => {
        //   this.loadingSidePlcOneDetailsList=this.loadingSidePlcDetailsList.filter(Status=>Status.coreShooterMachineIsActiveValue == 1);
        //   console.log("loadingSidePlcOneDetailsList"+JSON.stringify(this.loadingSidePlcOneDetailsList));
        //   this.loadingSidePlcTwoDetailsList=this.loadingSidePlcDetailsList.filter(Status=>Status.coreShooterMachineIsActiveValue == 0);
        //   console.log("loadingSidePlcTwoDetailsList"+JSON.stringify(this.loadingSidePlcTwoDetailsList));
        // })
      }
    );
  }

   openAddOutfeedDialog() {
     //this.addOutfeed = new OutfeedMissionDetailsModel();
     this.addOutfeedDialog = true;
   }

  
  public editOutfeedMissionStatusDetails(outfeedList: OutfeedMissionDetailsModel) {
   // this.outfeedList = Object.assign({}, outfeedList);
  //  this.addOutfeedDialog = true;
  this.outfeedList = Object.assign({}, outfeedList);
  this.editOutfeedDialog = true;
}
hideEditDialog() {
  this.editOutfeedDialog = false;
}
  
hideDialog() {
  this.addOutfeedDialog = false;
  //this.submitted = false;
 
}
  findAllOutfeedMissionDetails(){
    this.outfeedMissionDetailsService.findAllOutfeedMissionDetails().subscribe(
      data => {
        this.outfeedMissionRuntimeDetailsList = data;
      }
    );
  }

 
  public addOutfeedRuntimeDetails(outfeedList : OutfeedMissionDetailsModel){ 

    this.confirmationService.confirm({
      message: 'Are you sure you want to add ' + this.outfeedList.orderId + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.outfeedList.outfeedMissionStatus= this.selectedOutfeedMissionStatus;
        console.log("outfeed data:"+ this.outfeedList.outfeedMissionStatus)
        this.outfeedMissionDetailsService.addOutfeedMissionDetails(this.outfeedList).subscribe(
          addOutfeed => {

            this.findAllOutfeedMissionDetails();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Status Added', life: 3000 });
            // this.addOutfeedDialog = false;
            this.hideEditDialog();
            this.confirmationService.close();
          },
          error => {
            console.error('There was an error during the deletion process', error);
          }
        );
      
      }
    })
  }




}