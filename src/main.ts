import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
/**
    *   _____                 _ _
       /  __ \               | (_)
       | /  \/ __ _ _ __   __| |_  ___
       | |    / _` | '_ \ / _` | |/ _ \
       | \__/\ (_| | | | | (_| | |  __/
        \____/\__,_|_| |_|\__,_|_|\___|
       serhatkaya.sr@gmail.com
    */
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
