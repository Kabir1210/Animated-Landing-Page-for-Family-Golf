import { DatePipe, formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fileServer from 'file-saver';
import { EquipmentAlarmHistoryDetailsModel } from '../../../model/equipmentAlarmHistoryDetails.model';
import { EquipmentlAarmHistoryDetailsService } from '../../../services/equipmentAlarmHistoryDetails.service';
import { AuthenticationService } from '../../../services/auth.service';
import { MasterEquipmentDetailsModel } from '../../../model/masterEquipmentDetails.model';
import { MasterEquipmentDetailsService } from '../../../services/masterEquipmentDetails.service';
import { ImportsModule } from '../../../import';
import { MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';

@Component({
  selector: 'app-alarm-history-report',
  standalone: true,
  imports: [ImportsModule
  ],
  providers: [EquipmentlAarmHistoryDetailsService,MessageService,MasterEquipmentDetailsService],
  templateUrl: './alarm-history-report.component.html',
  styleUrl: './alarm-history-report.component.css'
})


export class AlarmHistoryReportComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  alarmHistoryDetailsList: EquipmentAlarmHistoryDetailsModel[] = [];
  startDateTime!: string;
  endDateTime!: string;
  equipmentName!: string;
  equipmentAlarmName!: string;
  disableSearchButton: boolean = false;
  disableDateTime: boolean = true;
  dropDownList: any[] = [];
  masterEquipmentList: MasterEquipmentDetailsModel[] = [];
  masterEquipmentDetailsModelList: EquipmentAlarmHistoryDetailsModel[] = [];
  addnewAlarmDataList!: {}[];
  alarmTableAddNewPage: EquipmentAlarmHistoryDetailsModel[] = [];
  showFilters = false;
  
  constructor(private equipmentAlarmHistoryDetailsService: EquipmentlAarmHistoryDetailsService,private messageService: MessageService,
    private masterEquipmentDetailsService: MasterEquipmentDetailsService,private authService:AuthenticationService) { }

  ngOnInit(): void {
    
        this.fetchAllEquipmentAlarmHistoryDetails();
        this.fetchEquipmentDetails();
   


  }
  

  resetData() {
    this.equipmentName = "NA";
    this.startDateTime = "NA";
    this.endDateTime = "NA"
  }


  applyGlobalFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    this.dt.filterGlobal(target.value, 'contains');
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

  public fetchAllEquipmentAlarmHistoryDetails() {
    this.equipmentAlarmHistoryDetailsService.fetchAllEquipmentAlarmHistoryDetails().subscribe(
      equipmentAlarmList => {
      
        this.alarmHistoryDetailsList = equipmentAlarmList;
        console.log(" this.alarmHistoryDetailsList ::"+JSON.stringify( this.alarmHistoryDetailsList[0].equipmentAlarmOccurredDateTime ))
       
        if (this.alarmHistoryDetailsList == null) {
          alert("Data not found");
        }
      }
    );
  }

  fetchEquipmentDetails() {
    this.masterEquipmentDetailsService.fetchAllEquipmentDetails().subscribe(
      equipmentDetailsList => {
        this.masterEquipmentList = equipmentDetailsList;
        console.log("this.masterEquipmentList::"+JSON.stringify(this.masterEquipmentList[0].equipmentName))
        this.dropDownList = this.masterEquipmentList.map(equipment => (equipment.equipmentName));
        console.log("eqipment::"+this.dropDownList);
      });
  }

  // public selectEquipmentNameChangeHandler(value: string) {
  //   this.equipmentName = value;
  // }

  public selectEquipmentAlarmNameChangeHandler(value:string){
    this.equipmentAlarmName=value;
  }

  public fetchEquipmentAlarmHistoryDetailsByAllFilters() {
    if (this.startDateTime == undefined || this.startDateTime == null) {
      this.startDateTime = "NA"
    }
    if (this.endDateTime == undefined || this.endDateTime == null) {
      this.endDateTime = "NA"
    }
    if (this.equipmentName == undefined || this.equipmentName == null || this.equipmentName.trim() == "") {
      this.equipmentName = "NA"
    }

    this.equipmentAlarmHistoryDetailsService.fetchEquipmentAlarmHistoryDetailsByAllFilters(this.startDateTime, this.endDateTime, this.equipmentName).subscribe(
      equipmentAlarmList => {
       
        this.alarmHistoryDetailsList = equipmentAlarmList;
        //console.log("Equipment alarm list= " + this.alarmHistoryDetailsList);
        
      }
    )
  }

  public dateTimeValidation() {

    if (this.startDateTime != null && (this.endDateTime == null || this.endDateTime == 'NA')) {
      this.disableDateTime = false;
      this.disableSearchButton = true;
    }

    else if (this.startDateTime != null && this.endDateTime != null && this.endDateTime <= this.endDateTime) {
      this.disableSearchButton = false;
    }

    else if (this.startDateTime != null && this.endDateTime != null && this.startDateTime < this.endDateTime) {
      this.disableSearchButton = false;
    }


    else if (this.startDateTime == this.endDateTime) {
      this.disableSearchButton = false;
    }

    else {
      this.disableSearchButton = true;
    }
  }

  public generateAlarmExcelReport() {
    if (this.alarmHistoryDetailsList.length > 0) {
    var logoBase64Logo = ""
    const headerRowsCount = 6;

    //const title = 'Alarm Details Report';
    const title = 'ALARM DETAILS REPORT' + "    " + formatDate(new Date(), 'dd-MMM-yyyy HH:mm:ss', 'en-US');
    const header = ["Sr.No", "Equipment Name", "Alarm Name", "Alarm Desc",
      "Alarm Occured Date Time", "Alarm Resolved Date Time"]

    // Convert the id to sr.no
    for (let i = 0; i < this.alarmHistoryDetailsList.length; i++) {
      this.alarmHistoryDetailsList[i].wmsEquipmentAlarmHistoryId = (i + 1)
    }

    // Convert the array of objects to array of array because reporing library support array of array or array as input.


    const data = this.alarmHistoryDetailsList.map((obj) =>
      Object.values({
        wmsEquipmentAlarmHistoryId: obj.wmsEquipmentAlarmHistoryId,
        equipmentName: obj.equipmentName,
        equipmentAlarmName: obj.equipmentAlarmName,
        equipmentAlarmDesc: obj.equipmentAlarmDesc,
        equipmentAlarmOccurredDatetime: obj.equipmentAlarmOccurredDateTime,
        equipmentAlarmResolvedDatetime: obj.equipmentAlarmResolvedDateTime,




      }
      )
    );

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Alarm Data');

    // Add new row
    let titleRow = worksheet.addRow([title]);

    // Set font, size and style in title row.
    titleRow.font = { name: 'Calibri', family: 4, size: 22 };
    //titleRow.font = { name: 'Comic Sans MS', family: 4, size: 25, underline: 'double', bold: true };
    // Align the title in the center
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

    //Merge Cells
    worksheet.mergeCells(`A${titleRow.number}:F${titleRow.number}`);

    // Blank Row
    worksheet.addRow([]);

    //Add row with current date
    let subTitleRow = worksheet.addRow(['Date & Time : ' + (new Date().toLocaleString())]);

    // Add Image
    // let logo = workbook.addImage({
    //   base64: logoBase64Logo,
    //   extension: 'png',
    // });
    // worksheet.addImage(logo, 'I1:I1');

    //Add Header Row
    let headerRow = worksheet.addRow(header);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4472C4' },
        // bgColor: { argb: 'FF0000FF' }
      }
      cell.font = {

        color: { argb: 'FFFFFF' },
        size: 12,
        bold: true,
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });

    // // Add Data and Conditional Formatting (Row wise formatting)
    // data.forEach(d => {
    //   let row = worksheet.addRow(d);
    //   let qty = row.getCell(5);
    //   let color = 'FF99FF99';
    //   if (+qty < 800) {
    //     color = 'FF9999'
    //   }
    //   qty.fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     fgColor: { argb: color }
    //   }
    // }
    // );

    // Add all data without formatting
    worksheet.addRows(data);

    // Used to delete the column
    // worksheet.spliceColumns(10,1);
    // worksheet.spliceColumns(2,1);

    // To give the width to the column
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.getColumn(5).width = 30;
    worksheet.getColumn(6).width = 30;

    // worksheet.addRow([]);

    //Footer Row
    let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'F1F5F9' }
    };
    footerRow.getCell(1).border = {
      top: { style: 'thin' }, left: { style: 'thin' },
      bottom: { style: 'thin' }, right: { style: 'thin' }
    }
    // Align the footer in the center
    worksheet.getCell('A' + (data.length + headerRowsCount + 1)).alignment = { vertical: 'middle', horizontal: 'center' };
    // console.log(data.length + headerRowsCount + 1);

    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    // Save the file in Excel format
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const todayDate = new Date();
      console.log(todayDate);



      const fileName = "AlarmReport" + (todayDate.getDate()) + (todayDate.getMonth() + 1) + (todayDate.getFullYear()) + (todayDate.getHours())
        + (todayDate.getMinutes()) + (todayDate.getSeconds());
      fileServer.saveAs(blob, fileName + '.xlsx');
    })
  }else{
    this.messageService.add({ severity: 'danger', summary: 'danger', detail: 'No data available' });
  }


    //Save the file in excel format using buffer
    // workbook.xlsx.writeBuffer().then((data) => {
    //   let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //   fileServer.saveAs(blob, 'CarData.xlsx');
    // });

    // Save the file in CSV format
    // workbook.csv.writeBuffer().then((data) => {
    //   let blob = new Blob([data], { type: 'text/csv' });
    //   fs.saveAs(blob, 'ProductData.csv');
    // })

  }


 





  
  
  
    
}
