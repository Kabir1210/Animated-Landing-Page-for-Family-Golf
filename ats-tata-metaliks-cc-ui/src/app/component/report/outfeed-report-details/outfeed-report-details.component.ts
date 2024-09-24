import { Component, OnInit, ViewChild } from '@angular/core';
import { ImportsModule } from '../../../import';

import { DatePipe, formatDate } from '@angular/common';
import { OutfeedMissionDetailsService } from '../../../services/outfeedMissionDetails.service';
import { MessageService } from 'primeng/api';
import { MasterProductDetailsService } from '../../../services/masterProductDetails.service';
import { OutfeedMissionDetailsModel } from '../../../model/OutfeedMissionDetails.model';
import { MasterProductDetailsModel } from '../../../model/masterProductDetails.model';
import { Table } from 'primeng/table';
import { MasterShiftDetailsService } from '../../../services/masterShiftDetails.service';
import { MasterShiftDetailsModel } from '../../../model/masterShiftDetails.model';
import { MasterCCMDetailsService } from '../../../services/masterCCMDetails.service';
import { MasterCCMDetailsModel } from '../../../model/masterAreaDetails.model copy';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-outfeed-report-details',
  standalone: true,
  imports: [ImportsModule],
  providers: [ MessageService,DatePipe,OutfeedMissionDetailsService],
  templateUrl: './outfeed-report-details.component.html',
  styleUrl: './outfeed-report-details.component.css'
})
export class OutfeedReportDetailsComponent implements OnInit {

  @ViewChild('dt') dt!: Table;
  
  outfeedMissionRuntimeDetailsList: OutfeedMissionDetailsModel[] = [];
  readyCount!: number;
  inprogressCount!: number;
  completedCount!: number;
  masterProductDetails: MasterProductDetailsModel[] = [];
  shiftDetailsTableList : MasterShiftDetailsModel[] = [];
  ccmDetailsTableList : MasterCCMDetailsModel[] = [];
  shiftListList: any[] = [];
  CoreSizeList: any[] = [];
  DeatinationList: any[] = [];

  selectedStatus: any;
  selectedCoreSize: any;
  selectedDestinationArea: any;
  selectedShiftName: any;
  statuses: any[] = ['READY', 'IN_PROGRESS', 'COMPLETED'];

  missionRuntimeOutfeedStartDateTime!: string;
  missionRuntimeOutfeedEndDateTime!: string;
  skuCode!: string;
  batchNumber!: string;
  floorName!: string;
  areaName!: string;
  palletCode!: string;
  selectedInfeedMissionStatus!: string;
  selectedArea!: string;

  disableSearchButton: boolean = false;
  disableDateTime: boolean = true;

  showFilters = false;
  productDialog: boolean = false;
  submitted: boolean = false;

  constructor(
    private outfeedMissionDetailsService: OutfeedMissionDetailsService,
    private messageService: MessageService,
    private masterproductDetailsService: MasterProductDetailsService,
    private datePipe: DatePipe,
    private masterShiftDetailsService: MasterShiftDetailsService,
    private masterCCMDetailsService: MasterCCMDetailsService
  ) { }
  ngOnInit(


    
  ): void {

    this.fetchAllOutfeedMissionByCurrentDate();
    this.fetchAllMasterProducts();
    this.fetchAllCCMDetails();
    this.fetchAllMasterShiftDetails();
  }

