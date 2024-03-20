import { Component, OnInit } from '@angular/core';
import { ListProduct } from 'src/app/contracts/list.product';
import { ProductService } from 'src/core/services/models/product.service';

@Component({
  selector: 'tib-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private productService: ProductService) {}

  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'createdDate',
    'updatedDate',
  ];

  dataSource: ListProduct[];

  async ngOnInit() {
    const allProducts: ListProduct[] = await this.productService.read();
    this.dataSource = allProducts;
  }
}
