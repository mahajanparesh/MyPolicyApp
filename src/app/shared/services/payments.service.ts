import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private apiUrl = 'https://localhost:7135';

  constructor(private http: HttpClient, private router: Router) {}
  getPaymentsByUserId(userId: number): Observable<any> {
    const paymentByIDUrl = `${this.apiUrl}/api/Payment/byuserid/`;
    return this.http.post<any>(paymentByIDUrl + userId, {});
  }
}
