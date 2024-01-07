import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatsModel } from 'src/core/models/user';
import { AuthService } from 'src/core/services/auth.service';
import { LogListService } from '../log-list/log-list.service';

@Component({
  selector: '[tib-welcome]',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  public stats$: Observable<StatsModel> = this.service
    .getStats()
    .pipe(map((r) => r.result));

  constructor(protected service: LogListService, public auth: AuthService) {}
}
