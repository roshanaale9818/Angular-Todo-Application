
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import { config, Observable, of } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";
import { AuthService } from "src/app/shared/services/auth/auth.service";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
  private authService:AuthService,
  private toaster:ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("request url",request.url)
    // We should not add access_token to login, register & refreshToken API's
    const urlToIgnore = /signin/gi || /register/gi ||/translate/gi //google ;

    if (request.url.search(urlToIgnore) === -1 && !request.url.includes('https://translation.googleapis.com/language/translate/v2')) {
      request = request.clone({
        setHeaders: {
         ['x-access-token']:this.authService.getToken()
        }
      });
    }

    return next.handle(request).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if(evt.body &&evt.body.response){
            // if(evt.body.status == 'failure' && evt.body.response == "Invalid Access Token"){
            //   this.globalService.logout();
            // }
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err);
          if (err.status == 0) {
          }
          // Internal Server error
          if (err.status == 500) {
            this.toaster.error(err.error.message)
            // this.toastrMessageService.showError(
            //   "Server is not available. Please try again later!!"
            // );
          }
          else if(err.status==400){
            this.toaster.error(err.error.message)

          }
        }
        return of(err);
      })
    );
  }
}
