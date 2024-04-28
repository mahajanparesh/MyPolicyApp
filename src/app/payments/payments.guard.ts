import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class PaymentsGaurd implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    return false;
  }
}
