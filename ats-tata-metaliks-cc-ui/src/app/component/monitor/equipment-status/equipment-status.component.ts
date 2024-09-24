import { Component, OnInit } from '@angular/core';
import { StackerLiveDataDetailsService } from '../../../services/stackerLiveDataDetails.service';
import { ImportsModule } from '../../../import';
import { StackerLiveDataDetailsModel } from '../../../model/stackerLiveDataDetailsModel.model';

import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-equipment-status',
  standalone: true,
  imports: [ImportsModule],
  providers: [StackerLiveDataDetailsService,MessageService],
  templateUrl: './equipment-status.component.html',
  styleUrls: ['./equipment-status.component.css']
})
export class EquipmentStatusComponent implements OnInit {
  stackerLiveList1: StackerLiveDataDetailsModel[] = [];
  stackerLiveList2: StackerLiveDataDetailsModel[] = [];
  stackerId: number = 1;
  showConfirmationDialog: boolean = false;


  selectedStackerName: string = 'STACKER-1';
  rows = Array(5).fill(0).map((x, i) => ({ key: i + 1, value: 5 - i })).reverse();
  columns = Array(27).fill(0).map((x, i) => ({ key: i + 1, value: 0 }));

  rows1 = Array(6).fill(0).map((x, i) => ({ key: i + 1, value: 6 - i })).reverse();
  columns1 = Array(26).fill(0).map((x, i) => ({ key: i + 1, value: 0 }));

  private previousRack: number = 1;
  private _currentRack: number = 1;
  private pollingInterval: any;

  constructor(private stackerLiveDataDetailsService: StackerLiveDataDetailsService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    // Check for saved stacker selection
    const savedStackerName = localStorage.getItem('selectedStackerName');
    if (savedStackerName) {
      this.selectedStackerName = savedStackerName;
    }

    this.fetchLiveStackerData();
    this.fetchLiveStackerDataforStacker2();
    // this.getCurrentRackPosition();
    this.startPolling();
    console.log("Row:", this.rows);
  }
  ngOnDestroy(): void {
    this.stopPolling();
  }

  // get currentRack(): number {
  //   return this._currentRack;
  // }

  fetchLiveStackerData(): void {
    this.stackerLiveDataDetailsService.fetchLiveStackerDetails(1).subscribe(list => {
      this.stackerLiveList1 = list;
      this.getCurrentRackPosition();
      //this.updateRackPositions();
    });
  }
  startPolling(): void {
    
    this.pollingInterval = setInterval(() => {
      this.fetchLiveStackerData();
       this.fetchLiveStackerDataforStacker2();
       console.log("coloum :: " + JSON.stringify(this.columns1))
     
      
    }, 5000); 
    
  }

  stopPolling(): void {
    clearInterval(this.pollingInterval);
    
  }
  fetchLiveStackerDataforStacker2(): void {
    this.stackerLiveDataDetailsService.fetchLiveStackerDetails(2).subscribe(list => {
      this.stackerLiveList2 = list;
      this.getCurrentRackPosition1();
      //this.updateRackPositions();

    });
  }

  // updateRackPositions(): void {
  //   this.previousRack = this._currentRack;
  //   this._currentRack = this.getCurrentRackPosition();
  //   this._currentRack = this.getCurrentRackPosition1();
  // }

  // getCurrentRackPosition(): number {
  //   console.log("Rack position for Stacker 1:", this.stackerLiveList1[0]?.stackerCurrentRack);
  //   if (this.stackerLiveList1.length > 0) {
  //     let stackerCurrentRackValue = this.stackerLiveList1[0].stackerCurrentRack;
  //     for (let i = 0; i < this.columns.length; i++) {
  //       if (stackerCurrentRackValue === this.columns[i].key) {
  //         this.columns[i].value = stackerCurrentRackValue;

  //         console.log("columns :: " + this.columns)
  //         break;
  //       }
  //     }
  //   }
  //   return this.stackerLiveList1.length > 0 ? this.stackerLiveList1[0].stackerCurrentRack : 1;
  // }

