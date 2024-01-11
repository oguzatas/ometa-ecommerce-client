import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/core/services/http-client.service';

@Component({
  selector: 'tib-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement
  ) {
    const create_product: Product = new Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseInt(price.value);
    alert('success');
  }

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit(): void {
    // TEST CODES
    // this.httpClientService
    //   .get<Product>({
    //     controller: 'products',
    //   })
    //   .subscribe((data) => console.log(data));
    // this.httpClientService
    //   .post(
    //     {
    //       controller: 'products',
    //     },
    //     {
    //       name: 'Kalem',
    //       stock: 100,
    //       price: 10,
    //     }
    //   )
    //   .subscribe();
    // this.httpClientService
    //   .put(
    //     {
    //       controller: 'products',
    //     },
    //     {
    //       id: 'TODO/WRITE',
    //       stock: 1200,
    //       price: 5.5,
    //     }
    //   )
    //   .subscribe();
  }
}
