import { Component, ViewChild, inject } from '@angular/core';
import { InfeedMissionRuntimeDetailsService } from '../../../services/InfeedMissionRuntimeDetails.service';
import { InfeedMissionRuntimeDetailsModel } from '../../../model/InfeedMissionRuntimeDetails.model';
import { ReportComponent } from '../report.component';
import { HttpClient } from '@angular/common/http';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { OnInit } from '@angular/core';
import { ImportsModule } from '../../../import';
import { MasterProductDetailsService } from '../../../services/masterProductDetails.service';
import { MasterProductDetailsModel } from '../../../model/masterProductDetails.model';
import { MasterShiftDetailsService } from '../../../services/masterShiftDetails.service';
import { MasterShiftDetailsModel } from '../../../model/masterShiftDetails.model';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';



@Component({
  selector: 'app-infeed-report',
  standalone: true,
  imports: [ImportsModule
  ],
  providers: [InfeedMissionRuntimeDetailsService,MessageService,DatePipe,MasterShiftDetailsService],
  templateUrl: './infeed-report.component.html',
  styleUrl: './infeed-report.component.css'
})
export class InfeedReportComponent  implements OnInit{

  @ViewChild('dt') dt!: Table;
  
  infeedMissionRuntimeDetailsList: any[] = [];
  loadingSideInfeedMissionList: InfeedMissionRuntimeDetailsModel[] = [];
  masterProductDetails : MasterProductDetailsModel[] = [];
  shiftDetailsTableList : MasterShiftDetailsModel[] = [];
  CoreSizeList: any[] = [];
  shiftListList: any[] = [];
  
  product!: InfeedMissionRuntimeDetailsModel;
  productDialog: boolean = false;
  submitted: boolean = false;

  selectedArea!: string;


  missionRuntimeInfeedStartDateTime!: string;
  InfeedStartDateTime!: string;
  missionRuntimeInfeedEndDateTime!: string;
  missionRuntimeInfeedStatus!: string;
  endDate!: string;
  selectedStatus: any;
  selectedCoreSize: any;
  selectedCoreShooter: any;
  selectedPalletCode: any;
  selectedShiftName: any;
  statuses: any[] = ['READY', 'IN_PROGRESS', 'COMPLETED','ABORT'];
  coreShooter : any[] = ['CORE_SHOOTER-4','CORE_SHOOTER-5','CORE_SHOOTER-6'];

showFilters = false;

readyCount!: number;
inprogressCount!: number;
completedCount!: number;

basicData: any;

basicOptions: any;


  skuCode!: string;
  batchNumber!: string;
  floorName!: string;
  areaName!: string;
  palletCode!: string;
  selectedInfeedMissionStatus!: string
  infeedMissionCdatetimeStart!: string
  infeedMissionCdatetimeEnd!: string
  disableSearchButton: boolean = false;
  disableDateTime: boolean = true;



  missionRuntimeInfeedStartTime!: string;
  missionRuntimeInfeedEndTime!: string;
  completedStatusCount!: number;
  readyStatusCount!: number;
  inprogressStatusCount!: number;
  totalStatusCount!: number;
  abortStatusCount!: number;

  textColor: string = '#000'; // replace with the color you want for the text
textColorSecondary: string = '#666'; // replace with the color you want for the secondary text
surfaceBorder: string = '#ddd'; // replace with the color you want for the surface border
 


  constructor(private infeedMissionRuntimeDetailsService: InfeedMissionRuntimeDetailsService,
    private masterproductDetailsService: MasterProductDetailsService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private masterShiftDetailsService: MasterShiftDetailsService

    
  ) {}



  ngOnInit(): void {
   
    //On refresh or on opning of this page following data will be fetched 
    this.fetchAllInfeedMissionByCurrentDate();
    this.fetchAllMasterProducts();
    this.fetchAllMasterShiftDetails();
    // this.initializeChartData();



  
    

  }

  // getSeverity(infeedMissionStatus: string) {
  //   switch (infeedMissionStatus) {
  //       case 'READY':
  //           return 'info';

