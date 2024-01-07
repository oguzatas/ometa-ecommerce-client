import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemSettingsModel } from 'src/core/models/systemsettings';
import { ApiResponse } from 'src/core/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  /**
     *   _____                 _ _
        /  __ \               | (_)
        | /  \/ __ _ _ __   __| |_  ___
        | |    / _` | '_ \ / _` | |/ _ \
        | \__/\ (_| | | | | (_| | |  __/
        \____/\__,_|_| |_|\__,_|_|\___|
        serhatkaya.sr@gmail.com
     */
  constructor(private http: HttpClient) {}

  getSettings(): Observable<ApiResponse<SystemSettingsModel>> {
    return this.http.get<ApiResponse<SystemSettingsModel>>(
      `${environment.apiUrl}/System/GetSettings`
    );
  }

  saveSettings(
    model: SystemSettingsModel
  ): Observable<ApiResponse<SystemSettingsModel>> {
    return this.http.post<ApiResponse<SystemSettingsModel>>(
      `${environment.apiUrl}/System/SaveSettings`,
      model
    );
  }
}
