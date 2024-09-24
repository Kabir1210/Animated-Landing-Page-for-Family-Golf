import { Component, ViewChild, inject } from '@angular/core';
import { ImportsModule } from '../../../import';
import { DispatchOrderDeatilsService } from '../../../services/dispatchOrderDeatils.service';
import { HttpClient } from '@angular/common/http';
import { DispatchOrderDetailsModel } from '../../../model/dispatchOrderDetailsModel.model';
import { MasterProductDetailsService } from '../../../services/masterProductDetails.service';
import { MasterProductDetailsModel } from '../../../model/masterProductDetails.model';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from '../../../services/auth.service';


@Component({
  selector: 'app-generate-manule-retrievel-order',
  standalone: true,
  imports: [ImportsModule,],
  providers: [DispatchOrderDeatilsService, MasterProductDetailsService,
    MessageService, ConfirmationService, AuthenticationService],
  templateUrl: './generate-manule-retrievel-order.component.html',
  styleUrl: './generate-manule-retrievel-order.component.css'
})
export class GenerateManuleRetrievelOrderComponent {
  quantity!: number;
  dispatchOrderDetailsId!: number;
  transferOrderNo!: number;
  descriptionOfCore!: string;
  coreSize!: string;
  destination!: string;
  dispatchStatus!:string;
  addDispatchOrder!: DispatchOrderDetailsModel;
  addDispatchDialog: boolean = false;
  generateManualOrderDetailsTableList:DispatchOrderDetailsModel[] = [];
  generateManualRetrievalList: DispatchOrderDetailsModel[] = [];
  masterProductDetailsList: MasterProductDetailsModel[] = [];
  dispatchScheduleCdatetimeStart!: string;
  dispatchScheduleCdatetimeEnd!: string;
  disableSearchButton: boolean = false;
  disableDateTime: boolean = true;
  selectedCoreSize!: string;
  selectedDispatchStatus!:string;
  selectedDestination!: string;
  addSingleDispatchDetails!: string;
  updateQuantity: number = 0;
  newPlannedQuantity!: number;
  showFilters = false;
  CoreSizeList: any[] = [];
  DestinationList: any[] = ['CCM-6', 'CCM-7', 'CCM-8', 'CCM-9', 'CCM-10', 'REWORK']
  dispatchStatusList:any[]=['IN_PROGRESS','READY','HOLD','COMPLETED']
  masterProductDetails: MasterProductDetailsModel[] = [];
  CoreSizeListProduct: any[] = [];
  @ViewChild('dt') dt!: Table;
  selectedCoreDescription: any;
  constructor(private dispatchOrderDeatilsService: DispatchOrderDeatilsService,
    private masterProductDetailsService: MasterProductDetailsService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private authService: AuthenticationService,
    private masterproductDetailsService: MasterProductDetailsService,
  ) { }

  ngOnInit(): void {

    this.fetchAllManualRetrivalOrderDetailsCurrentDate();
    this.fetchAllMasterProductDetails();
    this.fetchAllMasterProducts();
  }

  hideDialog() {
    this.addDispatchDialog = false;
    //this.submitted = false;

  }
  openAddOrderDialog() {
    this.addDispatchOrder = new DispatchOrderDetailsModel();

    this.addDispatchDialog = true;
  }

