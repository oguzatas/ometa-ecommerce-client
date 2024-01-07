import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SystemSettingsModel } from 'src/core/models/systemsettings';
import Swal from 'sweetalert2';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
/**
  *   _____                 _ _
     /  __ \               | (_)
     | /  \/ __ _ _ __   __| |_  ___
     | |    / _` | '_ \ / _` | |/ _ \
     | \__/\ (_| | | | | (_| | |  __/
      \____/\__,_|_| |_|\__,_|_|\___|
     serhatkaya.sr@gmail.com
  */
export class SettingsComponent implements OnInit {
  settings: SystemSettingsModel;
  form = new FormGroup({
    adminGroupId: new FormControl(),
    blockMessage: new FormControl(),
    erisemiyorumMesaj: new FormControl(),
    updatedInacessibleMessage: new FormControl(),
    updatedUnblockedMessage: new FormControl(),
    updatedStillBlockedMessage: new FormControl(),
    hasRedirectionMessage: new FormControl(),
    updatedHasRedirectionMessage: new FormControl(),
    certificateErrorMessage: new FormControl(),
    updatedCertificateErrorMessage: new FormControl(),
    telegramBotUserName: new FormControl(),
  });

  constructor(private service: SettingsService) {}

  ngOnInit(): void {
    this.service.getSettings().subscribe((r) => {
      this.settings = r.result;
      this.form.patchValue(r.result);
    });
  }

  submit() {
    if (this.form.valid) {
      this.service.saveSettings(this.form.getRawValue()).subscribe((r) => {
        Swal.fire({
          text: 'Ayarlar kaydedildi.',
          icon: 'success',
          heightAuto: false,
          timer: 3000,
        });
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