  // getCurrentRackPosition1(): number {
  //   console.log("Rack position for Stacker 2:", this.stackerLiveList2[0]?.stackerCurrentRack);
  //   if (this.stackerLiveList2.length > 0) {
  //     let stackerCurrentRackValue = this.stackerLiveList2[0].stackerCurrentRack;
  //     console.log("stackerCurrentRackValue%%%%%%%%%%%%%% :: " + stackerCurrentRackValue)
  //     let stackerCurrentRowValue = this.stackerLiveList2[0].stackerCurrentRow;
  //     for (let i = 0; i < this.columns1.length; i++) {
  //       if (stackerCurrentRackValue === this.columns1[i].key) {
  //         this.columns1[i].value = stackerCurrentRackValue;
  //         this.rows1[i].value = stackerCurrentRowValue;
         
  //         break;
  //       }
  //     }
  //   }
  //   return this.stackerLiveList2.length > 0 ? this.stackerLiveList2[0].stackerCurrentRack : 1;
  // }

  getCurrentRackPosition(): number {
    if (this.stackerLiveList1.length === 0) {
      console.log("No stackers found in stackerLiveList2.");
      return 1;
    }

    const stacker = this.stackerLiveList1[0];
    const stackerCurrentRackValue = stacker.stackerCurrentRack;
    const stackerCurrentRowValue = stacker.stackerCurrentRow;

    console.log("Rack position for Stacker 2:", stackerCurrentRackValue);
    console.log("stackerCurrentRackValue%%%%%%%%%%%%%% :: " + stackerCurrentRackValue);

    // for (let i = 0; i < this.columns1.length; i++) {
    //   if (stackerCurrentRackValue === this.columns1[i].key) {
    //     this.columns1[i].value = stackerCurrentRackValue;
    //     this.rows1[i].value = stackerCurrentRowValue;
    //     break;
    //   }
    // }

      // Reset the value properties of columns1 and rows1 to zero
  for (let column of this.columns) {
    column.value = 0;
  }

  for (let row of this.rows) {
    row.value = 0;
  }

  // Update the columns and rows with the current rack and row values
  for (let i = 0; i < this.columns.length; i++) {
    if (stackerCurrentRackValue === this.columns[i].key) {
      this.columns[i].value = stackerCurrentRackValue;
      this.rows[i].value = stackerCurrentRowValue;
      break;
    }
  }

    return stackerCurrentRackValue;
  }



  getCurrentRackPosition1(): number {
    if (this.stackerLiveList2.length === 0) {
      console.log("No stackers found in stackerLiveList2.");
      return 1;
    }

    const stacker = this.stackerLiveList2[0];
    const stackerCurrentRackValue = stacker.stackerCurrentRack;
    const stackerCurrentRowValue = stacker.stackerCurrentRow;

    console.log("Rack position for Stacker 2:", stackerCurrentRackValue);
    console.log("stackerCurrentRackValue%%%%%%%%%%%%%% :: " + stackerCurrentRackValue);

    // for (let i = 0; i < this.columns1.length; i++) {
    //   if (stackerCurrentRackValue === this.columns1[i].key) {
    //     this.columns1[i].value = stackerCurrentRackValue;
    //     this.rows1[i].value = stackerCurrentRowValue;
    //     break;
    //   }
    // }

      // Reset the value properties of columns1 and rows1 to zero
  for (let column of this.columns1) {
    column.value = 0;
  }

  for (let row of this.rows1) {
    row.value = 0;
  }

  // Update the columns and rows with the current rack and row values
  for (let i = 0; i < this.columns1.length; i++) {
    if (stackerCurrentRackValue === this.columns1[i].key) {
      this.columns1[i].value = stackerCurrentRackValue;
      this.rows1[i].value = stackerCurrentRowValue;
      break;
    }
  }

    return stackerCurrentRackValue;
  }



  selectStacker(stackerName: string) {
    this.selectedStackerName = stackerName;
    localStorage.setItem('selectedStackerName', stackerName);
  }




  editSelectedIsDispatchStartActiveInActiveCheckBox(emergencyStatus: StackerLiveDataDetailsModel): void {
    this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Emergency Status Updated.', life: 3000 });
    this.stackerLiveDataDetailsService.updateEmergency(emergencyStatus).subscribe(updateIsDispatchStart => {
      // alert("Emergency Status Updated");
      this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Emergency Status Updated.', life: 3000 });
      
    }, error => {
      console.error('Error updating emergency status:', error);
    });
    this.showConfirmationDialog = false;
  }
}
