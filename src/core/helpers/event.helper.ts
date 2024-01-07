import { GLOBAL_EVENTS } from '../enums/global-events.enum';

export class GlobalEventHelper {
  public static fireEvent(event: GLOBAL_EVENTS, x?: any) {
    (window as any)['fireAngularEvent'](event, x);
  }
}
