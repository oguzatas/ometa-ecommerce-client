import { Component } from '@angular/core';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: '[tib-root]',
  templateUrl: './app.component.html',
})
export class AppComponent {
  /**
   *
   */
  constructor(auth: AuthService) {
    auth.getAppSettings();
    localStorage.setItem(
      'currentUser',
      '{"id":"7b908cec-6050-47ff-bb1a-f0331ac87b3a","name":"Serhat KAYA","username":"root@serhatkaya.com.tr","role":"Admin","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI3YjkwOGNlYy02MDUwLTQ3ZmYtYmIxYS1mMDMzMWFjODdiM2EiLCJ1bmlxdWVfbmFtZSI6IlNlcmhhdCBLQVlBIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzA0NjIyNzA5LCJleHAiOjE3MDc2MjI3MDksImlhdCI6MTcwNDYyMjcwOX0.Ky_mPxYUEYZFHRjqf3fj59lb1f518r9cZbUTiP3aNGY"}'
    );
  }
}
