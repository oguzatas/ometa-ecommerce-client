import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  NgbDropdownModule,
  NgbModalModule,
  NgbModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { WelcomeComponent } from 'src/app/admin/components/welcome/welcome.component';
import { LayoutModule } from 'src/app/admin/layout/layout.module';
import { PipesModule } from 'src/core/pipes/pipes.module';
import { AppInitService } from 'src/core/services/app-init.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ProductsModule } from './admin/components/products/products.module';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { markAsUntransferable } from 'worker_threads';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, DeleteDialogComponent],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule,
    NgbTypeaheadModule,
    NgxDatatableModule,
    NgbModalModule,
    LayoutModule,
    PipesModule,
    ProductsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    { provide: 'baseUrl', useValue: environment.apiUrl, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: (el: AppInitService) => () => el.init(),
      deps: [AppInitService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
