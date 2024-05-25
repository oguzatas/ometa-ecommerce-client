import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxFileDropModule],
  exports: [],
})
export class FileUploadModule {}
