import { Component, OnInit, ViewChild } from '@angular/core';
import { ImportsModule } from '../../../import';
import { MasterEquipmentDetailsService } from '../../../services/masterEquipmentDetails.service';
import { MasterEquipmentDetailsModel } from '../../../model/masterEquipmentDetails.model';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-ccm-buffer-details',
  standalone: true,
  imports: [ImportsModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './ccm-buffer-details.component.html',
  styleUrl: './ccm-buffer-details.component.css'
})
export class CcmBufferDetailsComponent implements OnInit {

  @ViewChild('dt') dt!: Table;

  masterEquipmentDetailsList : MasterEquipmentDetailsModel[] = [];
  bufferDetailsList : MasterEquipmentDetailsModel[] = [];

  constructor(
    private masterEquipmentDetailsService: MasterEquipmentDetailsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService

  ) { }


  ngOnInit(): void {

    this.fetchAllCcmBufferDetails();
 
  }

  applyGlobalFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    this.dt.filterGlobal(target.value, 'contains');
  }

  fetchAllCcmBufferDetails() {
    this.masterEquipmentDetailsService.fetchAllEquipmentDetails().subscribe(data => {
      this.masterEquipmentDetailsList = data;

      console.log("this.masterEquipmentDetailsList :: " + this.masterEquipmentDetailsList);

      this.bufferDetailsList = this.masterEquipmentDetailsList.slice(6, 11);

      console.log("this.bufferDetailsList :: " +JSON.stringify(this.bufferDetailsList));
      console.log(this.bufferDetailsList);
    })
  }


  onRowEditInit(equipment: any) {
    // You can clone the original data here if needed
    equipment.originalBufferCount = equipment.bufferCount;
}

onRowEditSave(equipment: any) {
    // Here you can call your backend API to update the data

    console.log("equipment 1 :: " + equipment.equipmentId);

    this.confirmationService.confirm({     
      message: 'Are you sure you want to update the buffer count ' + equipment.bufferCount + ' for ' + equipment.equipmentName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          console.log("equipment.equipmentId  :: " + equipment.equipmentId);

          this.masterEquipmentDetailsService.updateAllMasterEquipmentDetails(equipment).subscribe(
            response => {
              console.log('buffer Count successfully', response);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Buffer Count Updated', life: 3000 });
              this.bufferDetailsList = this.bufferDetailsList.filter(buffer => buffer.equipmentId == buffer.equipmentId);
              
            },
            error => {
              console.error('There was an error during the deletion process', error);
            }
          );
      }
  });


    // this.masterEquipmentDetailsService.updateAllMasterEquipmentDetails(equipment).subscribe(data => {

    //   console.log(data);
    // })
    // if (equipment.bufferCount >= 0) {
    //     delete equipment.originalBufferCount;
    //     // Call your service to update the data, for example:
    //     // this.yourService.updateEquipment(equipment).subscribe();
    // }
    // else {
    //     // If validation fails, you can revert the changes here
    //     equipment.bufferCount = equipment.originalBufferCount;
    //     delete equipment.originalBufferCount;
    // }
}

onRowEditCancel(equipment: any, index: number) {
    // If the user cancels the edit, revert the changes
    equipment.bufferCount = equipment.originalBufferCount;
    delete equipment.originalBufferCount;
}

}
