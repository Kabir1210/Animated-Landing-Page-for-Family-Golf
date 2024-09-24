import { Component, OnInit } from '@angular/core';
import { ImportsModule } from '../../../import';
import { MasterEquipmentDetailsModel } from '../../../model/masterEquipmentDetails.model';
import { MasterEquipmentDetailsService } from '../../../services/masterEquipmentDetails.service';
import { AuthenticationService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-location',
  standalone: true,
  imports: [ImportsModule],
  providers: [MessageService],
  templateUrl: './manage-location.component.html',
  styleUrls: ['./manage-location.component.css']
})
export class ManageLocationComponent implements OnInit {

  masterEquipmentDetailsList: MasterEquipmentDetailsModel[] = [];
  stacker1DataList: MasterEquipmentDetailsModel[] = [];
  stacker2DataList: MasterEquipmentDetailsModel[] = [];
  checked12345: boolean = true;
  checked: number = 1;
  equipmentIsActive!: number;
  isEquipmentActive!: boolean;

  constructor(
    private masterEquipmentDetailsService: MasterEquipmentDetailsService, 
    private authenticationService: AuthenticationService, 
    private messageService: MessageService
  ) {
    this.isEquipmentActive = this.equipmentIsActive === 1;
  }

  ngOnInit(): void {
    this.fetchAllMasterEquipmentDetails();
  }

  fetchAllMasterEquipmentDetails() {
    this.masterEquipmentDetailsService.fetchMasterEquipmentDetails().subscribe(equipmentDetailsList => {
      this.masterEquipmentDetailsList = equipmentDetailsList;
    });
  }

  toggleEquipmentActiveInactive(data: any) {
    const previousState = data.equipmentIsActive;
    data.equipmentIsActive = data.equipmentIsActive === 1 ? 0 : 1;

    this.updateEquipment(data);

    const severity = data.equipmentIsActive === 1 ? 'success' : 'error';
    const messageDetail = data.equipmentIsActive === 1
      ? `Equipment "${data.equipmentName}" Turned On `
      : `Equipment "${data.equipmentName}" Turned Off `;

    this.messageService.add({
      severity: severity,
      summary: 'Status Update',
      detail: messageDetail,
      life: 3000
    });
  }

  updateEquipment(equipment: MasterEquipmentDetailsModel) {
    const userLoginDetails = this.authenticationService;
    equipment.userId = userLoginDetails.currentUserValue.userId;

    this.masterEquipmentDetailsService.updateAllMasterEquipmentDetailsS1S2(equipment).subscribe({
      next: () => {
        this.fetchAllMasterEquipmentDetails();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Update Failed',
          detail: `Failed to update "${equipment.equipmentName}". Please try again.`,
          life: 3000
        });
      }
    });
  }

  setValue(value: number) {
    alert(value);
    this.checked12345 = value === 1 ? true : false;
  }
}
