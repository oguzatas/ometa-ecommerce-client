import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, User } from 'src/core/models/user';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base-list/base.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService<User> {
  constructor(protected http: HttpClient) {
    super(http, 'User');
  }

  saveUser(model: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(
      `${environment.apiUrl}/User/Add`,
      model
    );
  }

  updateUser(model: User): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(
      `${environment.apiUrl}/User/Update?id=${model.id}`,
      model
    );
  }
}
