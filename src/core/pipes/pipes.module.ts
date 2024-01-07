import { NgModule } from '@angular/core';
import { ActiveRoutePipe } from './active-route.pipe';
import { HashPipe } from './hash.pipe';
import { TranslatePipe } from './translate.pipe';

const decex = [HashPipe, ActiveRoutePipe, TranslatePipe];

@NgModule({
  imports: [],
  exports: [...decex],
  declarations: [...decex],
  providers: [],
})
export class PipesModule {}
