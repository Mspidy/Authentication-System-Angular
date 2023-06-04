import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptorInterceptor implements HttpInterceptor {
  whiteListUrls:any = [
    'api/v1/login'
  ]
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user: any = localStorage.getItem('user');
    let href = window.location.href;
    // console.log(window.location.href);
    if(this.whiteListUrls.some((path:any)=>request.url.includes(path))){
     // request.headers.append('Content-Type','application/json')
      return  next.handle(request);
    }
    // if ('http://localhost:4200/#/login' == href) {
    //   // console.log('helllo');
    //   const requestWithToken = request.clone({
    //     setHeaders: {},
    //   });
    //   return next.handle(requestWithToken);
    // } else {
      const requestWithToken = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          //authorization: `Bearer ${JSON.parse(user).token}`,
        },
      });
      return next.handle(requestWithToken);
   // }
  }
}
