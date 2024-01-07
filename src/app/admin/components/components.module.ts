import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [DashboardComponent, OrdersComponent, ProductsComponent],
  imports: [CommonModule],
})
export class ComponentsModule {}
