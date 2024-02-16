import { Component, OnInit } from '@angular/core';
import { CreateComponent } from './create/create.component';

@Component({
  selector: 'tib-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor() {}

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
