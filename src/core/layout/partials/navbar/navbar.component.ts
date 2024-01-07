import { Component } from '@angular/core';
import { GLOBAL_EVENTS } from 'src/core/enums/global-events.enum';
import { GlobalEventHelper } from 'src/core/helpers/event.helper';

@Component({
  selector: '[tib-navbar]',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent {
  logout() {
    GlobalEventHelper.fireEvent(GLOBAL_EVENTS.LOGOUT);
  }
}
