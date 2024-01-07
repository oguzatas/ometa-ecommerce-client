import { Injectable } from '@angular/core';
import { GlobalPubSubService } from './global-pub-sub.service';
import { GLOBAL_EVENTS } from '../enums/global-events.enum';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AppInitService {
  constructor(
    protected pub: GlobalPubSubService,
    protected auth: AuthService
  ) {}

  eventMap = {
    [GLOBAL_EVENTS.LOGOUT]: (_?) => {
      this.auth.logout();
    },
  };

  init() {
    Object.values(GLOBAL_EVENTS).forEach((key) => {
      if (this.eventMap[key]) {
        this.pub.subscribe(key, (data) => this.eventMap[key](data));
      }
    });
  }
}
