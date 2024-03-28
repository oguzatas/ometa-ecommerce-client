import { LoadingService } from './../services/loading.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { defer } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return defer(() => {
      this.loadingService.show();
      return next.handle(request).pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      );
    });
  }
}
