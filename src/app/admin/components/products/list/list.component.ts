import { Component, OnInit } from '@angular/core';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/core/services/models/product.service';
import { DialogService } from 'src/core/services/common/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';

import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/core/services/alertify.service';
import { BaseComponent } from 'src/app/base/base.component';
import { SpinnerType } from 'src/app/base/base.component';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { QrcodeDialogComponent } from 'src/app/dialogs/qrcode-dialog/qrcode-dialog.component';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';

declare var $: any;
@Component({
  selector: 'tib-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'createdDate',
    'updatedDate',
    'photos',
    'qrcode',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  async getProducts() {
    this.showSpinner(SpinnerType.ball);
    const allProducts: { totalProductCount: number; products: List_Product[] } =
      await this.productService.read(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.ball),
        (errorMessage) =>
          this.alertifyService.message(errorMessage, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight,
          })
      );
    this.dataSource = new MatTableDataSource<List_Product>(
      allProducts.products
    );
    this.paginator.length = allProducts.totalProductCount;
  }

  addProductImages(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        width: '1400px',
      },
    });
  }

  async pageChanged() {
    await this.getProducts();
  }

  async ngOnInit() {
    await this.getProducts();
  }

  showQRCode(productId: string) {
    this.dialogService.openDialog({
      componentType: QrcodeDialogComponent,
      data: productId,
      afterClosed: () => {},
    });
  }
}
