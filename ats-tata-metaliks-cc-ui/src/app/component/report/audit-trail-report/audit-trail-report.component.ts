import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fileServer from 'file-saver';
import { ImportsModule } from '../../../import';
import { AuditTrailReportModel } from '../../../model/auditTrailReport.model';
import { MasterUserDetailsModel } from '../../../model/masterUserDetails.model';
import { AuditTrailDetailsService } from '../../../services/auditTrailDetails.service';
import { MasterUserDetailsService } from '../../../services/masterUserDetails.service';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../../services/auth.service';
import { Table } from 'primeng/table/table';


@Component({
  selector: 'app-audit-trail-report',
  standalone: true,
  imports: [ImportsModule
  ],
  providers: [AuditTrailDetailsService,MessageService,DatePipe,MasterUserDetailsService],
  templateUrl: './audit-trail-report.component.html',
  styleUrl: './audit-trail-report.component.css'
})

export class AuditTrailReportComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  auditTrailDetailsList: AuditTrailReportModel[] = [];
  userName!: string;
  startDateTime!: string;
  endDateTime!: string;
  disableSearchButton: boolean = false;
  disableDateTime: boolean = true;
  dropDownList: any[] = [];
  masterUserDetailsList:MasterUserDetailsModel[] = [];
  username!: string;
  showFilters = false;
  constructor(private auditTrailDetailsService: AuditTrailDetailsService, private masterUserDetailsService: MasterUserDetailsService,private authService:AuthenticationService) { }

  ngOnInit(): void {
    
        this.fetchAllAuditTrailDetails();
        this.fetchAllUserDetails();
      
    


  }

  resetData() {
    this.userName = "NA";
    this.startDateTime = "NA";
    this.endDateTime = "NA"
  }

  public fetchAllAuditTrailDetails() {
    this.auditTrailDetailsService.fetchAllAuditTrailDetails().subscribe(
      auditTrailList => {
       
        this.auditTrailDetailsList = auditTrailList;
        
      }
    )
  }

  applyGlobalFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    this.dt.filterGlobal(target.value, 'contains');
  }
  public fetchAllUserDetails() {
    this.masterUserDetailsService.fetchAllMasterUserDetails().subscribe(
      userDetailsList => {
        this.masterUserDetailsList = userDetailsList;
        this.dropDownList = this.masterUserDetailsList.map(user => (user.userName));
        console.log("username"+this.dropDownList)
      }
    );
  }

  public selectUserNameChangeHandler(value: string) {
    this.userName = value;
    console.log("userName::"+ this.userName)
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


  public fetchAuditTrailDetailsByAllFilters() {
   
    if (this.startDateTime == undefined || this.startDateTime == null) {
      this.startDateTime = "NA"
    }
    if (this.endDateTime == undefined || this.endDateTime == null) {
      this.endDateTime = "NA"
    }
    if (this.userName == undefined || this.userName == null || this.userName.trim() == "") {
      this.userName = "NA"
    }

    this.auditTrailDetailsService.fetchAuditTrailDetailsByAllFilters(this.startDateTime, this.endDateTime, this.userName).subscribe(
      auditTrailList => {
        this.auditTrailDetailsList = auditTrailList;
        console.log("auditTrailList"+JSON.stringify(this.auditTrailDetailsList));
      }
    )
  }

  public generateAuditTrailExcelReport() {
    if (this.auditTrailDetailsList.length > 0) {
    var logoBase64Logo = ""
    const headerRowsCount = 8;
    const title = 'AUDIT TRAIL DETAILS REPORT' + "    " + formatDate(new Date(), 'dd-MMM-yyyy HH:mm:ss', 'en-US');
    //const title = 'Audit Trail Details Report';
    const header = ["Sr.No", "Transaction Details", "Field",
      "Reason", "username", "DateTime"]

    // Convert the id to sr.no
    for (let i = 0; i < this.auditTrailDetailsList.length; i++) {
      this.auditTrailDetailsList[i].auditId = (i + 1)
    }

    // Convert the array of objects to array of array because reporing library support array of array or array as input.


    const data = this.auditTrailDetailsList.map((obj) =>
      Object.values({
        auditId: obj.auditId,
        transactionDetails: obj.operatorActions,
        field: obj.field,
        reason: obj.reason,
       
        username: obj.username,
        cDateTime: obj.datetimeC
      }
      )
    );

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Audit Trail Data');

    // Add new row
    let titleRow = worksheet.addRow([title]);

    // Set font, size and style in title row.
    titleRow.font = { name: 'Calibri', family: 4, size: 22 };
    //titleRow.font = { name: 'Comic Sans MS', family: 4, size: 25, underline: 'double', bold: true };
    // Align the title in the center
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

    //Merge Cells
    worksheet.mergeCells(`A${titleRow.number}:H${titleRow.number}`);

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
    worksheet.getColumn(7).width = 10;
    worksheet.getColumn(8).width = 30;


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
    worksheet.mergeCells(`A${footerRow.number}:H${footerRow.number}`);

    // Save the file in Excel format
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const todayDate = new Date();
      console.log(todayDate);



      const fileName = "AuditTrailReport" + (todayDate.getDate()) + (todayDate.getMonth() + 1) + (todayDate.getFullYear()) + (todayDate.getHours())
        + (todayDate.getMinutes()) + (todayDate.getSeconds());
      fileServer.saveAs(blob, fileName + '.xlsx');
    })
  }else {
    alert("Data is not available");
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
