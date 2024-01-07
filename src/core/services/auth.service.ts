import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SystemSettingsModel } from '../models/systemsettings';
import { ApiResponse, User } from '../models/user';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(login: User) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, login).pipe(
      map((user) => {
        if (user.result) {
          localStorage.setItem('currentUser', JSON.stringify(user.result.user));
          this.currentUserSubject.next(user.result.user);
          this.router.navigate(['welcome']);
          this.getAppSettings();
        }
        return user;
      })
    );
  }

  getAppSettings() {
    if (this.currentUserValue) {
      this.http
        .get<ApiResponse<SystemSettingsModel>>(
          `${environment.apiUrl}/System/GetSettings`
        )
        .subscribe((r) => {
          localStorage.setItem('systemSettings', JSON.stringify(r.result));
        });
    }
  }

  public hasRole(role: string) {
    return this.currentUserValue.role == role;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
