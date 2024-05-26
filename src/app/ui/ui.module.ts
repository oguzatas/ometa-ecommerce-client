import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UilayoutComponent } from './layout/uilayout/uilayout.component';
import { UinavbarComponent } from './layout/partials/footer/uinavbar/uinavbar.component';
import { UifooterComponent } from './layout/partials/uifooter/uifooter.component';



@NgModule({
  declarations: [
    UilayoutComponent,
    UinavbarComponent,
    UifooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UiModule { }
