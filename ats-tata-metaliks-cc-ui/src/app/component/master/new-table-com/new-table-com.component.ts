import { Component, NgModule, OnInit, ViewChild, inject } from '@angular/core';
import { MasterComponent } from '../master.component';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Product } from '../../../model/product.model';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/productDetails.service';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import {ButtonModule} from 'primeng/button';






@Component({
  selector: 'app-new-table-com',
  standalone: true,
  imports: [MasterComponent,TableModule, CommonModule,FormsModule ,ButtonModule, InputIconModule, IconFieldModule],
  providers: [ProductService],
  templateUrl: './new-table-com.component.html',
  styleUrl: './new-table-com.component.css'
})




export class NewTableComComponent implements OnInit{

  @ViewChild('dt') dt!: Table;

  product!: Product;

  submitted: boolean = false;

  productDialog: boolean = false;
onEdit($event: Event) {
throw new Error('Method not implemented.');
}

  private productService = inject(ProductService);
 

  prodtclistOneeeeeeeeeee: Product[] = [];
  // submitted: boolean = false;

  Medication: any[] = [];
  tableHeaders: any[] = [
    { field: 'data1', header: 'Data 1' },
    { field: 'data2', header: 'Data 2' },
    { field: 'data3', header: 'Data 3' },
    { field: 'data4', header: 'Data 4' }
  ];

  tableHeaders1: any[] = [
    { field: 'id', header: 'ID' },
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name' },
    { field: 'price', header: 'Price' }
  ];
  
  constructor(){}

  ngOnInit(): void {


    this.fetchAllMasterShiftDetails();
    this.createData();

   // this.productService.getProducts().then((data) => (this.products = data));
    throw new Error('Method not implemented.');
  }


  createData(): void {
    for(let i = 0; i < 10; i++) {
      this.Medication.push({data1: `Data 1 - ${i}`, data2: `Data 2 - ${i}`, data3: `Data 3 - ${i}`, data4: `Data 4 - ${i}`});
    }
    console.log(this.Medication);
  }

  
//   products: Product[] = [
//     { code: 'A001', name: 'Product A', price: 100 },
//     { code: 'B002', name: 'Product B', price: 150 },
//     { code: 'C003', name: 'Product C', price: 200 }
// ];



// console.log("products :: " + this.products);

selectedProducts: Product[] = [];




public fetchAllMasterShiftDetails() {
  this.productService.getProducts().then(productList => {
    this.prodtclistOneeeeeeeeeee = productList;
    console.log("prodtclistOneeeeeeeeeee :: " + JSON.stringify(this.prodtclistOneeeeeeeeeee))
    
    // add this code with table id to convert data as Datatable
  }).catch(err => {
    console.error('Error fetching product list:', err);
  });
}

// getAll(){
//   this.productService.
// }


onRowEditInit(product: Product) {
    // Logic when row edit is initiated
}

onRowEditSave(product: Product) {
    // Logic when row edit is saved
}

onRowEditCancel(product: Product, rowIndex: number) {
    // Logic when row edit is canceled, for example, revert changes if needed
}

openNew() {
  this.product = {};
  this.submitted = false;
  this.productDialog = true;
}

applyGlobalFilter(event: Event) {
  const target = event.target as HTMLInputElement;
  this.dt.filterGlobal(target.value, 'contains');
}






}










