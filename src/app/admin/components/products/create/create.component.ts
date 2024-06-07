import { Component, OnInit, Output } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';
import { ProductService } from 'src/core/services/models/product.service';
import { EventEmitter } from '@angular/core';
import { HttpClientService } from 'src/core/services/http-client.service';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/core/services/alertify.service';
import { SpinnerType, BaseComponent } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'tib-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    spiner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService
  ) {
    super(spiner);
  }
  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();
  create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.ball);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productService.create(
      create_product,
      () => {
        this.hideSpinner(SpinnerType.ball);
        this.alertify.message('Ürün başarıyla eklenmiştir.', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight,
        });
        this.createdProduct.emit(create_product);
      },
      (errorMessage) => {
        this.alertify.message(errorMessage, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight,
        });
      }
    );
  }

  ngOnInit(): void {}
}
