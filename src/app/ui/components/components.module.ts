import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { BasketsComponent } from './baskets/baskets.component';
import { CategoriesComponent } from './categories/categories.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    BasketsComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
