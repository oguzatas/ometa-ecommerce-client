import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ApiDataResponse, ApiResponse } from 'src/core/models/user';
import { WebSite } from 'src/core/models/website';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DetailService {
    id = '';
    fileList$: Observable<any[]>;
    private detailSubject$ = new BehaviorSubject(null);
    detail$: Observable<ApiDataResponse<WebSite>>;
    constructor(private httpClient: HttpClient, router: Router) {
        this.detail$ = this.detailSubject$.pipe(switchMap(res =>
            res ? of(res) :
                this.id == '' ? of(null) :
                    this.getRequest(this.id)
                        .pipe(catchError((err) => {
                            if (err.status && err.status == 404) {
                                router.navigate(['/welcome'])
                            }

                            return of(err);
                        })))
        );
    }

    private getRequest = (id: string) =>
        this.httpClient.get<any[]>(`${environment.apiUrl}/website/Get?id=${id}`);

    getDetail(id: string) {
        this.id = id.split('.')[0];
        this.detailSubject$.next(null);
    }

    update(website: WebSite): Observable<ApiResponse<WebSite>> {
        return this.httpClient.put<ApiResponse<WebSite>>(`${environment.apiUrl}/website/Update?id=${website.id}`, website);
    }

    save(website: WebSite): Observable<ApiResponse<WebSite>> {
        return this.httpClient.post<ApiResponse<WebSite>>(`${environment.apiUrl}/website/Add`, website);
    }

    delete(id: string): Observable<ApiResponse<WebSite>> {
        return this.httpClient.delete<ApiResponse<WebSite>>(`${environment.apiUrl}/website/Delete?id=${id}`);
    }

    reTest(id: string): Observable<ApiResponse<any>> {
        return this.httpClient.get<ApiResponse<any>>(`${environment.apiUrl}/website/Retest?id=${id}`);
    }
}
