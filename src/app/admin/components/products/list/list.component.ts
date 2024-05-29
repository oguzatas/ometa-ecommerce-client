import { Component, OnInit } from '@angular/core';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/core/services/models/product.service';
import { DialogService } from 'src/core/services/common/dialog.service';

@Component({
  selector: 'tib-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private dialogService: DialogService
  ) {}

  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'createdDate',
    'updatedDate',
  ];

  dataSource: List_Product[];

  async ngOnInit() {
    const allProducts: List_Product[] = await this.productService.read();
    this.dataSource = allProducts;
  }
}
