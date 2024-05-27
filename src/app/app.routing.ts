import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from 'src/app/admin/components/categories/categories.component';
import { ProductsComponent } from 'src/app/admin/components/products/products.component';
import { WelcomeComponent } from 'src/app/admin/components/welcome/welcome.component';
import { LayoutComponent } from 'src/app/admin/layout/layout.component';
import { UiComponent } from './ui/components/ui/ui.component';
import { UilayoutComponent } from './ui/layout/uilayout/uilayout.component';
import { redirect } from 'react-router-dom';
import { HomeComponent } from './ui/components/home/home.component';
import { BlogComponent } from './ui/components/blog/blog.component';
import { ContactComponent } from './ui/components/contact/contact.component';
import { ServicesComponent } from './ui/components/services/services.component';
const routes: Routes = [
  {
    path: '',
    component: UilayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'services', component: ServicesComponent },
    ],
  },
  {
    path: 'admin',
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
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
