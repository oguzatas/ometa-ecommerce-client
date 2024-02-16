import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ProductsComponent } from './products.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    DeleteComponent,
    ListComponent,
  ],
  imports: [CommonModule],
  exports: [ProductsComponent],
})
export class ProductsModule {}
