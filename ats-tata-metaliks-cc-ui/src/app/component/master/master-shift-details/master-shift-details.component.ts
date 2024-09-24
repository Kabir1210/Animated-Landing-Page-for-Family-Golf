
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { MasterShiftDetailsService } from '../../../services/masterShiftDetails.service';
import { MasterShiftDetailsModel } from '../../../model/masterShiftDetails.model';
import { AuthenticationService } from '../../../services/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ImportsModule } from '../../../import';



@Component({
  selector: 'app-master-shift-details',
  templateUrl: './master-shift-details.component.html',
  styleUrls: ['./master-shift-details.component.css'],
  standalone: true,
  imports: [ImportsModule],
  providers: [MasterShiftDetailsService, MessageService,ConfirmationService],
  animations: [
    trigger('simpleAnimation', [
      state('start', style({
        opacity: 1
      })),
      state('end', style({
        opacity: 0
      })),
      transition('start => end', [
        animate('1s')
      ]),
      transition('end => start', [
        animate('1s')
      ])
    ])
  ]
})

export class MasterShiftDetailsComponent implements OnInit {

  deleteShiftDetailsByShiftId!: number;
  deleteShiftDetailsShiftName!: string;
  
  addmasterShift!: MasterShiftDetailsModel;
  addShiftDialog: boolean = false;

  selectedShiftName!: string;
  checkShiftDataExist!: boolean
  // productDialog: boolean = false;

  submitted: boolean = false;

  showConfirmationDialog: boolean = false;

  masterShift!: MasterShiftDetailsModel;

  products!: MasterShiftDetailsModel[];

  productDialog:boolean = false;
  

  @ViewChild('dt') dt!: Table;
  
  statuses!: any[];

  shiftDetailsTableList: MasterShiftDetailsModel[] = [];

  //editShiftDetailsForSelectedIdInstance: MasterShiftDetailsModel = new MasterShiftDetailsModel();

  tableHeaders: any[] = [
    { field: 'shiftId', header: 'Shift ID' },
    { field: 'shiftNumber', header: 'Shift Number' },
    { field: 'shiftname', header: 'Shift Name' },
    { field: 'shiftDesc', header: 'Shift Description' },
    { field: 'shiftStartTime', header: 'Shift Start Time' },
    { field: 'shiftEndTime', header: 'Shift End Time' },
    { field: 'cDateTime', header: 'Created Date Time' },
    { field: 'userId', header: 'User Id' },
    { field: 'userName', header: 'User Name' },
    { field: 'shiftIsDeleted', header: 'Shift Is Deleted' }
  ];


  constructor(private masterShiftDetailsService: MasterShiftDetailsService, private authService: AuthenticationService,  
    private messageService: MessageService,private confirmationService: ConfirmationService ) { }

  ngOnInit(): void {
     this.fetchAllMasterShiftDetails();

  }

  public fetchAllMasterShiftDetails() {

    this.masterShiftDetailsService.fetchShiftDetails().subscribe(
      shiftDetailsList => {
        this.shiftDetailsTableList = shiftDetailsList;
        console.log(this.shiftDetailsTableList);
        
       
      }
    );
  }
  

  applyGlobalFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    this.dt.filterGlobal(target.value, 'contains');
  }

  
  public editMasterShiftDetails(masterShift: MasterShiftDetailsModel) {

    console.log("222222222222222222 :: " + masterShift.shiftName);
    //this.masterProduct  = { ...masterProduct };
    this.masterShift = Object.assign({}, masterShift);
    this.productDialog = true;
    
}

public submitForm() {
  // Your form submission logic here
  console.log("in submit form :: " + this.masterShift);
  this.masterShiftDetailsService.updateShiftDetails(this.masterShift).subscribe(updatedshift => {
    console.log("in submit form :: " + updatedshift);
    this.fetchAllMasterShiftDetails();

  });
  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
  this.showConfirmationDialog = false;
  this.productDialog = false;
  

}


hideDialog() {
  this.productDialog = false;
  this.submitted = false;
  this.addShiftDialog = false;
}




public deleteMasterShiftDetails(masterShift: MasterShiftDetailsModel) {

  console.log("################ :: " + masterShift.shiftName);
  this.confirmationService.confirm({     
      message: 'Are you sure you want to delete ' + masterShift.shiftName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          console.log("masterShift.shiftId  :: " + masterShift.shiftId);

          this.masterShiftDetailsService.deleteShiftDetails(masterShift.shiftId).subscribe(
            response => {
              console.log('Product deleted successfully', response);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
              this.shiftDetailsTableList = this.shiftDetailsTableList.filter(product => product.shiftId !== masterShift.shiftId);
              this.confirmationService.close();
            },
            error => {
              // console.error('There was an error during the deletion process', error);
              this.messageService.add({ severity: 'error', summary: 'error', detail: 'There was an error during the deletion process', life: 3000 });
            }
          );
      }
  });
}



openAddProductDialog() {
  this.addmasterShift = new MasterShiftDetailsModel();

  this.addShiftDialog = true;
}


public addMasterProductDetails(addmasterShift : MasterShiftDetailsModel){ 

  this.confirmationService.confirm({
    message: 'Are you sure you want to add ' + this.addmasterShift.shiftId + '?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.addmasterShift.shiftName = this.addmasterShift.shiftName;
      this.addmasterShift.userId = this.authService.currentUserValue.userId;
      this.addmasterShift.userName = this.authService.currentUserValue.userName;
      this.masterShiftDetailsService.addMasterShiftDetails(this.addmasterShift).subscribe(
        addproduct => {
          this.fetchAllMasterShiftDetails();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Added', life: 3000 });
          this.addShiftDialog = false;
          this.confirmationService.close();
        },
        error => {
          // console.error('There was an error during the deletion process', error);
          this.messageService.add({ severity: 'error', summary: 'error', detail: 'There was an error during the deletion process', life: 3000 });
        }
      );
    
    }
  })
}




}
