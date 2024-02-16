import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

import { BasketsComponent } from './baskets/baskets.component';

@NgModule({
  declarations: [HomeComponent, BasketsComponent],
  imports: [CommonModule],
})
export class ComponentsModule {}
