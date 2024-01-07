import { Injectable, NgZone } from '@angular/core';
import { GLOBAL_EVENTS } from '../enums/global-events.enum';

/**
 * Service that allows Angular components to receive and fire
 * events from outside
 *
 * Usage from outside of Angular:
 *   window.fireAngularEvent('sampleEventName', args)
 *   window.subscribeToAngularEvent('sampleEventName', fn)
 *
 * Usage from Angular component:
 *   globalPubSub.fireEvent('sampleEventName', args)
 *   globalPubSub.subscribe('sampleEventName', fn)
 */
@Injectable({
  providedIn: 'root',
})
export class GlobalPubSubService {
  allowedEvents = Object.values(GLOBAL_EVENTS);

  private subscriptions: { [key: string]: Function[] } = {};

  constructor(zone: NgZone) {
    this.allowedEvents.forEach((eventName: string) => {
      this.subscriptions[eventName] = [];
    });

    (window as any)['fireAngularEvent'] = (eventName: any, args: any) => {
      if (!this.subscriptions[eventName]) {
        throw new Error('Event has to be defined in the event list.');
      }

      zone.run(() => {
        this.fireEvent(eventName, args);
      });
    };

    (window as any)['subscribeToAngularEvent'] = (eventName: any, fn: any) => {
      this.subscribe(eventName, fn);
    };
  }

  subscribe(eventName: string, fn: Function) {
    if (!this.subscriptions[eventName]) {
      throw new Error('Event has to be defined in the event list.');
    }

    this.subscriptions[eventName].push(fn);
  }

  fireEvent(eventName: string, args: Array<any>) {
    if (!this.subscriptions[eventName]) {
      throw new Error('Event has to be defined in the event list.');
    }

    this.subscriptions[eventName].forEach((fn) => {
      fn.apply(null, args);
    });
  }
}
