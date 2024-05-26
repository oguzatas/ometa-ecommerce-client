import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from 'src/app/admin/components/categories/categories.component';
import { ProductsComponent } from 'src/app/admin/components/products/products.component';
import { WelcomeComponent } from 'src/app/admin/components/welcome/welcome.component';
import { LayoutComponent } from 'src/app/admin/layout/layout.component';
import { UiComponent } from './ui/components/ui/ui.component';
import { UilayoutComponent } from './ui/layout/uilayout/uilayout.component';
const routes: Routes = [
  {
    path: '',
    component: UilayoutComponent,
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
