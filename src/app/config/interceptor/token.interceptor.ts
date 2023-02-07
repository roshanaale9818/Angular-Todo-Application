
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

import { config, Observable, of } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";
import { AuthService } from "src/app/shared/services/auth/auth.service";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
  private authService:AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // We should not add access_token to login, register & refreshToken API's
    const urlToIgnore = /signin/gi || /register/gi ;

    if (request.url.search(urlToIgnore) === -1) {
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
            // this.modalRef = this.modalService.show(
            //   LogoutConfirmationComponent,
            //   this.config
            // );
            // //this.modalRef.content.data = "Username";
            // this.modalRef.content.action = "logout";
            // this.modalRef.content.onClose.subscribe((confirm) => {
            //   if (confirm) {
            //     this.globalService.logout();
            //   }
            // });
          }
          // Internal Server error
          if (err.status == 500) {
            // this.toastrMessageService.showError(
            //   "Server is not available. Please try again later!!"
            // );
          }
        }
        return of(err);
      })
    );
  }
}
