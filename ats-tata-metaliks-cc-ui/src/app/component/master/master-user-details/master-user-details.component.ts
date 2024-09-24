
import { MasterUserDetailsModel } from '../../../model/masterUserDetails.model';
import { MasterUserDetailsService } from '../../../services/masterUserDetails.service';

import { ImportsModule } from '../../../import';
import { MasterRoleDetailsModel } from '../../../model/masterRoleDetails.model';
import { MasterRoleDetailsService } from '../../../services/masterRoleDetails.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from '../../../services/auth.service';
import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { FormControl, Validators } from '@angular/forms';




@Component({
  selector: 'app-master-user-details',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './master-user-details.component.html',
  styleUrl: './master-user-details.component.css',
  providers: [MessageService, ConfirmationService,
    MasterUserDetailsService, MasterRoleDetailsService, AuthenticationService]
})
export class MasterUserDetailsComponent {


  masterUser!: MasterUserDetailsModel;
  addMasterUser!: MasterUserDetailsModel;
  masterUserDetailsTableList: MasterUserDetailsModel[] = [];
  userRoleListFromRoleDetails: MasterRoleDetailsModel[] = [];
  addUserDetailsInstance: MasterUserDetailsModel = new MasterUserDetailsModel();
  deleteUserDetailsInstance: MasterUserDetailsModel = new MasterUserDetailsModel();
  editUserDetailsInstance: MasterUserDetailsModel = new MasterUserDetailsModel();
  selectedEditUserRole!: string;
  selectedEditImageFile: any;
  selectedAddImageFile: any;
  base64code!: any;
  editImageSrc!: string | ArrayBuffer | null;
  imageSrc!: string | ArrayBuffer | null;
  submitted: boolean = false;
  userDialog: boolean = false;
  showConfirmationDialog: boolean = false;
  userId!: number;
  addUserDialog: boolean = false;
  @ViewChild('dt') dt!: Table;
  statuses: any[] = ['OPERATOR', 'ADMIN', 'SUPERVISOR'];
  title:any[]=['Ms','Mr']
  personalIdControl = new FormControl('', [Validators.required]);
  personalIdExists = false;


  constructor(
    private masterUserDetailsService: MasterUserDetailsService,
    private masterRoleDetailsService: MasterRoleDetailsService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.fetchAllMasterUserDetails();
    this.addUserButtonClickAndFetchRoleDetails();

  }
  

  //enter the only number 
  validateNumber(event: KeyboardEvent) {
    const charCode = event.charCode ? event.charCode : event.keyCode;
    if (charCode < 48 || charCode > 57) {
        event.preventDefault();
    }
}
  
  public fetchAllMasterUserDetails() {
    this.masterUserDetailsService.fetchAllMasterUserDetails().subscribe(userDetailsList => {
      this.masterUserDetailsTableList = userDetailsList;
      
    });
  }
  applyGlobalFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    this.dt.filterGlobal(target.value, 'contains');
  }
  //add the user 
  public addMasterUserDetails(addMasterUser: MasterUserDetailsModel) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to add ' + this.addMasterUser.firstName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.addMasterUser.userTitle = this.addMasterUser.userTitle;
        this.addMasterUser.firstName = this.addMasterUser.firstName;
        this.addMasterUser.lastName = this.addMasterUser.lastName;
        this.addMasterUser.userName = this.addMasterUser.userName;
        this.addMasterUser.userPassword = this.addMasterUser.userPassword;
        this.addMasterUser.contactNumber = this.addMasterUser.contactNumber;
        this.addMasterUser.emailId = this.addMasterUser.emailId;
        this.addMasterUser.userIsDeleted = 0;
        this.addMasterUser.roleName = this.addMasterUser.roleName;
        this.imageSrc = this.addMasterUser.userPhotoImageIn64Base;
        this.masterUserDetailsService.addMasterUserDetails(this.addMasterUser, this.selectedAddImageFile).subscribe(
          addUser => {
            this.fetchAllMasterUserDetails();
   
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Added', life: 3000 });
        
            this.addUserDialog = false;
            this.confirmationService.close();
          },
          error => {
            console.error('There was an error during the add data process', error);
          }
        );

       
        this.imageSrc = null;
      }
    })
  }



  addUserButtonClickAndFetchRoleDetails() {
    this.masterRoleDetailsService.fetchAllMasterRoleDetails().subscribe(data => {
      this.userRoleListFromRoleDetails = data;
    });
  }

  

  

  selectedUserRoleEventChange(value: string) {
    this.selectedEditUserRole = '';
    this.selectedEditUserRole = value;
  }

  



  // to open add product modal
  openAddUserDialog() {
    this.addMasterUser = new MasterUserDetailsModel();

    this.addUserDialog = true;
  }
  hideDialog() {
    this.userDialog = false;
    this.submitted = false;

  }
  hideConformationDialog() {

    this.showConfirmationDialog = false;

  }

 
  public deleteMasterUserDetailsRow(deleteUserDetailsRowInstance: MasterUserDetailsModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + deleteUserDetailsRowInstance.firstName + '?',
         header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
      this.masterUserDetailsService.deleteUserDetails(deleteUserDetailsRowInstance.userId).subscribe(
        deleteUserDetails => {
          
               this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
               this.masterUserDetailsTableList = this.masterUserDetailsTableList.filter(user => this.userId !== deleteUserDetailsRowInstance.userId);
            this.fetchAllMasterUserDetails();
            this.confirmationService.close();
  
  
        },
        error => {
                     console.error('There was an error during the deletion process', error);
                   }
        
      );}
    })

  }
 

  public editMasterUserDetails(editUserDetailsRowInstance: MasterUserDetailsModel) {
    
    this.userDialog = true;
    this.editUserDetailsInstance = Object.assign({}, editUserDetailsRowInstance);
    this.selectedEditUserRole = this.editUserDetailsInstance.roleName;
    this.editImageSrc = this.editUserDetailsInstance.userPhotoImageIn64Base;
    this.selectedEditImageFile = this.editUserDetailsInstance.userPhotoImageIn64Base;
  }

  public submitForm() {
    // Your form submission logic here
   
    this.masterUserDetailsService.updateMasterUserDetails(this.editUserDetailsInstance.userId, this.editUserDetailsInstance, this.selectedEditImageFile).subscribe(updatedUser => {
      
      this.fetchAllMasterUserDetails();

    });
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
    this.showConfirmationDialog = false;
    this.userDialog = false;

  }


  userAddFileSelected(eventData: any) {
    const element = eventData.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedAddImageFile = fileList[0];
    }

    if (eventData.target.files && eventData.target.files[0]) {
      const file = eventData.target.files[0];
      const addImageReader = new FileReader();
      addImageReader.onload = e => (this.imageSrc = addImageReader.result);
      addImageReader.readAsDataURL(file);
    }
  }

  userEditFileSelected(editEventData: any) {
    
    const element = editEventData.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedEditImageFile = fileList[0];
    }

    if (editEventData.target.files && editEventData.target.files[0]) {
      const editFile = editEventData.target.files[0];
      const editImageReader = new FileReader();
      editImageReader.onload = e => (this.editImageSrc = editImageReader.result);
      editImageReader.readAsDataURL(editFile);
    }
  }

}




