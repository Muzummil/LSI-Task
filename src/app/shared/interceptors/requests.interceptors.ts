import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CacheService } from '../services/cache.service';
const TIME_TO_LIVE = 1000;
@Injectable()
export class RequestsInterceptor implements HttpInterceptor {
  constructor(private cacheService: CacheService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*, http://locahost:4400',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept, x-requested-with',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      Accept: 'application/json',
    });
    req = req.clone({ headers });
    if (req.method !== 'GET') {
      return next.handle(req);
    }
    const cachedResponse = this.cacheService.get(req.urlWithParams);
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cacheService.set(req.urlWithParams, event, TIME_TO_LIVE);
        }
      })
    );
  }
}