  //       case 'IN_PROGRESS':
  //           return 'warning';

  //       case 'COMPLETED':
  //           return 'success';

  //       case 'ABORT':
  //           return 'danger';
  //   }
  // }

  getSeverity(infeedMissionStatus: string){
    switch (infeedMissionStatus) {
      case 'READY':
        return 'info';
      case 'IN_PROGRESS':
        return 'warning';
      case 'COMPLETED':
        return 'success';
      case 'ABORT':
        return 'danger';
      case 'CORE_SHOOTER-4':
        return 'secondary';
      case 'CORE_SHOOTER-5':
        return 'info';  // You can use a different custom color if needed
      case 'CORE_SHOOTER-6':
        return 'contrast';
      default:
        return undefined;
    }
  }

  

  transformDate(date: string | number | Date | null) {
    if(date === null){
      return "NA";
      
    }
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
  }



  fetchAllInfeedMissionByCurrentDate(){
    console.log("fetchAllInfeedMissionByCurrentDate called")
    this.infeedMissionRuntimeDetailsService.fetchAllInfeedMissionByCurrentDate().subscribe(
      data => {
        this.infeedMissionRuntimeDetailsList = data;
        if(this.infeedMissionRuntimeDetailsList == null || this.infeedMissionRuntimeDetailsList.length == 0){
          console.log("no data found")
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
          
        }
        this.readyCount = this.infeedMissionRuntimeDetailsList.filter((infeedMission: InfeedMissionRuntimeDetailsModel) => infeedMission.infeedMissionStatus === 'READY').length;
        this.inprogressCount = this.infeedMissionRuntimeDetailsList.filter((infeedMission: InfeedMissionRuntimeDetailsModel) => infeedMission.infeedMissionStatus === 'IN_PROGRESS').length;
        this.completedCount = this.infeedMissionRuntimeDetailsList.filter((infeedMission: InfeedMissionRuntimeDetailsModel) => infeedMission.infeedMissionStatus === 'COMPLETED').length;
 
        console.log("this.readyCount :: " + this.readyCount);
        console.log("this.inprogressCount :: " + this.inprogressCount);
        console.log("this.completedCount :: " + this.completedCount);

        // this.initializeChartData();

      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  editProduct(product: InfeedMissionRuntimeDetailsModel) {
    this.product = { ...product };
    this.productDialog = true;
}

applyGlobalFilter(event: Event) {
  const target = event.target as HTMLInputElement;
  this.dt.filterGlobal(target.value, 'contains');
}


applyFilters() {
  // implement your filter logic here
  // you can access the selected dates and status using this.startDate, this.endDate, and this.selectedStatus
}

resetFilters() {
  this.missionRuntimeInfeedStartDateTime = 'NA';
  this.missionRuntimeInfeedEndDateTime = 'NA';
  this.selectedStatus = null;
  this.selectedCoreSize = null;
  this.selectedCoreShooter = null;
  this.disableSearchButton = false;
  this.selectedPalletCode = null;
  this.selectedShiftName = null;
  this.palletCode = 'NA';
  // reset your table data here
  this.fetchAllInfeedMissionByCurrentDate();
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

// initializeChartData() {


//   this.basicData = {
//     labels: ['Ready', 'In Progress', 'Completed'],
//     datasets: [
//         {
//             label: 'Sales',
//             data: [this.readyCount, this.inprogressCount, this.completedCount],
//             backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)'],
//             borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
//             borderWidth: 1
//         }
//     ]
// };

// this.basicOptions = {
//     plugins: {
//         legend: {
//             labels: {
//                 color: this.textColor
//             }
//         }
//     },
//     scales: {
//         y: {
//             beginAtZero: true,
//             ticks: {
//                 color: this.textColorSecondary
//             },
//             grid: {
//                 color: this.surfaceBorder,
//                 drawBorder: false
//             }
//         },
//         x: {
//             ticks: {
//                 color: this.textColorSecondary
//             },
//             grid: {
//                 color: this.surfaceBorder,
//                 drawBorder: false
//             }
//         }
//     }
// };
// }


// initializeChartData() {
  // this.readyCount = 7;
  // this.inprogressCount = 1;
  // this.completedCount = 2;

//   console.log("in initializeChartData :: " + this.infeedMissionRuntimeDetailsList.length);

//   this.readyCount = this.infeedMissionRuntimeDetailsList.filter((infeedMission: InfeedMissionRuntimeDetailsModel) => infeedMission.infeedMissionStatus === 'READY').length;
//   this.inprogressCount = this.infeedMissionRuntimeDetailsList.filter((infeedMission: InfeedMissionRuntimeDetailsModel) => infeedMission.infeedMissionStatus === 'IN_PROGRESS').length;
//   this.completedCount = this.infeedMissionRuntimeDetailsList.filter((infeedMission: InfeedMissionRuntimeDetailsModel) => infeedMission.infeedMissionStatus === 'COMPLETED').length;


//   console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
//   console.log(this.readyCount);
//   console.log(this.inprogressCount);
//   console.log(this.completedCount);

//   this.basicData = {
//       labels: ['Ready', 'In Progress', 'Completed'],
//       datasets: [
//           {
//               label: 'Sales',
//               data: [this.readyCount, this.inprogressCount, this.completedCount],
//               backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)'],
//               borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
//               borderWidth: 1
//           }
//       ]
//   };

//   this.basicOptions = {
//       plugins: {
//           legend: {
//               labels: {
//                   color: this.textColor
//               }
//           }
//       },
//       scales: {
//           y: {
//               beginAtZero: true,
//               ticks: {
//                   color: this.textColorSecondary
//               },
//               grid: {
//                   color: this.surfaceBorder,
//                   drawBorder: false
//               }
//           },
//           x: {
//               ticks: {
//                   color: this.textColorSecondary
//               },
//               grid: {
//                   color: this.surfaceBorder,
//                   drawBorder: false
//               }
//           }
//       }
//   };
// }



  // fetchAllInfeedRunTimeReportByCurrentDate() {
  //   this.disableDateTime = true;
  //   this.disableSearchButton = false;
  //   this.infeedMissionRuntimeDetailsService.fetchAllInfeedMissionByCurrentDate().subscribe(
  //     infeedDetailsList => {
     

  //       this.infeedMissionRuntimeDetailsList = infeedDetailsList;
  //       console.log("this.infeedMissionRuntimeDetailsList");
  //       console.log(this.infeedMissionRuntimeDetailsList);

  //       if (this.infeedMissionRuntimeDetailsList != null) {
  //         this.completedStatusCount = infeedDetailsList.filter(status => status.missionRuntimeInfeedStatus == "COMPLETED").length;
 
  //         this.readyStatusCount = infeedDetailsList.filter(status => status.missionRuntimeInfeedStatus == "READY").length;
 
  //         this.inprogressStatusCount = infeedDetailsList.filter(status => status.missionRuntimeInfeedStatus == "IN_PROGRESS").length;

  //         this.abortStatusCount = infeedDetailsList.filter(status => status.missionRuntimeInfeedStatus == "ABORT").length;
 
 
  //         this.totalStatusCount = 0;
  //         this.totalStatusCount = this.completedStatusCount + this.readyStatusCount + this.inprogressStatusCount + this.abortStatusCount;
 
  //       }

  //       //this.loadingSideInfeedMissionList = this.infeedMissionRuntimeDetailsList.filter(loadedList => loadedList.palletStatusId == 1);


        
  //     }     
  //   )
  // }

  fetchAllInfeedDetailsByFilters() {
    this.resetData()

    console.log("fetchAllInfeedDetailsByFilters called")
    console.log("this.selectedCoreSize :: " + this.selectedCoreSize);
    console.log("this.missionRuntimeInfeedStartDateTime :: " + this.missionRuntimeInfeedStartDateTime);
    console.log("this.missionRuntimeInfeedEndDateTime :: " + this.missionRuntimeInfeedEndDateTime);
    console.log("this.palletCode :: " + this.palletCode);

    this.infeedMissionRuntimeDetailsService.fetchInfeedMissionRuntimeDetailsByAllFilters(this.selectedCoreSize, this.missionRuntimeInfeedStartDateTime,this.missionRuntimeInfeedEndDateTime, this.selectedStatus,this.palletCode
      ,this.selectedCoreShooter,this.selectedShiftName
    ).subscribe(

      data => {
        this.infeedMissionRuntimeDetailsList = data;
        if(this.infeedMissionRuntimeDetailsList == null || this.infeedMissionRuntimeDetailsList.length == 0){
          console.log("no data found")
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
          
        }
        this.readyCount = this.infeedMissionRuntimeDetailsList.filter((infeedMission: InfeedMissionRuntimeDetailsModel) => infeedMission.infeedMissionStatus === 'READY').length;
        this.inprogressCount = this.infeedMissionRuntimeDetailsList.filter((infeedMission: InfeedMissionRuntimeDetailsModel) => infeedMission.infeedMissionStatus === 'IN_PROGRESS').length;
        this.completedCount = this.infeedMissionRuntimeDetailsList.filter((infeedMission: InfeedMissionRuntimeDetailsModel) => infeedMission.infeedMissionStatus === 'COMPLETED').length;
 
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


  // public dateTimeValidation() {

  //   if (this.missionRuntimeInfeedStartDateTime != null && (this.missionRuntimeInfeedEndDateTime == null || this.missionRuntimeInfeedEndDateTime == 'NA')) {
  //     this.disableDateTime = false;
  //     this.disableSearchButton = true;
  //   }

  //   else if (this.missionRuntimeInfeedStartDateTime != null && this.missionRuntimeInfeedEndDateTime != null && this.missionRuntimeInfeedStartDateTime <= this.missionRuntimeInfeedEndDateTime) {
  //     this.disableSearchButton = false;
  //   }

  //   else if (this.missionRuntimeInfeedStartDateTime != null && this.missionRuntimeInfeedEndDateTime != null && this.missionRuntimeInfeedStartDateTime < this.missionRuntimeInfeedEndDateTime) {
  //     this.disableSearchButton = false;
  //   }


  //   else if (this.missionRuntimeInfeedStartDateTime == this.missionRuntimeInfeedEndDateTime) {
  //     this.disableSearchButton = false;
  //   }
    
  //   else {
  //     this.disableSearchButton = true;
  //   }
 
        
  // }


  // public dateTimeValidation() {
  //   if (this.missionRuntimeInfeedStartDateTime != null && this.missionRuntimeInfeedEndDateTime != null) {
  //     if (this.missionRuntimeInfeedStartDateTime <= this.missionRuntimeInfeedEndDateTime) {
  //       this.disableSearchButton = false;
  //     } else {
  //       this.disableSearchButton = true;
  //     }
  //   } else if (this.missionRuntimeInfeedStartDateTime != null && (this.missionRuntimeInfeedEndDateTime == null || this.missionRuntimeInfeedEndDateTime == 'NA')) {
  //     this.disableDateTime = false;
  //     this.disableSearchButton = true;
  //   } else {
  //     this.disableSearchButton = true;
  //   }
  // }


  public dateTimeValidation() {
    if (this.missionRuntimeInfeedStartDateTime != null && this.missionRuntimeInfeedEndDateTime != null) {
      if (this.missionRuntimeInfeedStartDateTime <= this.missionRuntimeInfeedEndDateTime) {
        this.disableSearchButton = false;
      } else {
        this.disableSearchButton = true;
      }
    } else {
      this.disableSearchButton = false;
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
    if (this.missionRuntimeInfeedStartDateTime == undefined || this.missionRuntimeInfeedStartDateTime == null) {
      this.missionRuntimeInfeedStartDateTime = "NA";
    }
    if (this.missionRuntimeInfeedEndDateTime == undefined || this.missionRuntimeInfeedEndDateTime == null) {
      this.missionRuntimeInfeedEndDateTime = "NA";
    }
    if(this.selectedStatus == undefined || this.selectedStatus == null || this.selectedStatus.trim() == "") {
      this.selectedStatus = "NA";
    }

 
    if (this.selectedCoreSize == undefined || this.selectedCoreSize == null || this.selectedCoreSize.trim() == "") {
      this.selectedCoreSize = "NA";
    }
    if (this.selectedCoreShooter == undefined || this.selectedCoreShooter == null || this.selectedCoreShooter.trim() == "") {
      this.selectedCoreShooter = "NA";
    }
    if (this.selectedShiftName == undefined || this.selectedShiftName == null || this.selectedShiftName.trim() == "") {
      this.selectedShiftName = "NA";
    }
    if (this.batchNumber == undefined || this.batchNumber == null || this.batchNumber.trim() == "") {
      this.batchNumber ="NA";
    }
    if (this.palletCode == undefined || this.palletCode == null || this.palletCode.trim() == "") {
      this.palletCode = "NA";
    }
    
  
    if (this.selectedArea == undefined || this.selectedArea == null) {
      this.selectedArea = "NA";
    }
            
  }



    generateInfeedDetailsReport() {
 
   
      if (this.infeedMissionRuntimeDetailsList.length > 0) {
  
  
        //  const logoBase64Logo = "";
        const headerRowsCount = 3;
  
     
    const title = 'INFEED MISSION DETAILS REPORT'+"    " +formatDate(new Date(), 'dd-MMM-yyyy HH:mm', 'en-US');
  
     
  
        const header = ["Sr.No",  "Pallet Code", "Product Name", "Core Size", "Quantity", "Floor Name", 
          "Rack Name", "Position Name", "Shift Name", "Pallet Status Name", "Cdatetime","infeedMissionStatus","infeedMissionStartDatetime","infeedMissionEndDatetime"];
  
  
        // Convert the id to sr.no
        for (let i = 0; i < this.infeedMissionRuntimeDetailsList.length; i++) {
          this.infeedMissionRuntimeDetailsList[i].infeedMissionId = (i + 1)
        }
  
        const data = this.infeedMissionRuntimeDetailsList.map((obj) =>
          Object.values({
            infeedMissionId:obj.infeedMissionId,
            palletCode: obj.palletCode,
            productName: obj.productName,
            coreSize: obj.coreSize,
            quantity: obj.quantity,
            floorName: obj.floorName,
            rackName: obj.rackName,
            positionName: obj.positionName,
            shiftName: obj.shiftName,
            palletStatusName: obj.palletStatusName,
            cdatetime: obj.cdatetime,
            infeedMissionStatus:obj.infeedMissionStatus,
            infeedMissionStartDatetime:obj.infeedMissionStartDatetime,
            infeedMissionEndDatetime:obj.infeedMissionEndDatetime
           
  
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
        worksheet.getColumn(4).width = 18;
        worksheet.getColumn(5).width = 18;
        worksheet.getColumn(6).width = 18;
        worksheet.getColumn(7).width = 20;
        worksheet.getColumn(8).width = 20;
        worksheet.getColumn(9).width = 25;
        worksheet.getColumn(10).width = 25;
        worksheet.getColumn(11).width = 25;
        worksheet.getColumn(12).width = 30;
        worksheet.getColumn(13).width = 30;
        worksheet.getColumn(14).width = 30;
        worksheet.getColumn(15).width = 20;
        worksheet.getColumn(16).width = 20;
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
  
          const fileName = "InfeedReport_" + (todayDate.getDate()) + (todayDate.getMonth() + 1) + (todayDate.getFullYear()) + (todayDate.getHours())
            + (todayDate.getMinutes()) + (todayDate.getSeconds());
  
          FileSaver.saveAs(blob, fileName + '.xlsx');
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Download Successful', life: 3000 });
        });
  
      }
      else {
        this.messageService.add({ severity: 'info', summary: 'No Data', detail: 'No data available to download', life: 3000 });
      }
    }
   
    
  }
  
  
