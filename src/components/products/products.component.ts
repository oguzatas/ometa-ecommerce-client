import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/core/services/http-client.service';

@Component({
  selector: 'tib-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private httpClientService: HttpClientService) {}

  ngOnInit(): void {
    this.httpClientService
      .get<Product>({
        controller: 'products',
      })
      .subscribe((data) => console.log(data));

    this.httpClientService
      .post(
        {
          controller: 'products',
        },
        {
          name: 'Kalem',
          stock: 100,
          price: 10,
        }
      )
      .subscribe();

    this.httpClientService
      .put(
        {
          controller: 'products',
        },
        {
          id: 'TODO/WRITE',
          stock: 1200,
          price: 5.5,
        }
      )
      .subscribe();
  }
}
