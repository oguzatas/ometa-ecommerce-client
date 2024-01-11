import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getRequestParams } from 'src/core/helpers/http.helper';
import { ApiDataResponse, ApiResponse } from 'src/core/models/user';
import { environment } from 'src/environments/environment';

export abstract class BaseService<T> {
  constructor(protected http: HttpClient, protected controller: string) {}

  getAllApi(
    pageNo?: string,
    pageSize?: string,
    filter?,
    sorting?
  ): Observable<ApiDataResponse<T>> {
    return this.http.get<ApiDataResponse<T>>(
      `${environment.apiUrl}/${this.controller}/GetAll`,
      {
        params: getRequestParams(
          filter,
          pageNo && pageSize ? { page: pageNo, pageSize: pageSize } : undefined,
          sorting
        ),
      }
    );
  }

  getById(id: string): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(
      `${environment.apiUrl}/${this.controller}/Get?id=${id}`
    );
  }
}
