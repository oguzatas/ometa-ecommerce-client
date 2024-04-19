import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ProductsComponent } from './products.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DeleteDirective } from 'src/directives/delete.directive';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    DeleteComponent,
    ListComponent,
    EditComponent,
    DeleteDirective,
  ],
  imports: [CommonModule],
  exports: [ProductsComponent],
})
export class ProductsModule {}
