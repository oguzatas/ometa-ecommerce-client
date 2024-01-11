import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getRequestParams } from 'src/core/helpers/http.helper';
import { SystemLog } from 'src/core/models/log.model';
import { ApiDataResponse, ApiResponse, StatsModel } from 'src/core/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogListService {
  constructor(private http: HttpClient) {}

  getAllApi(
    pageNo?: string,
    pageSize?: string,
    filter?,
    sorting?
  ): Observable<ApiDataResponse<SystemLog>> {
    return this.http.get<ApiDataResponse<SystemLog>>(
      `${environment.apiUrl}/WebSiteLog/GetAll`,
      {
        params: getRequestParams(
          filter,
          pageNo && pageSize ? { page: pageNo, pageSize: pageSize } : undefined,
          sorting
        ),
      }
    );
  }

  getStats() {
    return this.http.get<ApiResponse<StatsModel>>(
      `${environment.apiUrl}/WebSiteLog/GetStats`
    );
  }
}
