import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,
    private router:Router,
    private toasterService:ToastrService
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url;
      return this.checkUserLogin(route, url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }



  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    // if user is logged in
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getRole();
      // if user role doesn't match route to default and prevent access
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        this.router.navigate(['/todo']);
        this.toasterService.error("You are not authorized to access resource.");
        return false;
      }
      // if matches return true and allow
      return true;
    }
    // if user is not logged in
    this.toasterService.error("You are not authorized to access resource.");
    this.router.navigate(['/todo']);
    return false;
  }

}
