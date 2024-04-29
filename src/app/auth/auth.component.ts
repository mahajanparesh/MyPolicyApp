import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { LoginForm } from '../type/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  loginForm: LoginForm = {
    email: '',
    password: '',
  };
  constructor(private authService: AuthService) {}
  ngOnInit(): void {}
  signin_submit() {
    this.authService.login(this.loginForm);
  }

  isLoading() {
    return this.authService.isLoading;
  }
}
