import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MyPolicyApp';
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }
  isAuthenticated(): any {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }
}