  //find All data
  fetchAllGenerateManualRetrievalOrder() {
    this.dispatchOrderDeatilsService.findAllGenerateManualRetrievalOrder().subscribe(
      data => {
        this.generateManualRetrievalList = data;
        console.log("generateManualRetrievalList :: " + this.generateManualRetrievalList.length);
        console.log("generateManualRetrievalList :: " + JSON.stringify(this.generateManualRetrievalList));
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  //Find all current data fetch
  fetchAllManualRetrivalOrderDetailsCurrentDate() {
    this.disableDateTime = true;
    this.disableSearchButton = false;
    this.dispatchOrderDeatilsService.fetchAllManualRetrivalOrderDetailsByCurrentDate().subscribe(
      manualDetailsList => {
        this.generateManualRetrievalList = manualDetailsList;
      }
    )
  }

  //fetch all master product
  fetchAllMasterProductDetails() {
    this.masterProductDetailsService.fetchAllMasterProductDetails().subscribe(
      data => {
        this.masterProductDetailsList = data;
      }

    );
  }

  applyGlobalFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    this.dt.filterGlobal(target.value, 'contains');
  }




  public addpalletQuantity(dispatchOrderDetailsModelobject: DispatchOrderDetailsModel) {
    dispatchOrderDetailsModelobject.totalQuantity = this.updateQuantity;

    // addQuantityForSelectedIdInstance
    console.log("updateQuantity1 :: " + this.updateQuantity);
    console.log("dispatchOrderDetailsModelobject :: " + dispatchOrderDetailsModelobject.totalQuantity);
    this.dispatchOrderDeatilsService.addPalletQuantity(dispatchOrderDetailsModelobject).subscribe(
      dispatchOrderList => {
        this.fetchAllManualRetrivalOrderDetailsCurrentDate();

        if (dispatchOrderList.status == 200) {
          alert("Pallet Quantity Added Successfully");
        }
        else {
          alert('Pallet Quantity Not Added');
        }


      }
    )

  }

  //start and stop function
  editSelectedIsDispatchStartActiveInActiveCheckBox(dispatchOrderDetailsModelObject: DispatchOrderDetailsModel) {

    if (dispatchOrderDetailsModelObject.isDispatchStart == 1) {
      dispatchOrderDetailsModelObject.isDispatchStart = 0;
      this.dispatchOrderDeatilsService.updateGenerateManualRetrivalIsDispatchStart(dispatchOrderDetailsModelObject).subscribe(updateIsDispatchStart => {

      })
    }
    else {
      dispatchOrderDetailsModelObject.isDispatchStart = 1;
      this.dispatchOrderDeatilsService.updateGenerateManualRetrivalIsDispatchStart(dispatchOrderDetailsModelObject).subscribe(updateIsDispatchStart => {

      })

    }
  }


  public fetchGenerateManualRetrivalOrderDetailsByAllFilters() {
    this.resetData();

    



   
    this.dispatchOrderDeatilsService.fetchGenerateManualRetrivalOrderDetailsByAllFilters(this.dispatchScheduleCdatetimeStart,
      this.dispatchScheduleCdatetimeEnd, this.selectedCoreSize, this.selectedDestination,this.selectedDispatchStatus
    ).subscribe(
      manualDetailsFilter => {
        this.generateManualRetrievalList = manualDetailsFilter;
        if (this.generateManualRetrievalList == null || this.generateManualRetrievalList.length == 0) {
          console.log("no data found")
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'No Data Found' });

        }
        // console.log("this.coreSize:"+this.coreSize);
        // console.log("selectedDestination:"+this.selectedDestination);
        // console.log("dispatchScheduleCdatetimeStart:"+this.dispatchScheduleCdatetimeStart);
        // console.log("dispatchScheduleCdatetimeEnd:"+this.dispatchScheduleCdatetimeEnd);

      },
      error => {
        console.error('Error:', error);
      }
    );
  }


  public selectCoreSizeChangeHandler(value: string) {
    this.coreSize = value;
  }
  public selectDestinationChangeHandler(value: string) {
    this.destination = value;
  }

  public selectDispatchStatusChangeHandler(value: string) {
    this.  dispatchStatus  = value;
  }

  public addGenerateRetrivalManualDetails(addDispatchOrder: DispatchOrderDetailsModel) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to add ' + this.addDispatchOrder.transferOrderNo + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.addDispatchOrder.transferOrderNo = this.addDispatchOrder.transferOrderNo;
        this.addDispatchOrder.coreSize = this.selectedCoreSize;

        this.addDispatchOrder.destination = this.selectedDestination;
        this.addDispatchOrder.descriptionOfCore = this.addDispatchOrder.descriptionOfCore;

        this.addDispatchOrder.plannedQuantity = this.quantity;
        this.addDispatchOrder.totalQuantity = this.quantity;
     
