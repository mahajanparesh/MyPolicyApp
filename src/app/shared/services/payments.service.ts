import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private apiUrl = 'https://localhost:7135';
  private paymentAddedSubject = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getCardsByUserId(userId: number): Observable<any> {
    const paymentByIDUrl = `${this.apiUrl}/api/Payment/byuserid/`;
    return this.http.get<any>(`${paymentByIDUrl}${userId}`);
  }

  addCard(paymentInput: any): Observable<boolean> {
    const addPaymentUrl = `${this.apiUrl}/api/Payment`;
    return this.http.post<boolean>(addPaymentUrl, paymentInput).pipe(
      tap(() => {
        this.paymentAddedSubject.next(true); // Notify subscribers that a payment has been added
      })
    );
  }

  cardAdded(): Observable<boolean> {
    return this.paymentAddedSubject.asObservable();
  }
  updateCard(paymentInput: any): Observable<boolean> {
    const updatePaymentUrl = `${this.apiUrl}/api/Payment/Payment`;
    return this.http.put<boolean>(updatePaymentUrl, paymentInput).pipe(
      tap(() => {
        this.paymentAddedSubject.next(true);
      })
    );
  }
  deleteCard(paymentId: number): Observable<boolean> {
    const deletePaymentUrl = `${this.apiUrl}/api/Payment/${paymentId}`;
    return this.http.delete<boolean>(deletePaymentUrl).pipe(
      tap(() => {
        this.paymentAddedSubject.next(true);
      })
    );
  }
}