  resetFilters() {
    this.missionRuntimeOutfeedStartDateTime = 'NA';
    this.missionRuntimeOutfeedEndDateTime = 'NA';
    this.selectedStatus = null;
    this.selectedCoreSize = null;
    this.selectedShiftName = null;
    this.palletCode = 'NA';
    this.selectedDestinationArea = null;
    this.selectedShiftName = null;
    // reset your table data here
    this.fetchAllOutfeedMissionByCurrentDate();
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
  

  getCellClass(content: string): string {
    // content = content.toLowerCase(); // Convert to lowercase for case-insensitivity
    if (content === 'READY') {
      return 'orange';
    } else if (content === 'IN PROGRESS') {
      return 'yellow';
    } else if (content === 'IN_PROGRESS') {
      return 'yellow';
    } else if (content === 'COMPLETED') {
      return 'green';
    } else {
      return 'red'; // Return an empty string if the content doesn't match any condition
    }
  }

  transformDate(date: string | number | Date | null) {
    if(date === null){
      return "NA";
      
    }
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
  }

  fetchAllOutfeedMissionByCurrentDate(){
    console.log("fetchAllInfeedMissionByCurrentDate called")
    this.outfeedMissionDetailsService.fetchAllOutfeedMissionByCurrentDate().subscribe(
      data => {
        this.outfeedMissionRuntimeDetailsList = data;
        if(this.outfeedMissionRuntimeDetailsList == null || this.outfeedMissionRuntimeDetailsList.length == 0){
          console.log("no data found")
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
          
        }
        this.readyCount = this.outfeedMissionRuntimeDetailsList.filter((outfeedMission: OutfeedMissionDetailsModel) => outfeedMission.outfeedMissionStatus === 'READY').length;
        this.inprogressCount = this.outfeedMissionRuntimeDetailsList.filter((outfeedMission: OutfeedMissionDetailsModel) => outfeedMission.outfeedMissionStatus === 'IN_PROGRESS').length;
        this.completedCount = this.outfeedMissionRuntimeDetailsList.filter((outfeedMission: OutfeedMissionDetailsModel) => outfeedMission.outfeedMissionStatus === 'COMPLETED').length;
 
      },
      error => {
        console.error('Error:', error);
      }

      
    );
  }

  fetchAllMasterProducts() {
 
    this.masterproductDetailsService.fetchAllMasterProductDetails().subscribe(
      data => {
  
        this.masterProductDetails = data;
        console.log("this.masterProductDetails");
        console.log(this.masterProductDetails);
    
        this.CoreSizeList = this.masterProductDetails.map(product => (product.coreSize));
  
        console.log("this.CoreSizeList");
        console.log(this.CoreSizeList);
  
      },
    )
  }

  public fetchAllMasterShiftDetails() {

    this.masterShiftDetailsService.fetchShiftDetails().subscribe(
      shiftDetailsList => {
        this.shiftDetailsTableList = shiftDetailsList;
  
        this.shiftListList = this.shiftDetailsTableList.map(shift => (shift.shiftName));
        console.log(this.shiftDetailsTableList);
 
      }
    );
  }

  public fetchAllCCMDetails() {

    this.masterCCMDetailsService.getMasterCCMDetails().subscribe(
      ccmDetailsList => {
        this.ccmDetailsTableList = ccmDetailsList;
  
        this.DeatinationList = this.ccmDetailsTableList.map(ccm => (ccm.ccmName));
        console.log(this.DeatinationList);
 
      }
    );
  }
  

  fetchAllInfeedDetailsByFilters() {
    this.resetData()

    console.log("fetchAllInfeedDetailsByFilters called")
    console.log("this.selectedCoreSize :: " + this.selectedCoreSize);
    console.log("this.missionRuntimeOutfeedStartDateTime :: " + this.missionRuntimeOutfeedStartDateTime);
    console.log("this.missionRuntimeOutfeedEndDateTime :: " + this.missionRuntimeOutfeedEndDateTime);
    console.log("this.palletCode :: " + this.palletCode);

    this.outfeedMissionDetailsService.fetchOutfeedMissionRuntimeDetailsByAllFilters(this.selectedCoreSize, this.missionRuntimeOutfeedStartDateTime,this.missionRuntimeOutfeedEndDateTime, this.selectedStatus,this.palletCode.trim(),this.selectedDestinationArea,this.selectedShiftName
    ).subscribe(

      data => {
        this.outfeedMissionRuntimeDetailsList = data;
        if(this.outfeedMissionRuntimeDetailsList == null || this.outfeedMissionRuntimeDetailsList.length == 0){
          console.log("no data found")
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
          
        }
        this.readyCount = this.outfeedMissionRuntimeDetailsList.filter((outfeedMission: OutfeedMissionDetailsModel) => outfeedMission.outfeedMissionStatus === 'READY').length;
        this.inprogressCount = this.outfeedMissionRuntimeDetailsList.filter((outfeedMission: OutfeedMissionDetailsModel) => outfeedMission.outfeedMissionStatus === 'IN_PROGRESS').length;
        this.completedCount = this.outfeedMissionRuntimeDetailsList.filter((outfeedMission: OutfeedMissionDetailsModel) => outfeedMission.outfeedMissionStatus === 'COMPLETED').length;
 
      },
      error => {
        console.error('Error:', error);
      }
      
    )
  }


  public selectAreaChangeHandler(value: string) {
    this.selectedArea = value;
  }

  selectInfeedMissionStatusChangeHandler(value: string) {
    this.selectedInfeedMissionStatus = ''
    this.selectedInfeedMissionStatus = value

  }


  public dateTimeValidation() {

    if (this.missionRuntimeOutfeedStartDateTime != null && (this.missionRuntimeOutfeedEndDateTime == null || this.missionRuntimeOutfeedEndDateTime == 'NA')) {
      this.disableDateTime = false;
      this.disableSearchButton = true;
    }

    else if (this.missionRuntimeOutfeedStartDateTime != null && this.missionRuntimeOutfeedEndDateTime != null && this.missionRuntimeOutfeedStartDateTime <= this.missionRuntimeOutfeedEndDateTime) {
      this.disableSearchButton = false;
    }

    else if (this.missionRuntimeOutfeedStartDateTime != null && this.missionRuntimeOutfeedEndDateTime != null && this.missionRuntimeOutfeedStartDateTime < this.missionRuntimeOutfeedEndDateTime) {
      this.disableSearchButton = false;
    }


    else if (this.missionRuntimeOutfeedStartDateTime == this.missionRuntimeOutfeedEndDateTime) {
      this.disableSearchButton = false;
    }
    
    else {
      this.disableSearchButton = true;
    }
 
        
  }

  // public timeValidation() {


  //   if (this.missionRuntimeInfeedStartTime != null && (this.missionRuntimeInfeedEndTime == null || this.missionRuntimeInfeedEndTime == 'NA')) {
  //     this.disableDateTime = false;
  //     this.disableSearchButton = true;
  //   }

  //   else if (this.missionRuntimeInfeedStartTime != null && this.missionRuntimeInfeedEndTime != null && this.missionRuntimeInfeedStartTime <= this.missionRuntimeInfeedEndTime) {
  //     this.disableSearchButton = false;
  //   }

  //   else if (this.missionRuntimeInfeedStartTime != null && this.missionRuntimeInfeedEndTime != null && this.missionRuntimeInfeedStartTime < this.missionRuntimeInfeedEndTime) {
  //     this.disableSearchButton = true;
  //   }

  //   else if (this.missionRuntimeInfeedStartTime != null && this.missionRuntimeInfeedEndTime != null && this.missionRuntimeInfeedStartTime > this.missionRuntimeInfeedEndTime) {
  //     this.disableSearchButton = false;
  //   }



  //   else if (this.missionRuntimeInfeedStartTime == this.missionRuntimeInfeedEndTime) {
  //     this.disableSearchButton = false;
  //   }

  //   else {
  //     this.disableSearchButton = true;
  //   }
  // }


  resetData() {
    if (this.missionRuntimeOutfeedStartDateTime == undefined || this.missionRuntimeOutfeedStartDateTime == null) {
      this.missionRuntimeOutfeedStartDateTime = "NA";
    }
    if (this.missionRuntimeOutfeedEndDateTime == undefined || this.missionRuntimeOutfeedEndDateTime == null) {
      this.missionRuntimeOutfeedEndDateTime = "NA";
    }
    if(this.selectedStatus == undefined || this.selectedStatus == null || this.selectedStatus.trim() == "") {
      this.selectedStatus = "NA";
    }

 
    if (this.selectedCoreSize == undefined || this.selectedCoreSize == null || this.selectedCoreSize.trim() == "") {
      this.selectedCoreSize = "NA";
    }
    if (this.palletCode == undefined || this.palletCode == null || this.palletCode.trim() == "") {
      this.palletCode = "NA";
    }
    if (this.selectedArea == undefined || this.selectedArea == null) {
      this.selectedArea = "NA";
    }
    if (this.selectedDestinationArea == undefined || this.selectedDestinationArea == null) {
      this.selectedDestinationArea = "NA";
    }
    if (this.selectedShiftName == undefined || this.selectedShiftName == null) {
      this.selectedShiftName = "NA";
    }
            
  }
  
  generateOutfeedDetailsReport(){
 
    if (this.outfeedMissionRuntimeDetailsList.length > 0) {
  
  
      //  const logoBase64Logo = "";
      const headerRowsCount = 3;

   
  const title = 'OUTFEED MISSION DETAILS REPORT'+"    " +formatDate(new Date(), 'dd-MMM-yyyy HH:mm', 'en-US');

   

      const header = ["Sr.No",  "Pallet Code", "Product Name", "Product Variant Code", "Quantity", "Floor Name", "Rack Name", "Position Name", "Shift Name", 
        "Pallet Status Name", "Cdatetime","outfeedMissionStatus","outfeedMissionStartDatetime","outfeedMissionEndDatetime"];


      // Convert the id to sr.no
      for (let i = 0; i < this.outfeedMissionRuntimeDetailsList.length; i++) {
        this.outfeedMissionRuntimeDetailsList[i].outfeedMissionId = (i + 1)
      }

      const data = this.outfeedMissionRuntimeDetailsList.map((obj) =>
        Object.values({
          outfeedMissionId:obj.outfeedMissionId,
          palletCode: obj.palletCode,
          productName: obj.productName,
          productVariantCode:obj.productVariantCode,
          quantity: obj.quantity,
          floorName: obj.floorName,
          rackName: obj.rackName,
          positionName: obj.positionName,
          shiftName: obj.shiftName,
          palletStatusName: obj.palletStatusName,
          cdatetime: obj.cdatetime,
          outfeedMissionStatus:obj.outfeedMissionStatus,
          outfeedMissionStartDatetime:obj.outfeedMissionStartDatetime,
          outfeedMissionEndDatetime:obj.outfeedMissionEndDatetime

         

        }
        )
      );
      
      
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Infeed Mission Data');

      // Add new row
      let titleRow = worksheet.addRow([title]);
      var titleRow1 = worksheet.addRow([]);

      var titleRow2 = worksheet.addRow([]);

      // Set font, size and style in title row.
      // titleRow.font = { name: 'Calibri', family: 4, size: 22, underline: 'double', bold: true };
      titleRow.font = { name: 'Calibri', family: 4, size: 22 };

      titleRow1.font = {name: 'Calibri', family: 4, size: 16};

      titleRow2.font = {name: 'Calibri', family: 4, size: 16};


      // Align the title in the center
      worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('D2').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('D3').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('H2').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('H3').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('L2').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('L3').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('P2').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('P3').alignment = { vertical: 'middle', horizontal: 'center' };

      //Merge Cells
      worksheet.mergeCells(`A${titleRow.number}:N${titleRow.number}`);
      
      // Blank Row
      worksheet.addRow([]);
           
    //Add Header Row
    let headerRow = worksheet.addRow(header);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4472C4' },
         
      }
      cell.font = {
   
        color: { argb: 'FFFFFF' },
        size:12,
        bold:true,       
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });


      // Add all data without formatting
      worksheet.addRows(data);

      
      // To give the width to the column
      worksheet.getColumn(2).width = 15;
      worksheet.getColumn(3).width = 15;
      worksheet.getColumn(4).width = 20;
      worksheet.getColumn(5).width = 20;
      worksheet.getColumn(6).width = 20;
      worksheet.getColumn(7).width = 20;
      worksheet.getColumn(8).width = 20;
      worksheet.getColumn(9).width = 25;
      worksheet.getColumn(10).width = 25;
      worksheet.getColumn(11).width = 25;
      worksheet.getColumn(12).width = 30;
      worksheet.getColumn(13).width = 35;
      worksheet.getColumn(14).width = 30;
      worksheet.getColumn(15).width = 30;
      worksheet.getColumn(16).width = 30;
      worksheet.getColumn(17).width = 30;
      worksheet.getColumn(18).width = 30;


      // worksheet.addRow([]);

      //Footer Row
      let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
      footerRow.getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'F1F5F9' }
      };
      footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      // Align the footer in the center
      worksheet.getCell('A' + (data.length + headerRowsCount + 1)).alignment = { vertical: 'middle', horizontal: 'center' };
      // console.log(data.length + headerRowsCount + 1);

      //Merge Cells
      worksheet.mergeCells(`A${footerRow.number}:N${footerRow.number}`);

      // Save the file in Excel format
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // const fileName="ProdData"+(new Date().getDay())+(new Date().getMonth())+(new Date().getFullYear())+(new Date().getTime())+(new Date().getMinutes())+(new Date().getSeconds());


        const todayDate = new Date();
        console.log(todayDate);

        const fileName = "OutfeedReport_" + (todayDate.getDate()) + (todayDate.getMonth() + 1) + (todayDate.getFullYear()) + (todayDate.getHours())
          + (todayDate.getMinutes()) + (todayDate.getSeconds());

        FileSaver.saveAs(blob, fileName + '.xlsx');
     
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Download Successful', life: 3000 });
      })
    }
    else {
      debugger
      this.messageService.add({ severity: 'info', summary: 'No Data', detail: 'No data available to download', life: 3000 });
    }
  }
 
  
}








