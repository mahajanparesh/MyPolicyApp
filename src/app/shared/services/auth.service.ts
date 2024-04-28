import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginForm } from '../../type/auth';

import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private apiUrl = 'https://localhost:7135';
  isLoading: boolean = false;
  constructor(private http: HttpClient, private router: Router) {}
  login(loginForm: LoginForm) {
    this.isLoading = true;
    const loginUrl = `${this.apiUrl}/api/Login/login`;
    this.http.post<any>(loginUrl, loginForm).subscribe(
      (data) => {
        console.log(data);
        if (data.emailExists === false) {
          alert('Error: User Does not Exists');
        } else if (
          data.emailExists === true &&
          data.passwordCorrect === false
        ) {
          alert('Error: Incorrect Password');
        } else {
          const userEmail = loginForm.email;
          const userID = data.userID;

          // Create an object containing email and userID
          const userData = {
            email: userEmail,
            userID: userID,
          };

          // Store userData object in localStorage
          localStorage.setItem('user', JSON.stringify(userData));

          alert('Login Successfully');
          this.router.navigate(['/home']);
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        alert('Login Failed: ' + error.error);
      }
    );
  }
  isAuthenticated() {
    const user = localStorage.getItem('user');
    if (user !== null) {
      return true;
    }
    return false;
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  getUserDetails(): any {
    if (this.isAuthenticated()) {
      return localStorage.getItem('user');
    }
  }
}
