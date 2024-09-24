import { Component, OnInit } from '@angular/core';
import { ImportsModule } from '../../../import';
import { MasterProductDetailsService } from '../../../services/masterProductDetails.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InfeedMissionRuntimeDetailsModel } from '../../../model/InfeedMissionRuntimeDetails.model';
import { InfeedMissionRuntimeDetailsService } from '../../../services/InfeedMissionRuntimeDetails.service';
import { OutfeedMissionRuntimeDetailsModel } from '../../../model/outfeedMissionRuntimeDetails.model';
import { HttpResponse } from '@angular/common/http';
import { RegisterResponse } from '../../../model/responseHandler.model';

import { OutfeedMissionDetailsService } from '../../../services/outfeedMissionDetails.service';
import { OutfeedMissionDetailsModel } from '../../../model/OutfeedMissionDetails.model';
import { TransferPalletMissionDetailsModel } from '../../../model/transferMissionDetails.model';
import { TransferPalletMissionRuntimeDetailsService } from '../../../services/transferPalletMissionRuntimeDetails.service';
import { TransferPalletMissionRuntimeDetailsModel } from '../../../model/TransferPalletMissionRuntimeDetailsModel.model';

@Component({
  selector: 'app-current-mission',
  standalone: true,
  imports: [ImportsModule],
  providers: [MasterProductDetailsService, MessageService, ConfirmationService],
  templateUrl: './current-mission.component.html',
  styleUrl: './current-mission.component.css'
})

export class CurrentMissionComponent implements OnInit {



  infeedDialog: boolean = false;
  outfeedDialog: boolean = false;
  transferDialog: boolean = false;
  submitted: boolean = false;
  productDialog: boolean = false;
  showConfirmationDialog1: boolean = false;
  showConfirmationDialog2: boolean = false;
  showConfirmationDialog3: boolean = false;
  infeedMission!: InfeedMissionRuntimeDetailsModel;
  infeedList!: InfeedMissionRuntimeDetailsModel;
  outfeedList!: OutfeedMissionDetailsModel;
  transferList!: TransferPalletMissionRuntimeDetailsModel;
  infeedMissionList: InfeedMissionRuntimeDetailsModel[] = [];
  outfeedMissionList: OutfeedMissionDetailsModel[] = [];
  transferMissionList: TransferPalletMissionRuntimeDetailsModel[] = [];
  editInfeedMissionRuntimeDetailsInstance: InfeedMissionRuntimeDetailsModel = new InfeedMissionRuntimeDetailsModel;
  editOutfeedMissionRuntimeDetailsInstance: OutfeedMissionDetailsModel = new OutfeedMissionDetailsModel;
  editTransferMissionRuntimeDetailsInstance: TransferPalletMissionRuntimeDetailsModel = new TransferPalletMissionRuntimeDetailsModel;
  intervalId: any;



