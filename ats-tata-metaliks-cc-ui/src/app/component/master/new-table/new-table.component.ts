// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-new-table',
//   standalone: true,
//   imports: [],
//   templateUrl: './new-table.component.html',
//   styleUrl: './new-table.component.css'
// })
// export class NewTableComponent {

// }





import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PDetailsService, Product } from '../../../services/p.service';


@Component({
  selector: 'app-new-table',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, TableModule],
    providers: [PDetailsService],  // Ensure the service is provided here
    templateUrl: './new-table.component.html',
    styleUrl: './new-table.component.css'
})
export class NewTableComponent implements OnInit {
    products: Product[] = [];
    private productService = inject(PDetailsService);

    ngOnInit() {
        this.fetchAllMasterShiftDetails();
    }

    public fetchAllMasterShiftDetails() {
        this.productService.getProducts().then(productList => {
            this.products = productList;
            console.log("prodtclistOneeeeeeeeeee :: ", this.products);
        }).catch(err => {
            console.error('Error fetching product list:', err);
        });
    }

    onRowEditInit(product: Product) {
        // Logic when row edit is initiated
    }

    onRowEditSave(product: Product, index: number) {
        this.productService.updateProduct(index, product);
    }

    onRowEditCancel(product: Product, index: number) {
        // Logic when row edit is canceled, for example, revert changes if needed
    }

    // deleteProduct(index: number) {
    //     this.productService.deleteProduct(index);
    //     this.products = this.productService.getProducts();
    // }

    // addProduct() {
    //     const newProduct: Product = { code: '', name: '', price: 0 };
    //     this.productService.addProduct(newProduct);
    //     this.products = this.productService.getProducts();
    // }
}

