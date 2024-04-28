import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class HomeGaurd implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    return false;
  }
}
