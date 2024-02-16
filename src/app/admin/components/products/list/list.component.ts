import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {}
}
