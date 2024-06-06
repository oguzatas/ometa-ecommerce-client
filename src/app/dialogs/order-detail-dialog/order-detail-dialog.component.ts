import { Component, OnInit, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/core/services/custom-toastr.service';
import { OrderService } from 'src/core/services/models/order.service';
import { DialogService } from 'src/core/services/common/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SingleOrder } from 'src/app/contracts/order/single_order';
import {
  CompleteOrderDialogComponent,
  CompleteOrderState,
} from '../complete-order-dialog/complete-order-dialog.component';
import { SpinnerType } from 'src/app/base/base.component';
@Component({
  selector: 'tib-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss'],
})
export class OrderDetailDialogComponent
  extends BaseDialog<OrderDetailDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService: OrderService,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService
  ) {
    super(dialogRef);
  }

  singleOrder: SingleOrder;

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice: number;

  async ngOnInit(): Promise<void> {
    this.singleOrder = await this.orderService.getOrderById(
      this.data as string
    );
    debugger;
    this.dataSource = this.singleOrder.basketItems;

    this.totalPrice = this.singleOrder.basketItems
      .map((basketItem, index) => basketItem.price * basketItem.quantity)
      .reduce((price, current) => price + current);
  }

  completeOrder() {
    this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleteOrderState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.ball);
        await this.orderService.completeOrder(this.data as string);
        this.spinner.hide(SpinnerType.ball);
        this.toastrService.message(
          'Sipariş başarıyla tamamlanmıştır! Müşteriye bilgi verilmiştir.',
          'Sipariş Tamamlandı!',
          {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRight,
          }
        );
      },
    });
  }
}

export enum OrderDetailDialogState {
  Close,
  OrderComplete,
}
