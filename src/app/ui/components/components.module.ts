import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

import { BasketsComponent } from './baskets/baskets.component';
import { UiComponent } from './ui/ui.component';

@NgModule({
  declarations: [HomeComponent, BasketsComponent, UiComponent],
  imports: [CommonModule],
})
export class ComponentsModule {}
