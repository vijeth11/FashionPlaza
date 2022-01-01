import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/Authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInUserGuard implements CanActivate {
  constructor(private route:Router, private authService:AuthenticationService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.authService.isAuthenticated()){
          return true;
      }else{
        this.route.navigate(['login','existing'], { queryParams: { returnUrl: state.url.replace('/','') }});
        return false;
      }
  }
}
