import { Component, OnInit } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create.product';
import { ProductService } from 'src/core/services/models/product.service';
import { HttpClientService } from 'src/core/services/http-client.service';

@Component({
  selector: 'tib-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  constructor(private productService: ProductService) {}

  create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement
  ) {
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);
    alert('success');

    this.productService.create(create_product, () => {
      console.log("Ürün eklendi");
    });
  }

  

  ngOnInit(): void {}
}
