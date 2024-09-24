import { Component, inject } from '@angular/core';
import { EquipmentAlarmHistoryDetailsModel } from '../../../model/equipmentAlarmHistoryDetails.model';

import { HttpClient } from '@angular/common/http';
import { ImportsModule } from '../../../import';
import { EquipmentlAarmHistoryDetailsService } from '../../../services/equipmentAlarmHistoryDetails.service';


@Component({
  selector: 'app-stacker-live-faults',
  standalone: true,
  imports: [ImportsModule],
  providers: [EquipmentlAarmHistoryDetailsService],
  templateUrl: './stacker-live-faults.component.html',
  styleUrl: './stacker-live-faults.component.css'
})
export class StackerLiveFaultsComponent {
  private http = inject(HttpClient);


  tableHeaders1: any[] = [
    { field: 'equipmentName', header: 'equipmentName' },
    { field: 'equipmentAlarmOccurredDatetime', header: 'equipmentAlarmOccurredDatetime' },
   
  ];


  wmsEquipmentAlarmHistoryId?:number;
    equipmentId?:number;
    equipmentName?:string;
    equipmentDesc?:string;
    equipmentAlarmId?:number;
    equipmentAlarmName?:string;
    equipmentAlarmDesc?:string;
    equipmentAlarmOccurredDateTime?:string;
    equipmentAlarmResolvedDatetime?:string;
    equipmentAlarmStatus?:string;




  stackerAlarmDetailsList: EquipmentAlarmHistoryDetailsModel[] = [];
  stackerNameList: string[] = [];
  equipmentFirstAlarmHistoryDetailsTableList: EquipmentAlarmHistoryDetailsModel[] = [];
   stacker1AlarmCount!: number;
   stacker2AlarmCount!: number;

  constructor(private equipmentAlarmHistoryDetailsService: EquipmentlAarmHistoryDetailsService) {}

  ngOnInit(): void {
    this.fetchDataByResolveDateList();
  
    //this.fetchAllByCurrentDate();

    
  }

//   fetchAllEquipmentAlarmHistoryTable1(): void {
//     this.equipmentAlarmHistoryDetailsService.findAllEquipmentByAlarmOccuredAndResolvedDateIsNull().subscribe(
//       (stackerAlarmDetailsList: EquipmentAlarmHistoryDetailsModel[]) => {
//         // Fetch all Equipment names
//         this.stackerNameList = stackerAlarmDetailsList
//           .map((equipmentNameData: EquipmentAlarmHistoryDetailsModel) => equipmentNameData.equipmentName)
//           .filter((name): name is string => name !== undefined);

//         // Fetch first Equipment wise alarm occurred data and resolved date is null
//         this.equipmentFirstAlarmHistoryDetailsTableList = stackerAlarmDetailsList.filter(
//           (equipmentData: EquipmentAlarmHistoryDetailsModel) => equipmentData.equipmentName === this.stackerNameList[0]
//         );
//       }
//     );
//   }
// }


getRowClass(rowData: any) {
  return rowData['equipmentName'] === 'Conveyor' ? 'conveyor-row' : '';
}


public fetchDataByResolveDateList() {

  this.equipmentAlarmHistoryDetailsService.findResolveDateEmptyList().subscribe(equipmentIdList => {
    //console.log("equipmnetId1 data::"+ this.equipment1IdList)

    this.equipmentFirstAlarmHistoryDetailsTableList = equipmentIdList;
    this.stacker1AlarmCount=this.equipmentFirstAlarmHistoryDetailsTableList.length;
    console.log("equipmentFirstAlarmHistoryDetailsTableList :: " +  this.equipmentFirstAlarmHistoryDetailsTableList);
    console.log("stacker1AlarmCount :: " +  this.stacker1AlarmCount);
  })
 

}

public fetchAllByCurrentDate(){
  this.equipmentAlarmHistoryDetailsService.fetchAllByCurrentDate().subscribe(equipmentCurrentList => {
    this.equipmentFirstAlarmHistoryDetailsTableList = equipmentCurrentList;
    console.log("equipmentFirstAlarmHistoryDetailsTableList :: " +  this.equipmentFirstAlarmHistoryDetailsTableList);

  })
 
}
}









  