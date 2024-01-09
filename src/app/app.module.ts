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
import { DetailComponent } from 'src/components/detail/detail.component';
import { DockComponent } from 'src/components/dock/dock.component';
import { LogListComponent } from 'src/components/log-list/log-list.component';
import { LoginComponent } from 'src/components/login/login.component';
import { SettingsComponent } from 'src/components/settings/settings.component';
import { UserModalComponent } from 'src/components/user-modal/user-modal.component';
import { UsersComponent } from 'src/components/users/users.component';
import { WebSiteListComponent } from 'src/components/website-list/web-site-list.component';
import { WelcomeComponent } from 'src/components/welcome/welcome.component';
import { JwtInterceptor } from 'src/core/interceptors/jwt.interceptor.service';
import { LayoutModule } from 'src/core/layout/layout.module';
import { PipesModule } from 'src/core/pipes/pipes.module';
import { AppInitService } from 'src/core/services/app-init.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CreateComponent } from '../components/products/create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WebSiteListComponent,
    DetailComponent,
    WelcomeComponent,
    DockComponent,
    UsersComponent,
    UserModalComponent,
    SettingsComponent,
    LogListComponent,
    CreateComponent,
  ],
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
  ],
  entryComponents: [UserModalComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: 'baseUrl', useValue: 'todo/api', multi: true },
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
