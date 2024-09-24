import { Injectable } from '@angular/core';

export interface Product {
    code: string;
    name: string;
    price: number;
}

@Injectable({
    providedIn: 'root'
})
export class PDetailsService {
    private products: Product[] = [
        { code: 'A001', name: 'Product A', price: 100 },
        { code: 'B002', name: 'Product B', price: 150 },
        { code: 'C003', name: 'Product C', price: 200 }
    ];

    getProducts(): Promise<Product[]> {
        return Promise.resolve(this.products);
    }

    addProduct(product: Product) {
        this.products.push(product);
    }

    deleteProduct(index: number) {
        this.products.splice(index, 1);
    }

    updateProduct(index: number, product: Product) {
        this.products[index] = product;
    }
}
