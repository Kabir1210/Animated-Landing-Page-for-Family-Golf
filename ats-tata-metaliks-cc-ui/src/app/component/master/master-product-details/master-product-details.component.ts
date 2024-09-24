import { Component, OnInit, ViewChild } from '@angular/core';
import { ImportsModule } from '../../../import';
import { MasterProductDetailsService } from '../../../services/masterProductDetails.service';
import { MasterProductDetailsModel } from '../../../model/masterProductDetails.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from '../../../services/auth.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-master-product-details',
  standalone: true,
  imports: [ImportsModule,],
  providers: [MasterProductDetailsService,MessageService,ConfirmationService,AuthenticationService],
  templateUrl: './master-product-details.component.html',
  styleUrl: './master-product-details.component.css'
})
export class MasterProductDetailsComponent implements OnInit {
  
  submitted: boolean = false;
  productDialog:boolean = false;
  showConfirmationDialog: boolean = false;
  productDetailsTableList : MasterProductDetailsModel[] = [];
  selectedProduct!: MasterProductDetailsModel;
  masterProduct!: MasterProductDetailsModel;
  addmasterProduct!: MasterProductDetailsModel;
  addProductDialog: boolean = false;
  @ViewChild('dt') dt!: Table;
  coreSizeExists: boolean = false;
  validationMessage: string = '';
  isValidated: boolean = false;
  



  constructor(private masterProductDetailsService: MasterProductDetailsService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private authService: AuthenticationService,
  ) { }


  ngOnInit(): void {


    this.fetchAllMasterProductDetails();
  }

  public fetchAllMasterProductDetails() {
    console.log("in fetchAllMasterProductDetails from update");
    this.masterProductDetailsService.fetchAllMasterProductDetails().subscribe(
      productDetailsList => {
        this.productDetailsTableList = productDetailsList;
        console.log(this.productDetailsTableList);
      }
    );
  }

  applyGlobalFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    this.dt.filterGlobal(target.value, 'contains');
  }

  public editMasterProductDetails(masterProduct: MasterProductDetailsModel) {

    console.log("222222222222222222 :: " + masterProduct.coreSize);
    //this.masterProduct  = { ...masterProduct };
    this.masterProduct = Object.assign({}, masterProduct);
    this.productDialog = true;
    
}

public submitForm() {
  // Your form submission logic here
  console.log("in submit form :: " + this.masterProduct);
  this.masterProductDetailsService.updateMasterProductDetails(this.masterProduct).subscribe(updatedproduct => {
    console.log("in submit form :: " + updatedproduct);
    this.fetchAllMasterProductDetails();

  });
  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
  this.showConfirmationDialog = false;
  this.productDialog = false;
  

}

onPalletCodeChange() {
  this.isValidated = false;
  this.validationMessage = "Please validate pallet code using the icon.";
}

// to open add product modal
openAddProductDialog() {
  this.addmasterProduct = new MasterProductDetailsModel();

  this.addProductDialog = true;
}

// to hide modal
hideDialog() {
  this.productDialog = false;
  this.submitted = false;
  this.addProductDialog = false;
 
}


// to hide  hideConformationDialog modal
hideConformationDialog() {
  
  this.showConfirmationDialog = false;
 
}


public deleteMasterProductDetails(masterProduct: MasterProductDetailsModel) {

  console.log("################ :: " + masterProduct.coreSize);
  this.confirmationService.confirm({     
      message: 'Are you sure you want to delete ' + masterProduct.coreSize + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          console.log("product.productId  :: " + masterProduct.productId);

          this.masterProductDetailsService.deleteMasterProductDetails(masterProduct.productId).subscribe(
            response => {
              console.log('Product deleted successfully', response);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
              this.productDetailsTableList = this.productDetailsTableList.filter(product => product.productId !== masterProduct.productId);
              this.confirmationService.close();
            },
            error => {
              console.error('There was an error during the deletion process', error);
            }
          );
      }
  });
}


public addMasterProductDetails(addmasterProduct: MasterProductDetailsModel) {
  this.updateCoreSizeCheck(); // Update the core size check

  if (this.coreSizeExists) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: this.validationMessage,
      life: 3000
    });
    return;
  }

  this.confirmationService.confirm({
    message: 'Are you sure you want to add ' + addmasterProduct.coreSize + '?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      addmasterProduct.productName = addmasterProduct.coreSize;
      addmasterProduct.userId = this.authService.currentUserValue.userId;
      addmasterProduct.userName = this.authService.currentUserValue.userName;

      this.masterProductDetailsService.addMasterProductDetails(addmasterProduct).subscribe(
        addproduct => {
          this.fetchAllMasterProductDetails();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Added Successfully',
            life: 3000
          });
          this.addProductDialog = false;
          this.confirmationService.close();
        },
        error => {
          console.error('There was an error during the addition process', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add the product. Please try again.',
            life: 3000
          });
          
          
        }
      );
    }
  });
}



updateCoreSizeCheck() {
  const existingProduct = this.productDetailsTableList.find(product => product.coreSize === this.addmasterProduct.coreSize);
  if (existingProduct) {
    this.validationMessage = `Product with Core Size "${existingProduct.coreSize}" already exists.`;
    this.coreSizeExists = true;
  } else {
    this.coreSizeExists = false;
    this.validationMessage = '';
  }
}


}
