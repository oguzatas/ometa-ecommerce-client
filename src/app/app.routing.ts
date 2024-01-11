import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from 'src/app/admin/components/categories/categories.component';
import { DetailComponent } from 'src/app/admin/components/detail/detail.component';
import { LoginComponent } from 'src/app/admin/components/login/login.component';
import { ProductsComponent } from 'src/app/admin/components/products/products.component';
import { SettingsComponent } from 'src/app/admin/components/settings/settings.component';
import { UsersComponent } from 'src/app/admin/components/users/users.component';
import { WebSiteListComponent } from 'src/app/admin/components/website-list/web-site-list.component';
import { WelcomeComponent } from 'src/app/admin/components/welcome/welcome.component';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { SessionGuard } from 'src/core/guards/session.guard';
import { LayoutComponent } from 'src/app/admin/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'welcome',
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
      },
      {
        path: 'detail',
        component: DetailComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {
          roles: ['Admin'],
        },
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          roles: ['Admin'],
        },
      },
      {
        path: 'websites',
        component: WebSiteListComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SessionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
