import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth:AuthService) {}
  
  canActivate(): boolean | UrlTree {
    const isLoggedIn = this.auth.isLoggedIn();
    return isLoggedIn ? true : this.router.createUrlTree(['/login']);
  }
  
}
