import { tap, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from '../utils.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

 
  public twofatoken: any;
  public verify = false;
  public csrfToken = null;
  constructor(private utilsService: UtilsService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = {};
    
    if (localStorage.getItem('token')) {
      headers = { ...headers, ...{ 'Authorization': `Token ${localStorage.getItem('token')}` } }
    }
    request = request.clone({
      // withCredentials: true,
      setHeaders: { ...headers },
    });
  


    return next.handle(request).pipe(
      finalize(() => {
        setTimeout(() => {
         
        })
      }), tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (request.url) {
            if (event.body) {
             //to get response in status as per API response (status and response object)
              if (event.body.success) {
                if (event.body.status.code !== 200) {
                  this.utilsService.errorAPIMsgAlertHandler(event.body.status);
                }
              } else {
                this.utilsService.errorAPIMsgAlertHandler(event.body.status);
              }
            }
          }
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.utilsService.errorServiceHandler(err);
        }
        // console.log('error', err)
      }));
  }
 
}