  constructor(
    private infeedMissionRuntimeDetailsService: InfeedMissionRuntimeDetailsService,
    private outfeedMissionRuntimeDetailsService: OutfeedMissionDetailsService,
    private transferPalletMissionRuntimeDetailsService: TransferPalletMissionRuntimeDetailsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  ngOnInit(): void {

    this.fetchAllInfeedMissionDetails();
    this.fetchAllOutfeedMissionDetails();
    this.fetchAllTransferMissionDetails();
    this.intervalId = setInterval(() => {
      this.fetchAllInfeedMissionDetails();
      this.fetchAllOutfeedMissionDetails();
    }, 30000);



  }
  public fetchAllInfeedMissionDetails() {


    this.infeedMissionRuntimeDetailsService.fetchAllInfeedMissionByStatus().subscribe(
      infeedList => {
        this.infeedMissionList = infeedList;
        console.log(this.infeedMissionList);


      }
    );
  }

  public fetchAllOutfeedMissionDetails() {

    this.outfeedMissionRuntimeDetailsService.fetchAllOutfeedMissionByStatus().subscribe(
      outfeedList => {
        this.outfeedMissionList = outfeedList;
        console.log(this.outfeedMissionList);


      }
    );
  }

  public fetchAllTransferMissionDetails() {


    this.transferPalletMissionRuntimeDetailsService.fetchAllTransferMissionByStatus().subscribe(
      transferList => {
        this.transferMissionList = transferList;
        console.log(this.transferMissionList);


      }
    );
  }



  public editInfeedMissionDetails(editInfeedMissionRuntimeDetailsInstance: InfeedMissionRuntimeDetailsModel) {

    console.log("222222222222222222 :: " + editInfeedMissionRuntimeDetailsInstance);
    //this.masterProduct  = { ...masterProduct };
    //this.infeedList = Object.assign({}, editInfeedMissionRuntimeDetailsInstance);
    this.infeedDialog = true;
    editInfeedMissionRuntimeDetailsInstance.infeedMissionId = editInfeedMissionRuntimeDetailsInstance.infeedMissionId;
    this.editInfeedMissionRuntimeDetailsInstance = Object.assign({}, editInfeedMissionRuntimeDetailsInstance);

  }

  public editOutfeedMissionDetails(editOutfeedMissionRuntimeDetailsInstance: OutfeedMissionDetailsModel) {

    console.log("124143 :: " + editOutfeedMissionRuntimeDetailsInstance);
    this.outfeedDialog = true;
    editOutfeedMissionRuntimeDetailsInstance.outfeedMissionId = editOutfeedMissionRuntimeDetailsInstance.outfeedMissionId;
    this.editOutfeedMissionRuntimeDetailsInstance = Object.assign({}, editOutfeedMissionRuntimeDetailsInstance);

  }
  public editTransferMissionDetails(editTransferMissionRuntimeDetailsInstance: TransferPalletMissionRuntimeDetailsModel) {

    console.log("abcdef :: " + editTransferMissionRuntimeDetailsInstance);
    this.transferDialog = true;
    editTransferMissionRuntimeDetailsInstance.transferPalletMissionRuntimeDetailsId = editTransferMissionRuntimeDetailsInstance.transferPalletMissionRuntimeDetailsId;
    this.editTransferMissionRuntimeDetailsInstance = Object.assign({}, editTransferMissionRuntimeDetailsInstance);

  }

  public editInfeedMissionRuntimeDetails(editInfeedMissionRuntimeDetailsInstance: InfeedMissionRuntimeDetailsModel) {

    this.infeedMissionRuntimeDetailsService.updateInfeedMissionRuntimeDetailsDetails(editInfeedMissionRuntimeDetailsInstance).subscribe((response: HttpResponse<RegisterResponse>) => {
      // alert(response.statusText)
      this.fetchAllInfeedMissionDetails();
    });

  }

  public editOutfeedMissionRuntimeDetails(editOutfeedMissionRuntimeDetailsInstance: OutfeedMissionDetailsModel) {

    this.outfeedMissionRuntimeDetailsService.updateOutfeedMissionRuntimeDetails(editOutfeedMissionRuntimeDetailsInstance).subscribe((response: HttpResponse<RegisterResponse>) => {
      // alert(response.statusText)
      this.fetchAllOutfeedMissionDetails();
    });

  }


  public editTransferMissionRuntimeDetails(editTransferPalletMissionRuntimeDetailsInstance: TransferPalletMissionRuntimeDetailsModel) {

    this.transferPalletMissionRuntimeDetailsService.updateTransferMissionRuntimeDetails(editTransferPalletMissionRuntimeDetailsInstance).subscribe((response: HttpResponse<RegisterResponse>) => {
      // alert(response.statusText)
      this.fetchAllTransferMissionDetails();
    });

  }

  selectEditInfeedMissionStatusChangeFromDropDownList(value: any) {
  }

  selectEditOutfeedMissionStatusChangeFromDropDownList(value: any) {
  }

  selectEditTransferPalletMissionStatusChangeFromDropDownList(value: any) {
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.infeedDialog = false;
    this.outfeedDialog = false;
    this.transferDialog = false;
    this.showConfirmationDialog1 = false;
    this.showConfirmationDialog2 = false;
    this.showConfirmationDialog3 = false;
  }

  hideConformationDialog() {

    this.showConfirmationDialog1 = false;
    this.showConfirmationDialog2 = false;
    this.showConfirmationDialog3 = false;


  }


  public submitForm() {
    // Your form submission logic here
    //alert("in submit form :: " + this.editInfeedMissionRuntimeDetailsInstance);
    //console.log("in submit form :: " + this.editInfeedMissionRuntimeDetailsInstance);
    this.infeedMissionRuntimeDetailsService.updateInfeedDetails(this.editInfeedMissionRuntimeDetailsInstance).subscribe(updatedStatus => {
      //console.log("in submit form :: " + updatedStatus);
      this.fetchAllInfeedMissionDetails();

    });
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    this.showConfirmationDialog1 = false;
    this.infeedDialog = false;


  }

  public submitForm2() {
    // Your form submission logic here
    // alert("in submit form :: " + this.editOutfeedMissionRuntimeDetailsInstance);
    // console.log("in submit form 2:: " + this.editOutfeedMissionRuntimeDetailsInstance);
    this.outfeedMissionRuntimeDetailsService.updateOutfeedDetails(this.editOutfeedMissionRuntimeDetailsInstance).subscribe(updatedStatus => {
      // console.log("in submit form 2:: " + updatedStatus);
      this.fetchAllOutfeedMissionDetails();

    });
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    this.showConfirmationDialog2 = false;
    this.outfeedDialog = false;


  }

  public submitForm3() {
    // alert("in submit form :: " + this.editOutfeedMissionRuntimeDetailsInstance);
    // console.log("in submit form 3:: " + this.editOutfeedMissionRuntimeDetailsInstance);
    this.transferPalletMissionRuntimeDetailsService.updateTransferMissionRuntimeDetails(this.editTransferMissionRuntimeDetailsInstance).subscribe(updatedStatus => {
      // console.log("in submit form 3:: " + updatedStatus);
      this.fetchAllTransferMissionDetails();

    });
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    this.showConfirmationDialog3 = false;
    this.transferDialog = false;


  }
  getSeverity(infeedMissionStatus: string) {
    switch (infeedMissionStatus) {
      case 'READY':
        return 'info';
      case 'IN_PROGRESS':
        return 'warning';
      default:
        return undefined; // Change this line
    }

  }
}



