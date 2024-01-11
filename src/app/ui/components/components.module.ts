import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from '../../admin/components/products/products.component';
import { BasketsComponent } from './baskets/baskets.component';

@NgModule({
  declarations: [HomeComponent, ProductsComponent, BasketsComponent],
  imports: [CommonModule],
})
export class ComponentsModule {}
