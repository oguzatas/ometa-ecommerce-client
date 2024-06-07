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
import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { FileUploadComponent } from 'src/core/services/common/file-upload/file-upload/file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UifooterComponent } from './ui/layout/partials/uifooter/uifooter.component';
import { UilayoutComponent } from './ui/layout/uilayout/uilayout.component';
import { UinavbarComponent } from './ui/layout/partials/uinavbar/uinavbar.component';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorService } from 'src/core/services/http-error-handler-interceptor.service';
import { AuthlayoutComponent } from './auth/layout/authlayout/authlayout.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ForgetpasswordComponent } from './auth/components/forgetpassword/forgetpassword.component';
import { BasketItemRemoveDialogComponent } from './dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { CompleteOrderDialogComponent } from './dialogs/complete-order-dialog/complete-order-dialog.component';
import { OrderDetailDialogComponent } from './dialogs/order-detail-dialog/order-detail-dialog.component';
import { QrcodeDialogComponent } from './dialogs/qrcode-dialog/qrcode-dialog.component';
import { QrcodeReadingDialogComponent } from './dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component';
import { AuthorizeUserDialogComponent } from './dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'src/core/services/common/file-upload/file-upload.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SelectProductImageDialogComponent } from './dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { DeleteComponent } from './admin/components/products/delete/delete.component';
import { ListComponent } from './admin/components/products/list/list.component';
import { EditComponent } from './admin/components/products/edit/edit.component';
import { DeleteDirective } from 'src/directives/delete.directive';
import { ProductsComponent } from './admin/components/products/products.component';
import { CreateComponent } from './admin/components/products/create/create.component';
import {
  MatDialogModule,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import {
  MatLegacyDialogModule,
  MatLegacyDialogRef,
} from '@angular/material/legacy-dialog';
import { ProductsComponent2 } from './ui/components/products/products.component';
import { ListComponent2 } from './ui/components/products/list/list.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DeleteDialogComponent,
    UilayoutComponent,
    UinavbarComponent,
    UifooterComponent,
    AuthlayoutComponent,
    RegisterComponent,
    ForgetpasswordComponent,
    BasketItemRemoveDialogComponent,
    CompleteOrderDialogComponent,
    OrderDetailDialogComponent,
    QrcodeDialogComponent,
    QrcodeReadingDialogComponent,
    AuthorizeUserDialogComponent,
    FileUploadComponent,
    FileUploadDialogComponent,
    SelectProductImageDialogComponent,
    DeleteComponent,
    ListComponent,
    EditComponent,
    DeleteDirective,
    ProductsComponent,
    CreateComponent,
    ProductsComponent2,
    ListComponent2,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule,
    MatSelectModule,
    NgbTypeaheadModule,
    NgxDatatableModule,
    NgbModalModule,
    LayoutModule,
    PipesModule,
    ProductsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    NgxFileDropModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatInputModule,
    MatBadgeModule,
    MatCardModule,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    FileUploadModule,
    MatLegacyDialogModule,

    MatListModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('accessToken'),
        allowedDomains: ['http://localhost:4200'],
      },
    }),
  ],
  providers: [
    { provide: 'baseUrl', useValue: environment.apiUrl, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: (el: AppInitService) => () => el.init(),
      deps: [AppInitService],
      multi: true,
    },
    {
      provide: 'baseSignalRUrl',
      useValue: '',
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '204930155239-h122ln313bdthcita9vctb7sf2ueiuvu.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('546631843676576'),
          },
        ],
        onError: (err) => console.log(err),
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
