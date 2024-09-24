import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CurrentStockDetailsService } from '../../../services/currentStockDetails.service';
import { CurrentStockDetailsModel } from '../../../model/currentStockDetails.model';
import { ImportsModule } from '../../../import';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MasterProductDetailsModel } from '../../../model/masterProductDetails.model';
import { MasterProductDetailsService } from '../../../services/masterProductDetails.service';
import { ManualOutfeedMissionDetailsModel } from '../../../model/manualOutfeedMissionDetails.model';
import { ManualOutfeedMissionDetailsService } from '../../../services/manualOutfeedMissionDetails.service';
import { AuthenticationService } from '../../../services/auth.service';
import * as FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
@Component({
  selector: 'app-current-stock-details',
  standalone: true,
  imports: [ImportsModule],
  providers: [CurrentStockDetailsService, MessageService, ConfirmationService,],
  templateUrl: './current-stock-details.component.html',
  styleUrl: './current-stock-details.component.css'
})
export class CurrentStockDetailsComponent implements OnInit {
  selectedCustomers: any;
  currentStockDetailsList: CurrentStockDetailsModel[] = [];
  masterProductDetailsList: MasterProductDetailsModel[] = [];
  manualOutfeedMissionDetailsList: ManualOutfeedMissionDetailsModel[] = [];
  dispatchCurrentDetailsForSelectedIdInstance: CurrentStockDetailsModel = new CurrentStockDetailsModel();
  addManualOutfeedMissionInstance: ManualOutfeedMissionDetailsModel = new ManualOutfeedMissionDetailsModel();
  manualOutfeedPalletCode!: string
  masterCurrent!: CurrentStockDetailsModel;
  manualOutfeed!: ManualOutfeedMissionDetailsModel;
  currentDialog: boolean = false;
  showConfirmationDialog: boolean = false;
  currentstartDateTime!: string;
  currentEndDateTime!: string;
  disableSearchButton: boolean = false;
  disableDateTime: boolean = true;
  coreSize!: string;
  coreShop!: string;
  selectedCoreSize!: string;
  selectedDestination!: string;
  palletCode!:string;
  @ViewChild('dt') dt!: Table;
  showFilters = false;
  CoreSizeList: any[] = [];
  selectedCoreShop!: string;
  CoreShopList: any[] = ['CORESHOP_1', 'CORE_SHOOTER-5', 'CORE_SHOOTER-6'];
  DestinationList: any[] = ['CCM-6', 'CCM-7', 'CCM-8', 'CCM-9', 'CCM-10','REWORK']
  fetchCurrentStock!: any;
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
    private currentStockDetailsService: CurrentStockDetailsService,
    private masterProductDetailsService: MasterProductDetailsService,
    private manualOutfeedMissionDetailsService: ManualOutfeedMissionDetailsService,
    private authService: AuthenticationService,) { }


  ngOnInit(): void {
    this.findAllCurrentStockDetails();
    this.fetchAllMasterProducts();
  }

  //fetch all 
  findAllCurrentStockDetails() {

    this.currentStockDetailsService.findAllCurrentStockDetails().subscribe(currentStockDetailsList => {
      this.currentStockDetailsList = currentStockDetailsList;

      this.currentStockDetailsList = this.currentStockDetailsList.filter((currentStockDetailsList) => currentStockDetailsList.palletCode != 'NA');
      // console.log("currentStockList::" + JSON.stringify(this.currentStockDetailsList));
      // console.log("currentStockList.userId::" + this.currentStockDetailsList[0].userId)
      //console.log("current stock details::"+JSON.stringify(this.currentStockDetailsList));
      this.fetchCurrentStock = setInterval(() => {
        this.findAllCurrentStockDetails();
         console.log("coloum :: " + JSON.stringify(this.currentStockDetailsList))
       
        
      }, 5000); 
    })
  }

  applyGlobalFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    this.dt.filterGlobal(target.value, 'contains');
  }

  dispatchCurrentStockDetailsRow(dispatchCurrentDetailsRowInstance: CurrentStockDetailsModel) {
    this.dispatchCurrentDetailsForSelectedIdInstance = Object.assign({}, dispatchCurrentDetailsRowInstance);
    this.manualOutfeedPalletCode = this.dispatchCurrentDetailsForSelectedIdInstance.palletCode;

    this.currentDialog = true;
  }
  public showDialog() {
    this.currentDialog = false;
    // alert("in dispatch" + this.currentStockDetailsList[0].userName)
    this.addManualOutfeedMissionInstance.userName = this.authService.currentUserValue.userName;
    this.addManualOutfeedMissionInstance.userId = this.authService.currentUserValue.userId;
    this.addManualOutfeedMissionInstance.palletCode = this.manualOutfeedPalletCode;
    this.addManualOutfeedMissionInstance.destination = this.selectedDestination;
    this.addManualOutfeedMissionInstance.positionId=  this.dispatchCurrentDetailsForSelectedIdInstance.positionId;
    this.confirmationService.confirm({
      message: 'Are you sure you want to Dispatch ' + this.addManualOutfeedMissionInstance.palletCode +' to '+ this.selectedDestination +' ? ',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.manualOutfeedMissionDetailsService.addManualOutfeedMissionDetailsCurrentStock(this.addManualOutfeedMissionInstance).subscribe(
          addUser => {
            // alert("in massage box")
            this.findAllCurrentStockDetails();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: ' Data added successfully', life: 3000 });

            this.confirmationService.close();
            this.currentDialog = false;
          },
          error => {
            console.error('There was an error during the deletion process', error);
          }
        );
      }
    })


  }

  hideDialog() {
    this.currentDialog = false;


  }

  
  hideConformationDialog() {

    this.showConfirmationDialog = false;

  }



  fetchAllMasterProducts() {

    this.masterProductDetailsService.fetchAllMasterProductDetails().subscribe(
      data => {

        this.masterProductDetailsList = data;
        console.log("this.masterProductDetails");
        console.log(this.masterProductDetailsList);

        this.CoreSizeList = this.masterProductDetailsList.map(product => (product.coreSize));

        console.log("this.CoreSizeList");
        console.log(this.CoreSizeList);

      },
    )
  }


  public selectCoreSizeChangeHandler(value: string) {
    this.coreSize = value;
  }

  public selectedDestinationHandler(value: string) {
    this.selectedDestination = value;

  }

  public findByAllFiltersDetails() {
    this.resetData();

    this.currentStockDetailsService.findByAllFiltersDetails(this.currentstartDateTime,
      this.currentEndDateTime, this.selectedCoreSize, this.selectedCoreShop,this.palletCode
    ).subscribe(
      currentDetailsFilter => {
        this.currentStockDetailsList = currentDetailsFilter;
        if (this.currentStockDetailsList == null || this.currentStockDetailsList.length == 0) {
          console.log("no data found")
          this.messageService.add({ severity: 'error', summary: 'Info', detail: 'No Records Found' });

        }


      },
      error => {
        console.error('Error:', error);
      }
    );
  }


  

  resetFilters() {
    this.currentstartDateTime = 'NA';
    this.currentEndDateTime = 'NA';
   // this.CoreSizeList = [];
    //this.CoreShopList = [];
    this.disableSearchButton = false;
    this.palletCode = 'NA';


    this.findAllCurrentStockDetails();
    //this.fetchAllMasterProducts();
  }


  resetData() {

    if (this.currentstartDateTime == undefined || this.currentstartDateTime == null) {
      this.currentstartDateTime = "NA";
    }
    if (this.currentEndDateTime == undefined || this.currentEndDateTime == null) {
      this.currentEndDateTime = "NA";
    }


    if (this.selectedCoreSize == undefined || this.selectedCoreSize == null || this.selectedCoreSize.trim() == "") {
      this.selectedCoreSize = "NA";
    }
    if (this.selectedCoreShop == undefined || this.selectedCoreShop == null || this.selectedCoreShop.trim() == "") {
      this.selectedCoreShop = "NA";
    }
    if (this.selectedDestination == undefined || this.selectedDestination == null || this.selectedDestination.trim() == "") {
      this.selectedDestination = "NA";
    }

    if(this.palletCode==undefined || this.palletCode ==null || this.palletCode.trim()==""){
      this.palletCode="NA";
    }
  }

  // public dateTimeValidation() {
  //   if (this.currentstartDateTime != null && this.currentEndDateTime != null) {
  //     if (this.currentstartDateTime <= this.currentEndDateTime) {
  //       this.disableSearchButton = false;
  //     } else {
  //       this.disableSearchButton = true;
  //     }
  //   } else {
  //     this.disableSearchButton = false;
  //   }
  // }
  public dateTimeValidation() {
    if (this.currentstartDateTime && this.currentEndDateTime) {
      const start = new Date(this.currentstartDateTime).getTime();
      const end = new Date(this.currentEndDateTime).getTime();
      this.disableSearchButton = start > end;
    } else {
      this.disableSearchButton = false;
    }
  }

  //Excel Report 
  generateCurrentStockDetailsReport() {

    if (this.currentStockDetailsList.length > 0) {

      const headerRowsCount = 4;

      const title = 'Current Stock Details Report';

      const header = ["Sr.No", "Pallet Code", "Core Size", "Core Shop", "Quantity", "Rack Name", "Floor Name", "Nomenclature",
        "Batch Number", "LoadDateTime"]
      // Convert the id to sr.no
      for (let i = 0; i < this.currentStockDetailsList.length; i++) {
        this.currentStockDetailsList[i].currentStockDetailsId = (i + 1)
      }
      // Convert the array of objects to array of array because reporing library support array of array or array as input.
      //const data = this.currentStockDetailsList.map(obj => Object.values(obj));

      const data = this.currentStockDetailsList.map((obj) =>
        Object.values({
          currentStockDetailsId: obj.currentStockDetailsId,
          palletCode: obj.palletCode,
          coreSize: obj.coreSize,
          coreShop: obj.coreShop,
          quantity: obj.quantity,
          rackName: obj.rackName,
          floorName: obj.floorName,
          nomenclature: obj.nomenclature,
          batchNumber: obj.batchNumber,
          loadDatetime: obj.loadDatetime,


        }
        )
      );



      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Current Stock Details');

      // Add new row
      let titleRow = worksheet.addRow([title]);

      // Set font, size and style in title row.
      titleRow.font = { name: 'Times New Roman', family: 4, size: 25, underline: 'double', bold: true };
      // Align the title in the center
      worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

      //Merge Cells
      worksheet.mergeCells(`A${titleRow.number}:K${titleRow.number}`);

      // Blank Row
      worksheet.addRow([]);

      //Add row with current date
      let subTitleRow = worksheet.addRow(['Date & Time : ' + (new Date().toLocaleString())]);

      // Add Image
      // let logo = workbook.addImage({
      //   base64: logoBase64Logo,
      //   extension: 'png',
      // });
      // worksheet.addImage(logo, 'L1:L3');

      //Add Header Row
      let headerRow = worksheet.addRow(header);
      // Cell Style : Fill and Border
      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF00' },
          bgColor: { argb: 'FF0000FF' }
        }
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      });




      // Add all data without formatting
      worksheet.addRows(data);

      // To give the width to the column
      worksheet.getColumn(2).width = 15;
      worksheet.getColumn(3).width = 15;
      worksheet.getColumn(4).width = 23;
      worksheet.getColumn(5).width = 23;
      worksheet.getColumn(6).width = 25;
      worksheet.getColumn(7).width = 20;
      worksheet.getColumn(8).width = 25;
      worksheet.getColumn(9).width = 25;
      worksheet.getColumn(10).width = 25;
      worksheet.getColumn(11).width = 30;
      worksheet.getColumn(12).width = 30;
      worksheet.getColumn(13).width = 30;
      worksheet.getColumn(14).width = 35;
      worksheet.getColumn(15).width = 35;


      // worksheet.addRow([]);

      //Footer Row
      let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
      footerRow.getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFCCFFE5' }
      };
      footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // Align the footer in the center
      worksheet.getCell('A' + (data.length + headerRowsCount + 1)).alignment = { vertical: 'middle', horizontal: 'center' };
      // console.log(data.length + headerRowsCount + 1);

      //Merge Cells
      worksheet.mergeCells(`A${footerRow.number}:K${footerRow.number}`);

      // Save the file in Excel format
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // const fileName="ProdData"+(new Date().getDay())+(new Date().getMonth())+(new Date().getFullYear())+(new Date().getTime())+(new Date().getMinutes())+(new Date().getSeconds());


        const todayDate = new Date();
        const fileName = "CurrentStockDetailsReport" + (todayDate.getDate()) + (todayDate.getMonth() + 1) + (todayDate.getFullYear()) + (todayDate.getHours())
          + (todayDate.getMinutes()) + (todayDate.getSeconds());

        FileSaver.saveAs(blob, fileName + '.xlsx');
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Download Successful', life: 3000 });

      })

    }
    else {
      // this.messageService.add({ severity: 'danger', summary: 'danger', detail: 'No data available' });
      this.messageService.add({ severity: 'info', summary: 'No Data', detail: 'No data available to download', life: 3000 });
    }
  }
}

