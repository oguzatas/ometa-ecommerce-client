import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/contracts/product';
import { ProductService } from 'src/core/services/models/product.service';

@Component({
  selector: 'tib-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}
}
