import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

import { BasketsComponent } from './baskets/baskets.component';
import { UiComponent } from './ui/ui.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { BlogComponent } from './blog/blog.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { ShopComponent } from './shop/shop.component';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    BasketsComponent,
    UiComponent,
    AboutusComponent,
    BlogComponent,
    ServicesComponent,
    ContactComponent,
    ShopComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class ComponentsModule {}