        this.addDispatchOrder.userId = this.authService.currentUserValue.userId;
        this.addDispatchOrder.userName = this.authService.currentUserValue.userName;
        this.dispatchOrderDeatilsService.addGenerateRetrivalManualDetails(this.addDispatchOrder).subscribe(
          addDispatch => {
            this.fetchAllMasterProductDetails();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Added', life: 3000 });
            this.addDispatchDialog = false;
            this.confirmationService.close();
          },
          error => {
            console.error('There was an error during the deletion process', error);
          }
        );

      }
    })
  }




  // fetchAllMasterProducts() {

  //   this.masterproductDetailsService.fetchAllMasterProductDetails().subscribe(
  //     data => {

  //       this.masterProductDetails = data;
  //       console.log("this.masterProductDetails");
  //       console.log(this.masterProductDetails);

  //       this.CoreSizeListProduct = this.masterProductDetails.map(product => (product.coreSize));

  //       console.log("this.CoreSizeListProduct");
  //       console.log(this.CoreSizeListProduct);

  //     },
  //   )
  // }
  fetchAllMasterProducts() {
    this.masterproductDetailsService.fetchAllMasterProductDetails().subscribe(
      data => {
        this.masterProductDetails = data;
        this.CoreSizeListProduct = this.masterProductDetails.map(product => ({ label: product.coreSize, value: product.coreSize }));
      },
      error => {
        console.error('Error fetching master product details', error);
      }
    );
  }

  addSelectedProductDesc() {
    const selectedProduct = this.masterProductDetails.find(item => item.coreSize === this.selectedCoreSize);
    if (selectedProduct) {
      this.selectedCoreDescription = selectedProduct.productDesc;
    } else {
      this.selectedCoreDescription = '';
    }
  }

  resetFilters() {

    this.fetchAllManualRetrivalOrderDetailsCurrentDate();
  }


  resetData() {

    if (this.dispatchScheduleCdatetimeStart == undefined || this.dispatchScheduleCdatetimeStart == null) {
      this.dispatchScheduleCdatetimeStart = "NA";
    }
    if (this.dispatchScheduleCdatetimeEnd == undefined || this.dispatchScheduleCdatetimeEnd == null) {
      this.dispatchScheduleCdatetimeEnd = "NA";
    }

    if (this.selectedCoreSize == undefined || this.selectedCoreSize == null || this.selectedCoreSize.trim() == "") {
      this.selectedCoreSize = "NA";
    }
    if (this.selectedDestination == undefined || this.selectedDestination == null || this.selectedDestination.trim() == "") {
      this.selectedDestination = "NA";
    }
   
    if (this.selectedDispatchStatus == undefined || this.selectedDispatchStatus == null || this.selectedDispatchStatus.trim() == "") {
      this.selectedDispatchStatus = "NA";
    }
  }


  public dateTimeValidation() {
    if (this.dispatchScheduleCdatetimeStart != null && this.dispatchScheduleCdatetimeEnd != null) {
      if (this.dispatchScheduleCdatetimeStart <= this.dispatchScheduleCdatetimeEnd) {
        this.disableSearchButton = false;
      } else {
        this.disableSearchButton = true;
      }
    } else {
      this.disableSearchButton = false;
    }
  }



  
  public deleteDispatchOrderRow(deleteDispatchOrder: DispatchOrderDetailsModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + deleteDispatchOrder.transferOrderNo + '?',
         header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
      this.dispatchOrderDeatilsService.updateOrderDetailsIsDeleted(deleteDispatchOrder.dispatchOrderDetailsId).subscribe(
        deleteOrderDetails => {
          
               this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
               this.generateManualOrderDetailsTableList = this.generateManualOrderDetailsTableList.filter(user => this.dispatchOrderDetailsId !== deleteDispatchOrder.dispatchOrderDetailsId);
            this.fetchAllManualRetrivalOrderDetailsCurrentDate();
            this.confirmationService.close();
  
  
        },
        error => {
                     console.error('There was an error during the deletion process', error);
                   }
        
      );}
    })

  }
 
 

}
