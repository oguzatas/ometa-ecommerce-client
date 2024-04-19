import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ProductsComponent } from './products.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DeleteDirective } from 'src/directives/delete.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadModule } from 'src/core/services/common/file-upload/file-upload.module';

@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    DeleteComponent,
    ListComponent,
    EditComponent,
    DeleteDirective,
  ],
  imports: [CommonModule, FileUploadModule],
  exports: [ProductsComponent],
})
export class ProductsModule {}
